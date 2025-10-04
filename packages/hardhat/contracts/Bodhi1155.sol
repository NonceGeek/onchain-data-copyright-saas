// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DatasetRegistry.sol";
import "./DataLicense.sol";

/**
 * @title Bodhi1155
 * @dev ERC1155-based shares contract with cubic curve pricing and creator fees
 * 
 * This contract implements a bonding curve mechanism where each dataset corresponds
 * to an ERC1155 token ID (assetId). The pricing follows a cubic curve formula,
 * and creators receive a 5% fee on all trades. The CREATOR_PREMINT ensures
 * creators always retain some ownership stake in their datasets.
 */
contract Bodhi1155 is ERC1155, ReentrancyGuard, Ownable {
    
    /// @dev Amount of tokens pre-minted to creators (1e18 = 1 token)
    uint256 public constant CREATOR_PREMINT = 1e18;
    
    /// @dev Creator fee percentage (5%)
    uint256 public constant CREATOR_FEE_PERCENT = 5;
    
    /// @dev Reference to the dataset registry contract
    DatasetRegistry public registry;
    
    /// @dev Reference to the license center contract
    DataLicense public licenseCenter;
    
    /// @dev Mapping from asset ID to total supply
    mapping(uint256 => uint256) public totalSupply;
    
    /// @dev Mapping from asset ID to ETH pool amount
    mapping(uint256 => uint256) public pool;
    
    /**
     * @dev Emitted when a trade occurs
     * @param tradeType 1 for buy, 2 for sell
     * @param assetId The asset identifier
     * @param sender The address making the trade
     * @param amount The amount of tokens traded
     * @param ethAmount The ETH amount involved
     * @param creatorFee The fee paid to the creator
     */
    event Trade(
        uint8 tradeType,
        uint256 indexed assetId,
        address indexed sender,
        uint256 amount,
        uint256 ethAmount,
        uint256 creatorFee
    );

    /**
     * @dev Constructor initializes the contract with registry and license center addresses
     * @param _registry Address of the DatasetRegistry contract
     * @param _licenseCenter Address of the DataLicense contract
     */
    constructor(
        address _registry,
        address _licenseCenter
    ) ERC1155("") Ownable() {
        require(_registry != address(0), "Bodhi1155: invalid registry address");
        require(_licenseCenter != address(0), "Bodhi1155: invalid license center address");
        
        registry = DatasetRegistry(_registry);
        licenseCenter = DataLicense(_licenseCenter);
    }

    /**
     * @dev Internal function implementing the cubic curve pricing formula
     * @param x The supply amount
     * @return The curve value
     */
    function _curve(uint256 x) internal pure returns (uint256) {
        if (x <= CREATOR_PREMINT) {
            return 0;
        }
        uint256 diff = x - CREATOR_PREMINT;
        return diff * diff * diff;
    }

    /**
     * @dev Calculates the price for a given supply and amount
     * @param supply Current total supply
     * @param amount Amount to calculate price for
     * @return The price in ETH (wei)
     */
    function getPrice(uint256 supply, uint256 amount) public pure returns (uint256) {
        uint256 curveAfter = _curve(supply + amount);
        uint256 curveBefore = _curve(supply);
        uint256 delta = curveAfter - curveBefore;
        
        // Normalize: divide by 1e18 twice and then by 50000 for reasonable pricing
        return delta / 1e18 / 1e18 / 50000;
    }

    /**
     * @dev Calculates buy price including fees
     * @param id Asset ID
     * @param amount Amount to buy
     * @return total Total cost including fees
     * @return price Base price before fees
     * @return fee Creator fee amount
     */
    function getBuyPriceAfterFee(uint256 id, uint256 amount) public view returns (
        uint256 total,
        uint256 price,
        uint256 fee
    ) {
        price = getPrice(totalSupply[id], amount);
        fee = (price * CREATOR_FEE_PERCENT) / 100;
        total = price + fee;
    }

    /**
     * @dev Calculates sell price including fees
     * @param id Asset ID
     * @param amount Amount to sell
     * @return total Total proceeds after fees
     * @return price Base price before fees
     * @return fee Creator fee amount
     */
    function getSellPriceAfterFee(uint256 id, uint256 amount) public view returns (
        uint256 total,
        uint256 price,
        uint256 fee
    ) {
        require(totalSupply[id] >= amount, "Bodhi1155: insufficient supply");
        
        price = getPrice(totalSupply[id] - amount, amount);
        fee = (price * CREATOR_FEE_PERCENT) / 100;
        total = price - fee;
    }

    /**
     * @dev Mints shares for a dataset (only callable by owner)
     * @param datasetId The dataset identifier
     */
    function mintForDataset(uint256 datasetId) external onlyOwner {
        require(registry.datasetExists(datasetId), "Bodhi1155: dataset does not exist");
        require(totalSupply[datasetId] == 0, "Bodhi1155: shares already minted for dataset");
        
        address creator = registry.getDatasetOwner(datasetId);
        
        // Pre-mint tokens to creator
        totalSupply[datasetId] = CREATOR_PREMINT;
        _mint(creator, datasetId, CREATOR_PREMINT, "");
    }

    /**
     * @dev Buys shares for an asset
     * @param id Asset ID
     * @param amount Amount of shares to buy
     */
    function buy(uint256 id, uint256 amount) external payable nonReentrant {
        require(registry.datasetExists(id), "Bodhi1155: dataset does not exist");
        require(totalSupply[id] > 0, "Bodhi1155: shares not minted for dataset");
        require(amount > 0, "Bodhi1155: amount must be greater than 0");
        
        (uint256 totalCost, uint256 price, uint256 fee) = getBuyPriceAfterFee(id, amount);
        require(msg.value >= totalCost, "Bodhi1155: insufficient payment");
        
        // Update state first (before external calls)
        totalSupply[id] += amount;
        pool[id] += price;
        
        // Mint tokens to buyer
        _mint(msg.sender, id, amount, "");
        
        // Transfer creator fee
        address creator = registry.getDatasetOwner(id);
        if (fee > 0) {
            (bool success, ) = creator.call{value: fee}("");
            require(success, "Bodhi1155: creator fee transfer failed");
        }
        
        // Refund excess payment
        if (msg.value > totalCost) {
            (bool success, ) = msg.sender.call{value: msg.value - totalCost}("");
            require(success, "Bodhi1155: refund failed");
        }
        
        emit Trade(1, id, msg.sender, amount, totalCost, fee);
    }

    /**
     * @dev Sells shares for an asset
     * @param id Asset ID
     * @param amount Amount of shares to sell
     */
    function sell(uint256 id, uint256 amount) external nonReentrant {
        require(amount > 0, "Bodhi1155: amount must be greater than 0");
        require(balanceOf(msg.sender, id) >= amount, "Bodhi1155: insufficient balance");
        require(totalSupply[id] - amount >= CREATOR_PREMINT, "Bodhi1155: cannot sell below creator premint");
        
        (uint256 proceeds, uint256 price, uint256 fee) = getSellPriceAfterFee(id, amount);
        require(pool[id] >= price, "Bodhi1155: insufficient pool liquidity");
        
        // Update state first (before external calls)
        totalSupply[id] -= amount;
        pool[id] -= price;
        
        // Burn tokens from seller
        _burn(msg.sender, id, amount);
        
        // Transfer proceeds to seller
        if (proceeds > 0) {
            (bool success, ) = msg.sender.call{value: proceeds}("");
            require(success, "Bodhi1155: seller payment failed");
        }
        
        // Transfer creator fee
        address creator = registry.getDatasetOwner(id);
        if (fee > 0) {
            (bool success, ) = creator.call{value: fee}("");
            require(success, "Bodhi1155: creator fee transfer failed");
        }
        
        emit Trade(2, id, msg.sender, amount, proceeds + fee, fee);
    }

    /**
     * @dev Returns the URI for a given token ID
     * @param id Token ID
     * @return The URI string (Arweave transaction ID)
     */
    function uri(uint256 id) public view override returns (string memory) {
        require(registry.datasetExists(id), "Bodhi1155: dataset does not exist");
        return registry.getDatasetArTxId(id);
    }

    /**
     * @dev Gets the creator of a dataset
     * @param id Asset ID
     * @return The creator address
     */
    function getCreator(uint256 id) external view returns (address) {
        require(registry.datasetExists(id), "Bodhi1155: dataset does not exist");
        return registry.getDatasetOwner(id);
    }

    /**
     * @dev Gets the license type for a dataset
     * @param id Asset ID
     * @return The license type enum value
     */
    function getLicenseType(uint256 id) external view returns (DataLicense.LicenseType) {
        require(registry.datasetExists(id), "Bodhi1155: dataset does not exist");
        return licenseCenter.getLicenseType(id);
    }

    /**
     * @dev Checks if shares are minted for a dataset
     * @param id Asset ID
     * @return True if shares are minted, false otherwise
     */
    function isMinted(uint256 id) external view returns (bool) {
        return totalSupply[id] > 0;
    }

    /**
     * @dev Gets the current price for buying 1 token
     * @param id Asset ID
     * @return The price in ETH (wei)
     */
    function getCurrentBuyPrice(uint256 id) external view returns (uint256) {
        (uint256 total, , ) = getBuyPriceAfterFee(id, 1e18);
        return total;
    }

    /**
     * @dev Gets the current price for selling 1 token
     * @param id Asset ID
     * @return The price in ETH (wei)
     */
    function getCurrentSellPrice(uint256 id) external view returns (uint256) {
        (uint256 total, , ) = getSellPriceAfterFee(id, 1e18);
        return total;
    }
}
