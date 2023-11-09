const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    
    //Deploying new sdt
    console.log('Deploying SDT...');
    const sdtToken = await hre.ethers.deployContract('SDT')
    await sdtToken.waitForDeployment()

    // // // Use existing sdt
    // console.log('Using existing SDT...');
    // const sdtToken = await hre.ethers.getContractAt('SDT', '0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91')

    console.log('SDT deployed to:', sdtToken.target)

    //Deploying new skt
    console.log('Deploying SKT...');
    const sktToken = await hre.ethers.deployContract('SKT')
    await sktToken.waitForDeployment();

    // // Use existing sdt
    // console.log('Using existing SKT...');
    // const sktToken = await hre.ethers.getContractAt('SKT', '0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91')

    console.log('SKT deployed to:', sktToken.target);
    
    // Deploy new TokenSwap
    console.log('Deploying TokenSwap...');
    const tokenSwap = await hre.ethers.deployContract('TokenSwap', [sdtToken.target, sktToken.target])
    await tokenSwap.waitForDeployment()

    // // Use existing TokenSwap
    // console.log('Using existing TokenSwap...');
    // const tokenSwap = await hre.ethers.getContractAt('TokenSwap', '0xc77D11a9E235a29e923614A9a0a08FCA155d3C39')

    console.log('TokenSwap deployed to:', tokenSwap.target);

    
    // Approve TokenSwap to spend tokens
    console.log('Approving SDT...');
    await sdtToken.approve(tokenSwap.target, '2000000000000000000000000000000000');
    console.log('SDT approved \n Approving SKT...');
    await sktToken.approve(tokenSwap.target, '2000000000000000000000000000000000');
    console.log('SKT approved \n Adding liquidity...')
    
    // Add liquidity of 100,000 SDT and 100,000 SKT
    await tokenSwap.addLiquidity(
    '100000000000000000000000',
    '100000000000000000000000'
    );

    console.log('Liquidity added, Perfoming swap...')
    
    // Swap 20,000 SDT to SKT
    const tx = await tokenSwap.swapTokens(
    '20000000000000000000000', // 20,000 SDT
    sdtToken.target,
    sktToken.target
    );

    console.log('Swap successfull!');

    console.log("Transaction hash", tx.hash);

    console.log(`Open explorer and submit: https://meta.defiscan.live/tx/${tx.hash}`)
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
