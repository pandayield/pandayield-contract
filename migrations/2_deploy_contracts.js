const BambooToken = artifacts.require("BambooToken");
const PandaLoverToken = artifacts.require("PandaLoverToken");
const LeafBar = artifacts.require("LeafBar");
const MasterChef = artifacts.require("MasterChef");
const SmartChef = artifacts.require("SmartChef");
const Timelock = artifacts.require("Timelock");
let admin = "0x8557d80FeB424BAf5363FE5287a3EA4CeEc0C4be"
let startBlock = 4684770
let pandaLoverStartBlock = 4742360
let pandaLoverEndBlock = pandaLoverStartBlock + 432000 // for 15 days
let usePandaLover = true
let pandaLoverRewardPerBlock = '25000000000000000' // 0.025 BBOO per block


module.exports = async function (deployer) {
  // 1st deployment
  const Time = await deployer.deploy(Timelock, admin, 43200)
  const Bamboo = await deployer.deploy(BambooToken)
  const Leaf = await deployer.deploy(LeafBar, Bamboo.address)
  const Master = await deployer.deploy(MasterChef, Bamboo.address, Leaf.address, admin, "500000000000000000", startBlock)
  if (usePandaLover) {
    const PandaLover = await deployer.deploy(PandaLoverToken)
    const SmartPandaLover = await deployer.deploy(SmartChef, PandaLover.address, Bamboo.address, pandaLoverRewardPerBlock, pandaLoverStartBlock, pandaLoverEndBlock)
  }
  Leaf.transferOwnership(Master.address)
}