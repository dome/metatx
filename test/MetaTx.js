const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { arrayify, parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Meta Token Transfer", () => {
  it("Should let the user transfer tokens through a replayer", async () => {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    const TokenSender = await ethers.getContractFactory("TokenSender");
    const tokenSender = await TokenSender.deploy();
    await tokenSender.deployed();

    const [_, addr1, relayer, addr2] = await ethers.getSigners();

    const TEN_THOUSAND = parseEther("10000");
    const tokenInstance = token.connect(addr1);
    const mint = await tokenInstance.freeMint(TEN_THOUSAND);
    await mint.wait();

    const approve = await tokenInstance.approve(
      tokenSender.address, 
      BigNumber.from(
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      ));
      await approve.wait();

      let nonce = 1;

      const amount = parseEther("10");
      const messageHash = await tokenSender.getHash(
        addr1.address,
        amount,
        addr2.address,
        token.address,
        nonce
      );

      const signature = await addr1.signMessage(arrayify(messageHash));

      const relayerInstance = tokenSender.connect(relayer);
      const metaTx = await relayerInstance.transfer(
        addr1.address,
        amount,
        addr2.address,
        token.address,
        nonce,
        signature
      );
      await metaTx.wait();

      let userBalance = await token.balanceOf(addr1.address);
      let recipientBalance = await token.balanceOf(addr2.address);

      expect(userBalance.eq(parseEther("9990"))).to.be.true;
      expect(recipientBalance.eq(parseEther("10"))).to.be.true;

      nonce++;

      const messageHash2 = await tokenSender.getHash(
        addr1.address,
        amount,
        addr2.address,
        token.address,
        nonce
      );

      const signature2 = await addr1.signMessage(arrayify(messageHash2));

      const metaTx2 = await relayerInstance.transfer(
        addr1.address,
        amount,
        addr2.address,
        token.address,
        nonce,
        signature2
      );
      await metaTx2.wait();

      userBalance = await token.balanceOf(addr1.address);
      recipientBalance = await token.balanceOf(addr2.address);

      expect(userBalance.eq(parseEther("9980"))).to.be.true;
      expect(recipientBalance.eq(parseEther("20"))).to.be.true;
    });

    it("Should not allow signature replay", async () => {
      const Token = await ethers.getContractFactory("Token");
      const token = await Token.deploy();
      await token.deployed();

      const TokenSender = await ethers.getContractFactory("TokenSender");
      const tokenSender = await TokenSender.deploy();
      await tokenSender.deployed();

      const [_, addr1, relayer, addr2] = await ethers.getSigners();

      const TEN_THOUSAND = parseEther("10000");
      const tokenInstance = token.connect(addr1);
      const mint = await tokenInstance.freeMint(TEN_THOUSAND);
      await mint.wait();

      const approve = await tokenInstance.approve(
        tokenSender.address, 
        BigNumber.from(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ));
      await approve.wait();

      let nonce = 1;

      const amount = parseEther("10");
      const relayerInstance = tokenSender.connect(relayer);
      const messageHash = await tokenSender.getHash(
        addr1.address,
        amount,
        addr2.address,
        token.address,
        nonce
      );
      const signature = await addr1.signMessage(arrayify(messageHash));

      expect(relayerInstance.transfer(
        addr1.address,
        amount,
        addr2.address,
        token.address,
        nonce,
        signature
      )).to.be.revertedWith("TxAlreadyExecuted()");
    });
});