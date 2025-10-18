// ============================================
// 📦 Deployed Contracts Configuration
// ============================================
// Network: Holesky Testnet (Chain ID: 17000)
// Last Updated: 2025-10-17

// ============================================
// 🎯 Primary Contracts
// ============================================

// BodhiBasedCopyright - Main Contract (Verified ✅)
export const BODHI_BASED_COPYRIGHT_ADDRESS = "0x73da0D133EF544B5107271A36eB30c69f84adcac";
export const BODHI_BASED_COPYRIGHT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_bodhi",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "contentURI",
        "type": "string"
      }
    ],
    "name": "LicenseGenerated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "bodhi",
    "outputs": [
      {
        "internalType": "contract IBodhi",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_contentURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_externalLink",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_licenseType",
        "type": "uint8"
      }
    ],
    "name": "generateLicense",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_assetId",
        "type": "uint256"
      }
    ],
    "name": "getLicenseByAssetId",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "externalLink",
            "type": "string"
          },
          {
            "internalType": "enum BodhiBasedCopyright.LicenseType",
            "name": "licenseType",
            "type": "uint8"
          }
        ],
        "internalType": "struct BodhiBasedCopyright.License",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "licenseIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "licenses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contentURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "externalLink",
        "type": "string"
      },
      {
        "internalType": "enum BodhiBasedCopyright.LicenseType",
        "name": "licenseType",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// License Contract (Holesky - Verified ✅)
export const LICENSE_ADDRESS = "0xc4872863fAFA8116E02004AE2Ea4a375808da312";
export const LICENSE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "datasetId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      }
    ],
    "name": "LicenseBound",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "enum License.LicenseType",
        "name": "lt",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "LicenseCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "datasetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      }
    ],
    "name": "bindLicense",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "enum License.LicenseType",
        "name": "lt",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "createLicense",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "datasetLicense",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      }
    ],
    "name": "deactivateLicense",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveLicenses",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "datasetId",
        "type": "uint256"
      }
    ],
    "name": "getLicenseOf",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "enum License.LicenseType",
            "name": "lt",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "internalType": "struct License.LicenseTemplate",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "datasetId",
        "type": "uint256"
      }
    ],
    "name": "getLicenseType",
    "outputs": [
      {
        "internalType": "enum License.LicenseType",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalLicenses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "datasetId",
        "type": "uint256"
      }
    ],
    "name": "hasLicense",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "licenseIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "licenses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "enum License.LicenseType",
        "name": "lt",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// ============================================
// 🗂️ Legacy Contracts (Deprecated - Old Architecture)
// ============================================
// Note: These addresses are from the old modular architecture
// and are kept for reference only. Use holeskyContracts for new deployments.
export const legacyContracts = {
  registry: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Deprecated
  licenseCenter: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Deprecated
  bodhi1155: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Deprecated
  license: LICENSE_ADDRESS, // Deprecated - use BodhiBasedCopyright
};

// ============================================
// 📦 Current Deployment (Recommended)
// ============================================
export const deployedContracts = {
  bodhiBasedCopyright: BODHI_BASED_COPYRIGHT_ADDRESS
};

// ============================================
// 📦 Holesky Network Configuration
// ============================================
export const holeskyContracts = {
  BodhiBasedCopyright: {
    address: BODHI_BASED_COPYRIGHT_ADDRESS,
    abi: BODHI_BASED_COPYRIGHT_ABI,
    chainId: 17000,
    verified: true,
    verificationURL: "https://repo.sourcify.dev/17000/0x73da0D133EF544B5107271A36eB30c69f84adcac/",
    etherscanURL: "https://holesky.etherscan.io/address/0x73da0D133EF544B5107271A36eB30c69f84adcac#code"
  },
  License: {
    address: LICENSE_ADDRESS,
    abi: LICENSE_ABI,
    chainId: 17000,
    verified: true,
    etherscanURL: "https://holesky.etherscan.io/address/0xc4872863fAFA8116E02004AE2Ea4a375808da312#code"
  }
};

// ============================================
// 🎯 Recommended Exports for Frontend Usage
// ============================================
export const bodhiBasedCopyrightContract = { 
  address: BODHI_BASED_COPYRIGHT_ADDRESS, 
  abi: BODHI_BASED_COPYRIGHT_ABI 
};

export const licenseContract = { 
  address: LICENSE_ADDRESS, 
  abi: LICENSE_ABI 
};

export default licenseContract;
