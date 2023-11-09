require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    metachain: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://eth.testnet.ocean.jellyfishsdk.com"
    },
  }
};
