import { ethers } from "hardhat";
const fmt = (v: bigint) => `${Number(ethers.formatEther(v)).toFixed(6)} ETH`;
async function main() {
  const [deployer, creator, buyer] = await ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);
  console.log("👤 Creator :", creator.address);
  console.log("👤 Buyer   :", buyer.address);

  const Registry = await ethers.getContractFactory("DatasetRegistry");
  const registry = await Registry.deploy(); await registry.waitForDeployment();
  console.log("✅ Registry      :", await registry.getAddress());

  const License = await ethers.getContractFactory("DataLicense");
  const license = await License.deploy(); await license.waitForDeployment();
  console.log("✅ LicenseCenter :", await license.getAddress());

  const Bodhi = await ethers.getContractFactory("Bodhi1155");
  const bodhi = await Bodhi.deploy(await registry.getAddress(), await license.getAddress());
  await bodhi.waitForDeployment();
  console.log("✅ Bodhi1155     :", await bodhi.getAddress());

  const arTxId = "arweave_demo_" + Date.now();
  await (await registry.connect(creator).createDataset(arTxId)).wait();
  const datasetId = Number(await registry.datasetIndex());
  console.log("🗂️  Dataset created:", datasetId, "arTxId:", arTxId);

  await (await license.createLicense("Open", 1, "ipfs://license/open")).wait();
  const licenseId = Number(await license.licenseIndex());
  await (await license.bindLicense(datasetId, licenseId)).wait();
  console.log("🔗 License bound : dataset", datasetId, "-> license", licenseId);

  await (await bodhi.mintForDataset(datasetId)).wait();
  const premint = await bodhi.totalSupply(datasetId);
  console.log("🪙 Premint       :", premint.toString(), "(should be 1e18)");

  const amt = ethers.parseEther("0.10");
  const [tb, pb, fb] = await bodhi.getBuyPriceAfterFee(datasetId, amt);
  console.log("💰 Buy preview   -> total:", fmt(tb), "price:", fmt(pb), "fee:", fmt(fb));
  await (await bodhi.connect(buyer).buy(datasetId, amt, { value: tb })).wait();
  console.log("➡️  After BUY    -> buyer balance:", (await bodhi.balanceOf(buyer.address, datasetId)).toString());

  const [ts, ps, fs] = await bodhi.getSellPriceAfterFee(datasetId, amt);
  console.log("💸 Sell preview  -> total:", fmt(ts), "price:", fmt(ps), "fee:", fmt(fs));
  await (await bodhi.connect(buyer).sell(datasetId, amt)).wait();
  console.log("⬅️  After SELL   -> buyer balance:", (await bodhi.balanceOf(buyer.address, datasetId)).toString());

  console.log("📊 Pool:", fmt(await bodhi.pool(datasetId)),
              " TotalSupply:", (await bodhi.totalSupply(datasetId)).toString());
}
main().catch((e)=>{ console.error(e); process.exit(1); });