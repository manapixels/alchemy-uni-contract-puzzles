const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
     const Game = await ethers.getContractFactory('Game5')
     const game = await Game.deploy()

     const signer = await ethers.provider.getSigner(0)

     // find a ethereum wallet with public key starting from 00 prefix from:
     // https://vanity-eth.tk/
     const privateKey =
        '3b243b70c02bc4b963abfaff7700bf23092fc2fa07f30550d0063c7806612fb0'
     const wallet = new ethers.Wallet(privateKey, ethers.provider)
     const walletAddr = await wallet.getAddress()

     await signer.sendTransaction({
        value: ethers.utils.parseEther('10'),
        to: walletAddr,
     })

     return { game, wallet }
  }
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
