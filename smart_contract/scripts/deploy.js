const main = async () => {
  const transactionFactory = await hre.ethers.getContractFactory(
    "Transactions"
  );
  const transactionContract = await transactionFactory.deploy();
  console.log(
    "🚀 ~ file: deploy.js ~ line 4 ~ main ~ transactionContract",
    transactionContract.address
  );

  await transactionContract.deployed();
};

//! from hardhat docs
(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
