const { ethers,utils } = require('ethers');
const dotenv = require('dotenv');
dotenv.config();
const abi = [
  {
    "inputs": [],
    "name": "InvalidSignatureSource",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TxAlreadyExecuted",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "getHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "sig",
        "type": "bytes"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
async function main(){
  const senderprivateKey = '';
  const privateKey = '';
  const rpcUrl = 'https://rpc.j2o.io';
  
  const from = "0x4Fbd49c841c2f891b8e04B887B9C5035BE7c7209";
  const to = "0x4Bd75Ea7a6ef12046550F971B685b535df64419A";
  const transfer = '0xA61926E1d5Ba33C7eb21eb736706dFF1983213a4';
  const token = '0x9EA818bEDe07609912bb6FF685FDb3DDE1216461';


  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const sender = new ethers.Wallet(senderprivateKey, provider);
  const tokenSender = new ethers.Contract(transfer, abi, provider);

  let nonce =  await provider.getTransactionCount(wallet.address);
  
  const amount = utils.parseUnits("10", 'ether');
  const messageHash = await tokenSender.getHash(
    from,
    amount,
    to,
    token,
    nonce
  );
  const signature = await sender.signMessage(utils.arrayify(messageHash));
  result = await tokenSender.connect(wallet).transfer(
    from,
    amount,
    to,
    token,
    nonce,
    signature,
    {gasPrice: ethers.utils.parseUnits('3', 'gwei'), gasLimit: 1000000}
  );
  console.log(result)

} 
main();


