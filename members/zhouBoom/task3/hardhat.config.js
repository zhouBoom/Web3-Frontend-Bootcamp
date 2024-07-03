require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 11155111, // Sepolia 测试网的链 ID
      accounts: [
        {
          privateKey: '0x3a171d60234f91f6d20b9eef721f61483a56405265aba7bdac03c363ce811392',
          balance: '10000000000000000000000', // 例如，10,000 ETH
        },
        {
          privateKey: '0x6d1a03c4d0b431d1b5a696b0427482b5fd3b2287870d1adbc8eaaec1f26f29ca',
          balance: '10000000000000000000000',
        }
        // 可以继续添加更多账户
      ]
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/6279d4261e3d4f399740f35db635fca4",
      accounts: [`0x3a171d60234f91f6d20b9eef721f61483a56405265aba7bdac03c363ce811392`, `0x6d1a03c4d0b431d1b5a696b0427482b5fd3b2287870d1adbc8eaaec1f26f29ca`]
    }
  }
};
