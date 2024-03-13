
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    shm: {
      url:"https://hackathon.shardeum.org/",
      accounts: ["36d768cade7afbc224efddc2d5c1060cec7a2cde9926c64343d5674c0e4da146"],
      gas: 20000000,
    },
  },
};
