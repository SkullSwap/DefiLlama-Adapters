const { sumTokens2, nullAddress, } = require('../helper/unwrapLPs')

const ethSSIPEth = '0x29B4b8674D93b36Bf651d0b86A8e5bE3c378aCF4'
const kavaSSIPKava = '0x112a295B0fCd382E47E98E8271e45979EDf952b6'

const config = {
  ethereum: {
    uToken: '0x474021845c4643113458ea4414bdb7fb74a01a77',
    tokensAndOwners: [
      [nullAddress, ethSSIPEth],
      ['0xdac17f958d2ee523a2206206994597c13d831ec7', '0x920d510d5c70c01989b66f4e24687dddb988ddae'],
      ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', '0xfdfaa453ef3709d2c26ecf43786a14ab8bf27e36'],
    ],
    pools: [
      '0x1eECc8C8298ed9Bd46c147D44E2D7A7BfACE2034', // UNO SSRP
      '0xbd3E70819A8Add92B06d6d92A06DcdA9249DF2a3',  // UNO SSIP
      '0x920d510d5c70c01989b66f4e24687dddb988ddae', // USDT SSIP
      '0xfdfaa453ef3709d2c26ecf43786a14ab8bf27e36' // USDC SSIP
    ],
  },
  bsc: {
    uToken: '0x474021845C4643113458ea4414bdb7fB74A01A77',
    tokensAndOwners: [
      ['0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', '0xEcE9f1A3e8bb72b94c4eE072D227b9c9ba4cd750'],
      ['0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', '0x0b5C802ecA88161B5daed08e488C83d819a0cD02'],
      ['0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', '0x2cd32dF1C436f8dE6e09d1A9851945c56bcEd32a'],
      ['0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', '0xFC9a02a13B19F65219034AB03ADcD8CAdf275f35'],
      ['0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', '0x456d60a7E2a2DA97BDb43759Cf63f7acbC3a700a'],
    ],
    pools: [
      '0xFC9a02a13B19F65219034AB03ADcD8CAdf275f35', // Zeus V2
      '0x456d60a7E2a2DA97BDb43759Cf63f7acbC3a700a' // Ares V2
    ],
  },
  kava: {
    tokensAndOwners: [
      [nullAddress, kavaSSIPKava],
      ['0xfA9343C3897324496A05fC75abeD6bAC29f8A40f', '0x6cEC77829F474b56c327655f3281739De112B019'],
    ]
  }
}

module.exports = {
  start: 1626100000,  // Sep-20-2021 07:27:47 AM +UTC
};

Object.keys(config).forEach(chain => {
  const { pools, uToken, tokensAndOwners, } = config[chain]
  module.exports[chain] = {
    tvl: async (_, _b, _cb, { api,}) =>  sumTokens2({...api, tokensAndOwners})
  }
  if (uToken)
  module.exports[chain].staking = async (_, _b, _cb, { api,}) =>  sumTokens2({...api, tokens: [uToken], owners: pools})
})