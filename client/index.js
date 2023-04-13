const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require('prompt-sync')();

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  // Create MerkleTree from names given in niceList
  const newMerkleTree  = new MerkleTree(niceList);
  const root = newMerkleTree.getRoot();

  const name = prompt("Enter name for checking: ");
  if(name == null) alert("You have to type a name");

  const index = niceList.findIndex(n => n === name);
  const proof = newMerkleTree.getProof(index);


  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
