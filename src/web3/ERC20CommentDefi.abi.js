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
    inputs: [],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'notifyRewardAmount',
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'RewardAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'RewardPaid',
    type: 'event',
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
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'bPraise',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'hamID',
        type: 'uint256',
      },
    ],
    name: 'writeComment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'bPraise',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hamID',
        type: 'uint256',
      },
    ],
    name: 'WriteComment',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
    name: 'basicDailyReward',
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
    ],
    name: 'bComment',
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
        internalType: 'uint256',
        name: 'hamID',
        type: 'uint256',
      },
    ],
    name: 'bCommentHamId',
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
        name: 'tokenIdArr',
        type: 'uint256[]',
      },
    ],
    name: 'bCommentHamIds',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'bComHamIds',
        type: 'bool[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'iD',
        type: 'uint256',
      },
    ],
    name: 'commentInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'bPraise',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'updataTime',
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
    ],
    name: 'commentInfoFromAddress',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'addr2',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'bPraise',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'updataTime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fromId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'toId',
        type: 'uint256',
      },
    ],
    name: 'commentInfos',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'idArr',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: 'addrArr',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'scoreArr',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: 'strArr',
        type: 'string[]',
      },
      {
        internalType: 'bool[]',
        name: 'bPraiseArr',
        type: 'bool[]',
      },
      {
        internalType: 'uint256[]',
        name: 'updataTimeArr',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DeFi_Token',
    outputs: [
      {
        internalType: 'contract IStakingRewardNFT',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
