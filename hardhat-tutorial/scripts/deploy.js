const {ethers} = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS} = require("../constants")

async function main () {
  // deploying the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory("FakeNFTMarketplace");

  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();

  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace contract deployed to", fakeNftMarketplace.address);

  // Now dwploying CryptoDevsDAO contract

  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      //since our CryptoDevsDAO contract's constructor is payable so we can put some ethers while deployment
      value: ethers.utils.parseEther("0.01")
    }
  );

  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });