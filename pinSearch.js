var pinToSearch = "QmR8gUhdfpkzP2tYJwQboD7iuKJ7PSmnukeDsLsZP9e1NX";
var rpcEndpoint = "https://rpc.ether1.org";

var Web3 = require('web3');
const pinStorageABI = JSON.parse('[{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"changeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"set","type":"uint32"}],"name":"SetReplicationFactor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pin","type":"string"}],"name":"PinRemove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deleteContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pin","type":"string"},{"name":"size","type":"uint32"}],"name":"PinAdd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"PinCount","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ReplicationFactor","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Pins","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pin","type":"string"}],"name":"GetPinSize","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
const pinStorageContractAddress = '0xD3b80c611999D46895109d75322494F7A49D742F';

var web3 = new Web3(rpcEndpoint);

pinSearch(pinToSearch);

function pinSearch(pin) {
  web3.eth.net.isListening()
  .then(function () {
  var ethofsContract = new web3.eth.Contract(pinStorageABI, pinStorageContractAddress);
    ethofsContract.methods.PinCount().call().then(response => {
      if (response) {
        searchPins(pin, ethofsContract);
      } else {
        console.log('Error retrieving contract data');
      }
    }).catch(function (error) {
      console.log(error);
    });
  }).catch(function (error) {
    console.log(error);
  });
}

function searchPins(pin, ethofsContract) {
  ethofsContract.methods.GetPinSize(pin).call().then(response => {
    if(Number(response) == 0) {
      console.log("Unable to find pin")
    } else {
      console.log("Pin Found! - Hash: "  + pin + " Size: " + response);
    }
  });
}
