import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
declare let Web3: any;
var contractAddress = "0x14CEA081db81d50D252D6A4350Ab0a4bDDd1DB29";
var privatekey = "0x81ED94E347EAA804802C716AAB5D00FEB343ED4BA7D8149B6349AC0D3C41F6DC";
var contractAbi = require('../assets/contractfiles/abi.json');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b368f72affd24424b558cac66853289d'));
let myContract = new web3.eth.Contract(contractAbi, contractAddress, {
  // from: this.owner,
  gasLimit: 3000000,
});
var util = require('ethereumjs-util')
var Buffer = require('buffer/').Buffer
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public companyid:any;
  public loader: boolean = false;
  constructor(public http: HttpClient, public toster: ToastrService) {
    console.log(web3.version)

  }

  // sendfile(data){
  //   // ipfs.add(data, function (err, result) {
  //   //   if(err){
  //   //     console.log(err,"err");
  //   //   }
  //   //   if(result){
  //   //     console.log(result)
  //   //   }
  //   // })
  // }

  txstatus(txhash): Promise<any> {

    return new Promise((resolve, reject) => {

      var clear = setInterval(() => {
        web3.eth.getTransactionReceipt(txhash, (err, res) => {
          if (res["status"] != null) {
            if (res["status"] == "0x1") {
              console.log("success")
              clearInterval(clear);
              resolve("success");

            }
            else {
              console.log("unsucess");
              clearInterval(clear);
              resolve("failed")
              this.toster.error("failed", "Transaction Status")
            }
          } else {

          }
        })

      }, 1000)

    }).catch((e) => {
      console.log(e)
      this.toster.error(e, "Transaction Status")
    }) as Promise<any>;

  }

  // getpubkeyAndAddress(pvtkeyData) {
  //   return new Promise((resolve, reject) => {
  //     var buf_enc = Buffer.from(pvtkeyData, 'hex');
  //     let publickey = util.privateToPublic(buf_enc)
  //     let data = web3.eth.accounts.privateKeyToAccount("0x" + pvtkeyData)
  //     console.log(data);
  //     resolve({ "address": data.address, "publicKey": '0x04' + publickey.toString('hex'), "privateKey": data.privateKey })
  //   })
  // }
  public async getaddressid(dataaddress):Promise<any>{
    new Promise((resolve, reject) => {
      myContract.methods.addressToCompany(dataaddress).call(async function (error, result) {
        if(error){          
         console.log(error)  
        }
        if(result){
          console.log(result)
          var a = result;
          this.companyid = a;
        }
      });
    })as Promise<any>; 
  }

  addcompany(data) {
    this.loader = true;
    console.log(data);
    const tx = {
      to: contractAddress,
      gas: 3000000,
      data: myContract.methods.addCompany(data.companyname, data.publicaddress, data.dochash).encodeABI()
    }

    new Promise((resolve, reject) => {

      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);
          this.loader = false;
        }
        if (data) {
          resolve(data);
        }
      })
    }).then((res) => {
      web3.eth.sendSignedTransaction(res['rawTransaction']).on('transactionHash', txHash => {
        console.log("txHash", txHash);
        this.txstatus(txHash).then(data => {
          console.log(data)
          if (data == "success") {
            this.loader = false;
            this.toster.success('success', 'Transaction Status');
          }
          if (data == "failed") {
            this.loader = false;
            this.toster.error('error', 'Transaction Status');
          }
        })
      })
    }).catch(e => {
      this.loader = false;
    })

  }


}
