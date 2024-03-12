
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    shm: {
      url: process.env.SHARDEUM_RPC,
      accounts: [process.env.PRIVATE_KEY],
      gas: 20000000,
    },
  },
};
