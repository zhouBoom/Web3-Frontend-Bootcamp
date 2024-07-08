const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  let NFT;
  let nft;
  let Token;
  let token;
  let NFTMarket;
  let market;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    console.log(owner.address, addr1.address, '地址')
    // 部署 ERC-20 代币合约
    Token = await ethers.getContractFactory("MyERC20");
    token = await Token.deploy("1000000000000000000000000");

    // 部署 NFT 合约
    NFT = await ethers.getContractFactory("MyNFT");
    nft = await NFT.deploy();
    // await nft.deployed();

    // 为测试地址分配代币
    await token.transfer(owner.address, ethers.parseUnits("1", 18));
    console.log('为测试地址分配代币')

    // 部署 NFTMarket 合约
    NFTMarket = await ethers.getContractFactory("NFTMarket");
    market = await NFTMarket.deploy(token.address);
    await market.deployed();
    console.log('部署合约')

    // Mint NFT 并批准市场合约操作
    await nft.mint(owner.address);
    await nft.connect(owner).approve(market.address, 1);
    console.log('批准进入市场')
  });

  describe("Listing and buying NFT", function () {
    it("should allow users to list and buy NFTs", async function () {
      // 上架 NFT
      await market.connect(owner).listItem(nft.address, 1, ethers.parseUnits("1", 18));

      // 检查上架后的事件
      await expect(market.connect(owner).listItem(nft.address, 1,ethers.parseUnits("1", 18)))
        .to.emit(market, 'NFTListed')
        .withArgs(owner.address, nft.address, 1,ethers.parseUnits("1", 18));

      // 批准并购买 NFT
      await token.connect(addr1).approve(market.address,ethers.parseUnits("1", 18));
      await market.connect(addr1).purchaseItem(0);

      // 验证购买成功的事件
      await expect(market.connect(addr1).purchaseItem(0))
        .to.emit(market, 'NFTPurchased')
        .withArgs(addr1.address, nft.address, 1,ethers.parseUnits("1", 18));
    });
  });
});
