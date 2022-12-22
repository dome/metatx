/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("@symblox/hardhat-abi-gen");
require("xdeployer");
require("dotenv").config();
const pkey = process.env.PRIVATE_KEY || "your private key"
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },      
    ],
  },
  namedAccounts: {
    deployer: {
      default: 1,
      17: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      35: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      97: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      3501: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      3502: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",   
      35011: "0x4Fbd49c841c2f891b8e04B887B9C5035BE7c7209"   

    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
      17: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      35: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      97: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      3501: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      3502: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",  
    },
    collector: {
      default: 1,
      17: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      35: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      97: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      3501: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",
      3502: "0x4A4cF4741a96D8e0123a490cA720d84fD9b15bc4",  

    },
  },
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC,
      chainId: 1,
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true,
      tags: ["production"],
    },
    bsc: {
      url: process.env.BSC_RPC,
      chainId: 56,
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true,
      tags: ["production"],
    },
    matic: {
      url: "https://polygon-rpc.com/",
      chainId: 137,
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true
    },
    "bsc-testnet": {
      url: process.env.BSC_TESTNET_RPC,
      chainId: 97,
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true
    },
    jfin: {
      url: "https://rpc.jfinchain.com",
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true
    },
    bkc: {
      url: "https://rpc.bitkubchain.io",
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true
    },
    ethw: {
      url: "https://mainnet.ethereumpow.org",
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true
    },    
    tch: {
      url: "http://65.108.44.95:4545",
      accounts: [`0x${pkey}`],
      chainId: 703,
      live: true,
      saveDeployments: true
    },      
    "jfin-testnet": {
      url: "https://rpc.testnet.jfinchain.com",
      accounts: [`0x${pkey}`],
      live: true,
      saveDeployments: true
    }, 
    j2o: {
      url: "https://rpc.j2o.io",
      accounts: [`0x${pkey}`],
      chainId: 35011,
      live: true,
      saveDeployments: true
    },       
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  etherscan: {
    apiKey: process.env.ETH_SCAN_API_KEY,
  },
};
