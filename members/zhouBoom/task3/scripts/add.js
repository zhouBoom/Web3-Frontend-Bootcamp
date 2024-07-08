const { ethers } = require("hardhat");

async function main() {
    const [deployer, addr1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyERC20");
    const token = await Token.deploy(ethers.parseUnits("1000000", 18));

    console.log("Token deployed to:", token.address);

    // 为 addr1 分配代币
    await token.transfer(addr1.address, ethers.parseUnits("100000", 18));
    console.log("100000 tokens transferred to addr1");

    const balance = await token.balanceOf(addr1.address);
    console.log("Balance of addr1 is:", ethers.formatEther(balance));
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
