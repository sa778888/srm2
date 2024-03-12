import hre from "hardhat";

async function main(){
    const Contract = await hre.ethers.getContractFactory("ResearchPlatform");
    const rp = await Contract.deploy();
    await rp.deployed();
    console.log(`Deployed at ${rp.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}
);