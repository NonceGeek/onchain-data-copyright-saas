// 10: [
//   {
//     chainId: "10",
//     name: "Optimism",
//     contracts: {
//       // Hint: config here.
//       OnChainBook: {
//         address: "0x505d9Ae884AC1A7f243152A24E0A1Cbd1d04Cc6C",
const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "Hardhat",
      contracts: {
        DatasetRegistry: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
                { indexed: true, internalType: "address", name: "owner", type: "address" },
                { indexed: false, internalType: "string", name: "arTxId", type: "string" },
              ],
              name: "DatasetCreated",
              type: "event",
            },
            {
              inputs: [{ internalType: "string", name: "arTxId", type: "string" }],
              name: "createDataset",
              outputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "datasets",
              outputs: [
                { internalType: "uint256", name: "id", type: "uint256" },
                { internalType: "string", name: "arTxId", type: "string" },
                { internalType: "address", name: "owner", type: "address" },
                { internalType: "uint256", name: "createdAt", type: "uint256" },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "datasetIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DataLicense: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                { internalType: "string", name: "name", type: "string" },
                { internalType: "uint8", name: "lt", type: "uint8" },
                { internalType: "string", name: "uri", type: "string" },
              ],
              name: "createLicense",
              outputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "licenses",
              outputs: [
                { internalType: "uint256", name: "id", type: "uint256" },
                { internalType: "string", name: "name", type: "string" },
                { internalType: "string", name: "uri", type: "string" },
                { internalType: "uint8", name: "lt", type: "uint8" },
                { internalType: "bool", name: "active", type: "bool" },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "licenseIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        Bodhi1155: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [
                { internalType: "address", name: "_registry", type: "address" },
                { internalType: "address", name: "_licenseCenter", type: "address" },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                { internalType: "uint256", name: "id", type: "uint256" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              name: "getBuyPriceAfterFee",
              outputs: [
                { internalType: "uint256", name: "total", type: "uint256" },
                { internalType: "uint256", name: "price", type: "uint256" },
                { internalType: "uint256", name: "fee", type: "uint256" },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "totalSupply",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "address", name: "account", type: "address" },
                { internalType: "uint256", name: "id", type: "uint256" },
              ],
              name: "balanceOf",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  17000: [
    {
      chainId: "17000",
      name: "Holesky",
      contracts: {
        BodhiBasedCopyright: {
          address: "0x73da0D133EF544B5107271A36eB30c69f84adcac",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor"
            },
            {
              inputs: [],
              name: "copyrightNFT",
              outputs: [
                {
                  internalType: "contract CopyrightNFT",
                  name: "",
                  type: "address"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_contentHash",
                  type: "bytes32"
                },
                {
                  internalType: "string",
                  name: "_name",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "_licenseId",
                  type: "uint256"
                },
                {
                  internalType: "string",
                  name: "_uri",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "_link",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "_bodhiId",
                  type: "uint256"
                }
              ],
              name: "generateCopyright",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256"
                }
              ],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_name",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "_uri",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "_link",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "_bodhiId",
                  type: "uint256"
                }
              ],
              name: "generateLicense",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256"
                }
              ],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_copyrightId",
                  type: "uint256"
                }
              ],
              name: "getCopyright",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "contentHash",
                  type: "bytes32"
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "licenseId",
                  type: "uint256"
                },
                {
                  internalType: "string",
                  name: "link",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "bodhi_id",
                  type: "uint256"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_licenseId",
                  type: "uint256"
                }
              ],
              name: "getLicense",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "uri",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "link",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "bodhi_id",
                  type: "uint256"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [],
              name: "licenseNFT",
              outputs: [
                {
                  internalType: "contract LicenseNFT",
                  name: "",
                  type: "address"
                }
              ],
              stateMutability: "view",
              type: "function"
            }
          ],
        },
        License: {
          address: "0xc4872863fAFA8116E02004AE2Ea4a375808da312",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "datasetId",
                  type: "uint256"
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "licenseId",
                  type: "uint256"
                }
              ],
              name: "LicenseBound",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256"
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "name",
                  type: "string"
                },
                {
                  indexed: false,
                  internalType: "enum License.LicenseType",
                  name: "lt",
                  type: "uint8"
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "uri",
                  type: "string"
                }
              ],
              name: "LicenseCreated",
              type: "event"
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "datasetId",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "licenseId",
                  type: "uint256"
                }
              ],
              name: "bindLicense",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string"
                },
                {
                  internalType: "enum License.LicenseType",
                  name: "lt",
                  type: "uint8"
                },
                {
                  internalType: "string",
                  name: "uri",
                  type: "string"
                }
              ],
              name: "createLicense",
              outputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256"
                }
              ],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [],
              name: "getTotalLicenses",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [],
              name: "licenseIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256"
                }
              ],
              name: "licenses",
              outputs: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256"
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "uri",
                  type: "string"
                },
                {
                  internalType: "enum License.LicenseType",
                  name: "lt",
                  type: "uint8"
                },
                {
                  internalType: "bool",
                  name: "active",
                  type: "bool"
                }
              ],
              stateMutability: "view",
              type: "function"
            }
          ],
        },
      },
    },
  ],
  10: [
    {
      chainId: "10",
      name: "Optimism",
      contracts: {
        // Hint: config here.
        BodhiBasedAIAgentFactory: {
          address: "0xE3dE0a0446a962E94c894d9FcDc69CFA1c9E542C",

          abi: [
            {
              inputs: [{ internalType: "address", name: "_bodhiAddress", type: "address" }],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            { inputs: [], name: "InvalidBodhiAddress", type: "error" },
            {
              anonymous: false,
              inputs: [
                { indexed: true, internalType: "uint256", name: "agentIndex", type: "uint256" },
                { indexed: true, internalType: "address", name: "agentAddress", type: "address" },
                { indexed: true, internalType: "uint256", name: "agentBodhiId", type: "uint256" },
                { indexed: false, internalType: "address", name: "creator", type: "address" },
              ],
              name: "AgentCreated",
              type: "event",
            },
            {
              inputs: [],
              name: "agentIndex",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "agents",
              outputs: [{ internalType: "address", name: "", type: "address" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bodhiAddress",
              outputs: [{ internalType: "address", name: "", type: "address" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "agentBodhiId", type: "uint256" }],
              name: "create",
              outputs: [{ internalType: "address", name: "agentAddress", type: "address" }],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
              name: "getAgent",
              outputs: [{ internalType: "address", name: "", type: "address" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAgentCount",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                { internalType: "uint256", name: "start", type: "uint256" },
                { internalType: "uint256", name: "end", type: "uint256" },
              ],
              name: "getAgents",
              outputs: [{ internalType: "address[]", name: "agentAddresses", type: "address[]" }],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        BodhiBasedAIAgent: {
          address: "0x5B074757a1Ae77ac5d63a3292E4EC8E5C3A2EcB4",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_bodhiAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_agentBodhiId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_creator",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "AgentAlreadyInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "AgentNotInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "BalanceInsufficient",
              type: "error",
            },
            {
              inputs: [],
              name: "BodhiAssetNotFound",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidArrayLength",
              type: "error",
            },
            {
              inputs: [],
              name: "SameOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "Unauthorized",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "agentId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
              ],
              name: "AgentInitialized",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "agentId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
              ],
              name: "BrainInitialized",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "agentId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "newKnowledges",
                  type: "uint256[]",
                },
              ],
              name: "KnowledgesUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "agentId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "agentId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "newPrompts",
                  type: "uint256[]",
                },
              ],
              name: "PromptsUpdated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "knowledgeId",
                  type: "uint256",
                },
              ],
              name: "addKnowledge",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "promptId",
                  type: "uint256",
                },
              ],
              name: "addPrompt",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "agentId",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "bodhi",
              outputs: [
                {
                  internalType: "contract IBodhi",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "creator",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAgentInfo",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_agentId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_creator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "_initialized",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "promptCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "knowledgeCount",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "getKnowledge",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getKnowledgeCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getKnowledges",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "getPrompt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPromptCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPrompts",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "_prompts",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_knowledges",
                  type: "uint256[]",
                },
              ],
              name: "initialize",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "initialized",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "knowledges",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "prompts",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "removeKnowledge",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "removePrompt",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "_knowledges",
                  type: "uint256[]",
                },
              ],
              name: "updateKnowledges",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "_prompts",
                  type: "uint256[]",
                },
              ],
              name: "updatePrompts",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
