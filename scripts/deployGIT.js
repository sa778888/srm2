const hre = require("hardhat");

async function main(){
    const Git = await hre.ethers.getContractFactory("Git");
    const git = await Git.deploy();
    await git.deployed();
    console.log(`Deployed at ${git.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}
);