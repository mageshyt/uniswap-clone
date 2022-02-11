require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/xATt0pzDavRnD71a8PU1y3uyk94CVGf3",
      accounts: [
        "1d2b334a3bc9688e917969a499198cc3cab30dd2a034f5e76b3d89a79b1c99e4",
      ],
    },
  },
};
