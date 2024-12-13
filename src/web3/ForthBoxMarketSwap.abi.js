export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'addWhiteAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'buys',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'cancle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'cancles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'bStart',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'bStartPlanBuy',
        type: 'bool',
      },
    ],
    name: 'changeBatchOperation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tFundAdress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'feeRate',
        type: 'uint256',
      },
    ],
    name: 'changeFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tManager',
        type: 'address',
      },
    ],
    name: 'changeManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'event_newOrder',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'fix',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'fixs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'contractTypeInt',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'contractAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'token_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'erc20Addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'planBuy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'contractTypeInt',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'contractAddr',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'token_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'erc20Addr',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'planBuys',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'contractTypeInt',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'contractAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'token_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'erc20Addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'planSell',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'contractTypeInt',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'contractAddr',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'token_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'erc20Addr',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'planSells',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'removeWhiteAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'token_id_sell',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'sell',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'token_id_sells',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: 'key',
        type: 'uint256',
      },
    ],
    name: 'sells',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contractAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'feeRate',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'feeAddress',
        type: 'address',
      },
    ],
    name: 'setProjectFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'checkID',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
    ],
    name: 'checkIDs',
    outputs: [
      {
        internalType: 'bool[]',
        name: '',
        type: 'bool[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contractAddr',
        type: 'address',
      },
    ],
    name: 'getProjectFee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'feeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sumProjectFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sumFundFee',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'feeAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'isWhiteContract',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mFeeRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mFundAdress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mSumAllFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mSumFundFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'swapInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'enum ForthBoxMarketSwap.enumSwapType',
            name: 'swapType',
            type: 'uint8',
          },
          {
            internalType: 'enum ForthBoxMarketSwap.enumStateType',
            name: 'stateType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'startAddr',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ForthBoxMarketSwap.enumContractType',
                name: 'contractType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'contractAddr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'token_id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'erc20Addr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
            ],
            internalType: 'struct ForthBoxMarketSwap.sContractData',
            name: 'contractData',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'endAddr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'swapId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'key',
            type: 'uint256',
          },
        ],
        internalType: 'struct ForthBoxMarketSwap.sSwapData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
    ],
    name: 'swapInfos',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'enum ForthBoxMarketSwap.enumSwapType',
            name: 'swapType',
            type: 'uint8',
          },
          {
            internalType: 'enum ForthBoxMarketSwap.enumStateType',
            name: 'stateType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'startAddr',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'enum ForthBoxMarketSwap.enumContractType',
                name: 'contractType',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'contractAddr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'token_id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'erc20Addr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
            ],
            internalType: 'struct ForthBoxMarketSwap.sContractData',
            name: 'contractData',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'endAddr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'swapId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'key',
            type: 'uint256',
          },
        ],
        internalType: 'struct ForthBoxMarketSwap.sSwapData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    name: 'tokenPlanBuyInfos',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenPlanSellInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'fromIth',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'toIth',
        type: 'uint256',
      },
    ],
    name: 'userOrderIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'userOrderNum',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
