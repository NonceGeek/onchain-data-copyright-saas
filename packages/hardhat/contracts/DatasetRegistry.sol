// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DatasetRegistry
 * @dev Registry for datasets with immutable content pointers and ownership management
 * 
 * This contract manages dataset registration using Arweave transaction IDs (arTxId) as
 * immutable content pointers. Arweave provides permanent, decentralized storage where
 * content cannot be modified once uploaded, making it ideal for dataset integrity.
 */
contract DatasetRegistry is Ownable {
    
    /**
     * @dev Dataset structure containing essential metadata
     * @param id Unique dataset identifier (starts from 1)
     * @param arTxId Arweave transaction ID pointing to immutable dataset content
     * @param owner Current owner of the dataset
     * @param createdAt Timestamp when dataset was created
     */
    struct Dataset {
        uint256 id;
        string arTxId;
        address owner;
        uint256 createdAt;
    }

    /// @dev Next dataset ID to be assigned (starts from 1)
    uint256 public datasetIndex;

    /// @dev Mapping from dataset ID to Dataset struct
    mapping(uint256 => Dataset) public datasets;

    /// @dev Mapping from keccak256(arTxId) to dataset ID for uniqueness check
    mapping(bytes32 => uint256) public txHashToId;

    /// @dev Mapping from user address to array of dataset IDs they own
    mapping(address => uint256[]) public userDatasets;

    /**
     * @dev Emitted when a new dataset is created
     * @param id The unique dataset identifier
     * @param owner The address of the dataset owner
     * @param arTxId The Arweave transaction ID
     */
    event DatasetCreated(uint256 indexed id, address indexed owner, string arTxId);

    /**
     * @dev Emitted when dataset ownership is transferred
     * @param id The dataset identifier
     * @param oldOwner The previous owner address
     * @param newOwner The new owner address
     */
    event DatasetOwnerChanged(uint256 indexed id, address indexed oldOwner, address indexed newOwner);

    /**
     * @dev Constructor sets the initial owner
     */
    constructor() Ownable() {}

    /**
     * @dev Creates a new dataset with the given Arweave transaction ID
     * @param arTxId The Arweave transaction ID pointing to the dataset content
     * @return id The unique identifier assigned to the dataset
     */
    function createDataset(string calldata arTxId) external returns (uint256 id) {
        require(bytes(arTxId).length > 0, "DatasetRegistry: arTxId cannot be empty");
        
        // Check if this arTxId already exists
        bytes32 txHash = keccak256(bytes(arTxId));
        require(txHashToId[txHash] == 0, "DatasetRegistry: arTxId already exists");
        
        // Increment dataset index and assign new ID
        id = ++datasetIndex;
        
        // Create and store the dataset
        datasets[id] = Dataset({
            id: id,
            arTxId: arTxId,
            owner: msg.sender,
            createdAt: block.timestamp
        });
        
        // Update mappings
        txHashToId[txHash] = id;
        userDatasets[msg.sender].push(id);
        
        emit DatasetCreated(id, msg.sender, arTxId);
    }

    /**
     * @dev Gets all dataset IDs owned by a specific address
     * @param who The address to query
     * @return Array of dataset IDs owned by the address
     */
    function getDatasetsByOwner(address who) external view returns (uint256[] memory) {
        return userDatasets[who];
    }

    /**
     * @dev Transfers ownership of a dataset to a new address
     * @param id The dataset identifier
     * @param newOwner The address to transfer ownership to
     */
    function transferDatasetOwner(uint256 id, address newOwner) external {
        require(id > 0 && id <= datasetIndex, "DatasetRegistry: invalid dataset ID");
        require(newOwner != address(0), "DatasetRegistry: new owner cannot be zero address");
        
        Dataset storage dataset = datasets[id];
        address oldOwner = dataset.owner;
        
        // Check authorization: only owner or contract owner can transfer
        require(
            msg.sender == oldOwner || msg.sender == owner(),
            "DatasetRegistry: not authorized to transfer"
        );
        
        // Update dataset owner
        dataset.owner = newOwner;
        
        // Update user datasets mapping
        _removeFromUserDatasets(oldOwner, id);
        userDatasets[newOwner].push(id);
        
        emit DatasetOwnerChanged(id, oldOwner, newOwner);
    }

    /**
     * @dev Internal function to remove a dataset ID from a user's dataset list
     * @param user The user address
     * @param datasetId The dataset ID to remove
     */
    function _removeFromUserDatasets(address user, uint256 datasetId) internal {
        uint256[] storage userDatasetList = userDatasets[user];
        uint256 length = userDatasetList.length;
        
        for (uint256 i = 0; i < length; i++) {
            if (userDatasetList[i] == datasetId) {
                // Move the last element to the current position
                userDatasetList[i] = userDatasetList[length - 1];
                // Remove the last element
                userDatasetList.pop();
                break;
            }
        }
    }

    /**
     * @dev Gets the total number of datasets created
     * @return The total count of datasets
     */
    function getTotalDatasets() external view returns (uint256) {
        return datasetIndex;
    }

    /**
     * @dev Checks if a dataset exists
     * @param id The dataset identifier
     * @return True if the dataset exists, false otherwise
     */
    function datasetExists(uint256 id) external view returns (bool) {
        return id > 0 && id <= datasetIndex;
    }

    /**
     * @dev Gets the owner of a dataset
     * @param id The dataset identifier
     * @return The owner address
     */
    function getDatasetOwner(uint256 id) external view returns (address) {
        require(id > 0 && id <= datasetIndex, "DatasetRegistry: invalid dataset ID");
        return datasets[id].owner;
    }

    /**
     * @dev Gets the Arweave transaction ID of a dataset
     * @param id The dataset identifier
     * @return The Arweave transaction ID
     */
    function getDatasetArTxId(uint256 id) external view returns (string memory) {
        require(id > 0 && id <= datasetIndex, "DatasetRegistry: invalid dataset ID");
        return datasets[id].arTxId;
    }
}
