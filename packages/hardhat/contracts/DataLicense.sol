// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DataLicense
 * @dev Manages license templates and their binding to datasets
 * 
 * This contract focuses on "rights definition" and "rule establishment" rather than
 * enforcement or legal action. It provides a framework for defining how datasets
 * can be used while leaving actual enforcement to external systems.
 */
contract DataLicense is Ownable {
    
    /**
     * @dev License types defining different usage permissions
     * @param ProhibitDerivatives No derivatives allowed - dataset can only be used as-is
     * @param Open Fully open - dataset can be used freely including derivatives
     * @param ShareBack5 Open with 5% revenue sharing - derivatives allowed but 5% goes to original creator
     */
    enum LicenseType {
        ProhibitDerivatives,
        Open,
        ShareBack5
    }

    /**
     * @dev License structure containing template information
     * @param id Unique license identifier (starts from 1)
     * @param name Human-readable name for the license
     * @param uri URI pointing to detailed license terms (e.g., IPFS hash)
     * @param lt License type enum value
     * @param active Whether this license template is currently active
     */
    struct License {
        uint256 id;
        string name;
        string uri;
        LicenseType lt;
        bool active;
    }

    /// @dev Next license ID to be assigned (starts from 1)
    uint256 public licenseIndex;

    /// @dev Mapping from license ID to License struct
    mapping(uint256 => License) public licenses;

    /// @dev Mapping from dataset ID to license ID
    mapping(uint256 => uint256) public datasetLicense;

    /**
     * @dev Emitted when a new license template is created
     * @param id The unique license identifier
     * @param name The license name
     * @param lt The license type
     * @param uri The license URI
     */
    event LicenseCreated(uint256 indexed id, string name, LicenseType lt, string uri);

    /**
     * @dev Emitted when a license is bound to a dataset
     * @param datasetId The dataset identifier
     * @param licenseId The license identifier
     */
    event LicenseBound(uint256 indexed datasetId, uint256 indexed licenseId);

    /**
     * @dev Constructor sets the initial owner
     */
    constructor() Ownable() {}

    /**
     * @dev Creates a new license template
     * @param name Human-readable name for the license
     * @param lt License type enum value
     * @param uri URI pointing to detailed license terms
     * @return id The unique identifier assigned to the license
     */
    function createLicense(
        string calldata name,
        LicenseType lt,
        string calldata uri
    ) external onlyOwner returns (uint256 id) {
        require(bytes(name).length > 0, "DataLicense: name cannot be empty");
        require(bytes(uri).length > 0, "DataLicense: uri cannot be empty");
        
        // Increment license index and assign new ID
        id = ++licenseIndex;
        
        // Create and store the license
        licenses[id] = License({
            id: id,
            name: name,
            uri: uri,
            lt: lt,
            active: true
        });
        
        emit LicenseCreated(id, name, lt, uri);
    }

    /**
     * @dev Binds a license to a dataset
     * @param datasetId The dataset identifier
     * @param licenseId The license identifier
     */
    function bindLicense(uint256 datasetId, uint256 licenseId) external onlyOwner {
        require(datasetId > 0, "DataLicense: invalid dataset ID");
        require(licenseId > 0 && licenseId <= licenseIndex, "DataLicense: invalid license ID");
        require(licenses[licenseId].active, "DataLicense: license is not active");
        
        datasetLicense[datasetId] = licenseId;
        
        emit LicenseBound(datasetId, licenseId);
    }

    /**
     * @dev Gets the license bound to a specific dataset
     * @param datasetId The dataset identifier
     * @return The License struct for the dataset
     */
    function getLicenseOf(uint256 datasetId) external view returns (License memory) {
        uint256 licenseId = datasetLicense[datasetId];
        require(licenseId > 0, "DataLicense: no license bound to dataset");
        
        return licenses[licenseId];
    }

    /**
     * @dev Checks if a dataset has a license bound to it
     * @param datasetId The dataset identifier
     * @return True if dataset has a license, false otherwise
     */
    function hasLicense(uint256 datasetId) external view returns (bool) {
        return datasetLicense[datasetId] > 0;
    }

    /**
     * @dev Gets the license type for a dataset
     * @param datasetId The dataset identifier
     * @return The license type enum value
     */
    function getLicenseType(uint256 datasetId) external view returns (LicenseType) {
        uint256 licenseId = datasetLicense[datasetId];
        require(licenseId > 0, "DataLicense: no license bound to dataset");
        
        return licenses[licenseId].lt;
    }

    /**
     * @dev Deactivates a license template
     * @param licenseId The license identifier
     */
    function deactivateLicense(uint256 licenseId) external onlyOwner {
        require(licenseId > 0 && licenseId <= licenseIndex, "DataLicense: invalid license ID");
        require(licenses[licenseId].active, "DataLicense: license already inactive");
        
        licenses[licenseId].active = false;
    }

    /**
     * @dev Gets the total number of licenses created
     * @return The total count of licenses
     */
    function getTotalLicenses() external view returns (uint256) {
        return licenseIndex;
    }

    /**
     * @dev Gets all active licenses
     * @return Array of active license IDs
     */
    function getActiveLicenses() external view returns (uint256[] memory) {
        uint256[] memory activeLicenses = new uint256[](licenseIndex);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= licenseIndex; i++) {
            if (licenses[i].active) {
                activeLicenses[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeLicenses[i];
        }
        
        return result;
    }
}
