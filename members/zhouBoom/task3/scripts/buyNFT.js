const { ethers } = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  const buyer = signers[1]; // 使用第二个账户
  console.log("Using account:", buyer.address);

  const nftMarketAddress = "0xb5C48287F6dd8131A855Ec04e4e99d75c62344A5"; // 更新为新的 NFTMarket 合约地址
  const tokenId = 6; // 要购买的 NFT 的 ID
  const erc20TokenAddress = "0x0C691c5824eA0bD8214F1C8eA0826850238A8a4b"; // 更新为新的 MyERC20 合约地址
  const price = ethers.parseUnits("1", 18); // NFT 的价格

  // 获取 ERC20 合约实例并连接到第二个账户
  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myERC20 = await MyERC20.attach(erc20TokenAddress);
  const myERC20Connected = myERC20.connect(buyer);

  // 检查余额和授权
  const balance = await myERC20.balanceOf(buyer.address);
  console.log("ERC20 Balance:", ethers.formatEther(balance));

  const allowance = await myERC20.allowance(buyer.address, nftMarketAddress);
  console.log("Allowance:", ethers.formatEther(allowance));

  // 批准市场合约花费买家的 ERC20 代币
  const approveTx = await myERC20Connected.approve(nftMarketAddress, price);
  await approveTx.wait();
  console.log("Approved ERC20 for market using account:", buyer.address);

  // 获取 NFTMarket 合约实例并连接到第二个账户
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.attach(nftMarketAddress);
  const nftMarketConnected = nftMarket.connect(buyer);

  try {
    // 购买 NFT
    const buyTx = await nftMarketConnected.purchaseItem(tokenId);
    const receipt = await buyTx.wait();
    console.log("Purchased NFT with tokenId:", tokenId);
    console.log("Transaction hash:", receipt.hash);
  } catch (error) {
    console.error("Error during purchase:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
