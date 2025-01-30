import { expect } from "chai";
import { ethers } from "hardhat";

describe("EscrowFOB", function () {
  let EscrowFOB: any;
  let escrow: any;
  let buyer: any;
  let seller: any;

  beforeEach(async function () {
    [buyer, seller] = await ethers.getSigners();
    EscrowFOB = await ethers.getContractFactory("EscrowFOB");
    escrow = await EscrowFOB.deploy(seller.address, { value: ethers.parseEther("1") });
    await escrow.waitForDeployment();
  });

  it("Should deploy and initialize correctly", async function () {
    expect(await escrow.buyer()).to.equal(buyer.address);
    expect(await escrow.seller()).to.equal(seller.address);
    expect(await ethers.provider.getBalance(escrow.target)).to.equal(ethers.parseEther("1"));
  });

  it("Should allow seller to confirm shipment", async function () {
    await escrow.connect(seller).confirmShipment();
    expect(await escrow.isShipped()).to.equal(true);
  });

  it("Should not allow non-seller to confirm shipment", async function () {
    await expect(escrow.connect(buyer).confirmShipment()).to.be.revertedWith("Only seller can confirm shipment");
  });

  it("Should allow buyer to release funds after shipment", async function () {
    await escrow.connect(seller).confirmShipment();
    await escrow.connect(buyer).releaseFunds();

    expect(await ethers.provider.getBalance(escrow.target)).to.equal(0);
  });

  it("Should not allow buyer to release funds before shipment is confirmed", async function () {
    await expect(escrow.connect(buyer).releaseFunds()).to.be.revertedWith("Shipment must be confirmed before release");
  });

  it("Should emit ShipmentConfirmed and FundsReleased events", async function () {
    // Vérifier que ShipmentConfirmed est bien émis après un seul appel
    await expect(escrow.connect(seller).confirmShipment())
      .to.emit(escrow, "ShipmentConfirmed")
      .withArgs(seller.address);

    // Vérifier que FundsReleased est bien émis après libération des fonds
    await expect(escrow.connect(buyer).releaseFunds())
      .to.emit(escrow, "FundsReleased")
      .withArgs(buyer.address, ethers.parseEther("1"));
  });
});
