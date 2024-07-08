const { ethers } = require("hardhat");

// 检查账户是否有余额
async function checkBalance() {
  const [deployer, buyer] = await ethers.getSigners();
  const provider = ethers.provider;
  const balance = await provider.getBalance(buyer.address);
  console.log("Account balance:", ethers.formatEther(balance));

  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const erc20TokenAddress = "0x0C691c5824eA0bD8214F1C8eA0826850238A8a4b"; // 更新为新的 MyERC20 合约地址
  const myERC20 = await MyERC20.attach(erc20TokenAddress);
  
  // await myERC20.transfer(buyer.address, ethers.parseUnits("100000", 18));
  // console.log("100000 tokens transferred to addr1");
  const buyerBalance = await myERC20.balanceOf(buyer.address);
  console.log("ERC20 Balance:", ethers.formatEther(buyerBalance));

}

checkBalance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
