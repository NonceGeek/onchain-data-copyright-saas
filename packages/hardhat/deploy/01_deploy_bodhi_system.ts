import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployBodhiSystem: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("🚀 Deploying Bodhi System...");

  // Step 1: Deploy DatasetRegistry
  console.log("📊 Deploying DatasetRegistry...");
  const datasetRegistry = await deploy("DatasetRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`✅ DatasetRegistry deployed at: ${datasetRegistry.address}`);

  // Step 2: Deploy DataLicense
  console.log("📜 Deploying DataLicense...");
  const dataLicense = await deploy("DataLicense", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`✅ DataLicense deployed at: ${dataLicense.address}`);

  // Step 3: Create license templates
  console.log("🔧 Creating license templates...");
  const licenseContract = await ethers.getContractAt("DataLicense", dataLicense.address);
  
  // Create three license templates
  const tx1 = await licenseContract.createLicense(
    "Prohibit Derivatives",
    0, // LicenseType.ProhibitDerivatives
    "ipfs://QmProhibitDerivativesLicenseTerms"
  );
  await tx1.wait();
  console.log("✅ Created 'Prohibit Derivatives' license");

  const tx2 = await licenseContract.createLicense(
    "Open License",
    1, // LicenseType.Open
    "ipfs://QmOpenLicenseTerms"
  );
  await tx2.wait();
  console.log("✅ Created 'Open License' license");

  const tx3 = await licenseContract.createLicense(
    "Share Back 5%",
    2, // LicenseType.ShareBack5
    "ipfs://QmShareBack5LicenseTerms"
  );
  await tx3.wait();
  console.log("✅ Created 'Share Back 5%' license");

  // Step 4: Deploy Bodhi1155
  console.log("🎯 Deploying Bodhi1155...");
  const bodhi1155 = await deploy("Bodhi1155", {
    from: deployer,
    args: [datasetRegistry.address, dataLicense.address],
    log: true,
    autoMine: true,
  });

  console.log(`✅ Bodhi1155 deployed at: ${bodhi1155.address}`);

  // Step 5: Create example dataset and bind license
  console.log("📝 Creating example dataset...");
  const registryContract = await ethers.getContractAt("DatasetRegistry", datasetRegistry.address);
  
  // Create a sample dataset with a mock Arweave transaction ID
  const mockArTxId = "QmExampleDatasetHash123456789abcdef";
  const createTx = await registryContract.createDataset(mockArTxId);
  await createTx.wait();
  
  const datasetId = 1; // First dataset gets ID 1
  console.log(`✅ Created dataset with ID: ${datasetId}`);

  // Bind the dataset to the "Share Back 5%" license
  const bindTx = await licenseContract.bindLicense(datasetId, 3); // License ID 3
  await bindTx.wait();
  console.log(`✅ Bound dataset ${datasetId} to license 3 (Share Back 5%)`);

  // Step 6: Enable shares for the dataset
  console.log("🪙 Enabling shares for dataset...");
  const bodhiContract = await ethers.getContractAt("Bodhi1155", bodhi1155.address);
  
  const mintTx = await bodhiContract.mintForDataset(datasetId);
  await mintTx.wait();
  console.log(`✅ Enabled shares for dataset ${datasetId}`);

  // Display deployment summary
  console.log("\n🎉 Bodhi System Deployment Complete!");
  console.log("=====================================");
  console.log(`DatasetRegistry: ${datasetRegistry.address}`);
  console.log(`DataLicense: ${dataLicense.address}`);
  console.log(`Bodhi1155: ${bodhi1155.address}`);
  console.log(`Example Dataset ID: ${datasetId}`);
  console.log(`Example ArTxId: ${mockArTxId}`);
  console.log("=====================================");

  // Verify contracts on Etherscan (if not on local network)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 Verifying contracts on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: datasetRegistry.address,
        constructorArguments: [],
      });
      console.log("✅ DatasetRegistry verified");

      await hre.run("verify:verify", {
        address: dataLicense.address,
        constructorArguments: [],
      });
      console.log("✅ DataLicense verified");

      await hre.run("verify:verify", {
        address: bodhi1155.address,
        constructorArguments: [datasetRegistry.address, dataLicense.address],
      });
      console.log("✅ Bodhi1155 verified");
    } catch (error) {
      console.log("⚠️ Verification failed:", error);
    }
  }
};

export default deployBodhiSystem;
deployBodhiSystem.tags = ["BodhiSystem"];
deployBodhiSystem.dependencies = [];
