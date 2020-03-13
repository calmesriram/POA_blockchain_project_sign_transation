import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
declare let Web3: any;
var contractAddress = "0xd5491e3c5f6940edec75d06d247fab0c49e4c6cb";
var ipfs_serverurl = "https://ipfs.infura.io:5001/api/v0"
var privatekey;
var contractAbi = require('../assets/contractfiles/abi.json');
var util = require('ethereumjs-util')
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b368f72affd24424b558cac66853289d'));
let myContract = new web3.eth.Contract(contractAbi, contractAddress, {
  // from: this.owner,
  gasLimit: 3800000,
});

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public companyid: any;

  constructor(public http: HttpClient, public toster: ToastrService) {
    console.log(web3.version)
    privatekey = sessionStorage.getItem('user');

    console.log(myContract)
  }

  public async accountbalance(): Promise<any> {
   return new Promise((resolve,reject)=>{
    let ethAddress = web3.eth.accounts.privateKeyToAccount(sessionStorage.getItem('user'))["address"];
    web3.eth.getBalance(ethAddress, function (err, data) {
      if (err) {
        console.log(err)
        resolve(err);
      }
      if (data) {
        // console.log(parseFloat(web3.utils.fromWei(data)).toFixed(4));
        resolve(parseFloat(web3.utils.fromWei(data)).toFixed(4));
      }
    })
   })    
  }

  sendfile(data) {
    return new Promise((reslove, reject) => {
      this.http.post(ipfs_serverurl + "/add", data).subscribe(res => {
        reslove(res);
      }, err => {
        reslove(err);
      })
    });
  }

  //   getfile(hash){
  //     return new Promise((resolve,reject)=>{
  //       this.http.get(ipfs_serverurl2+"/"+hash).subscribe(res =>{
  //         resolve(res); 
  //       },err =>{
  //         resolve(err); 
  //       })            
  //   })
  // }
  islogin() {
    if (sessionStorage.getItem('user') != "" && sessionStorage.getItem('user') != null && sessionStorage.getItem('user') != undefined) {
      return true;
    } else {
      false;
    }
  }

  txstatus(txhash): Promise<any> {

    return new Promise((resolve, reject) => {

      var clear = setInterval(() => {
        web3.eth.getTransactionReceipt(txhash, (err, res) => {          
          if(err) {
            // clearInterval(clear);
            return resolve("failed")            
          }
          if(res) {
            if (res.status !== null && res.status !== "" && res.status !== undefined) {            
              if (res.status == "0x1") {
                console.log("success")
                clearInterval(clear);
                resolve("success");

              }
              else {
                console.log("unsucess");
                clearInterval(clear);
                resolve("failed")                
              }
            }
          }
        })

      }, 2000)

    }).catch((e) => {
      console.log("test error",e)
      this.toster.error(e, "Transaction Status")
    }) as Promise<any>;

  }

  public async getaddressid(dataaddress): Promise<any> {
    return new Promise((resolve, reject) => {
      myContract.methods.addressToCompany(dataaddress).call(function (error, result) {
        if (error) {
          console.log(error)
          resolve(error);
        }
        if (result) {
          console.log(result)
          myContract.methods.companies(result).call(function (error, data) {
            if (error) {
              resolve(error);
              console.log(error);
            }
            if (data) {
              data["companyid"] = result;
              console.log(data)
              resolve(data);
              // console.log(data);
            }
          })

        }
      });
    }) as Promise<any>;
  }

  addcompany(data) {
    console.log(data);
    const tx = {
      to: contractAddress,
      gas: 3000000,
      data: myContract.methods.addCompany(data.companyname, data.publicaddress, data.dochash).encodeABI()
    }

    return new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        if (data) {
          console.log(data)
          web3.eth.sendSignedTransaction(data['rawTransaction']).on('transactionHash', txHash => {
            console.log("txHash", txHash);
            this.txstatus(txHash).then(result => {
              console.log(result)
              if (result == "success") {
                resolve(result);
                this.toster.success('success', 'Transaction Status');
              }
              if (result == "failed") {
                resolve(result);
                this.toster.error('error', 'Transaction Status');
              }
            })
          })
        }
      })
    }).catch(e => {
      console.log(e)
    })

  }

  public async updatecompany(data): Promise<any> {

    console.log(data);

    const tx = {
      to: contractAddress,
      gas: 3000000,
      data: myContract.methods.updateCompanyAddress(data.companyid, data.address, data.dochash).encodeABI()
    }

    return new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);

        }
        if (data) {
          web3.eth.sendSignedTransaction(data['rawTransaction']).on('transactionHash', txHash => {
            console.log("txHash", txHash);
            this.txstatus(txHash).then(result => {
              console.log(result)
              if (result == "success") {
                resolve(result);
                this.toster.success('success', 'Transaction Status');
              }
              if (result == "failed") {
                resolve(result);
                this.toster.error('error', 'Transaction Status');
              }
            })
          })

        }
      })
    }) as Promise<any>;

  }


  addindividual(data) {
    console.log(data);
    const tx = {
      to: contractAddress,
      gas: 3000000,
      data: myContract.methods.addIndividual(data.Individualname, data.Individualaddress, data.Individualdochash).encodeABI()
    }

    return new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        if (data) {
          console.log(data)
          web3.eth.sendSignedTransaction(data['rawTransaction']).on('transactionHash', txHash => {
            console.log("txHash", txHash);
            this.txstatus(txHash).then(result => {
              console.log(result)
              if (result == "success") {
                resolve(result);
                this.toster.success('success', 'Transaction Status');
              }
              if (result == "failed") {
                resolve(result);
                this.toster.error('error', 'Transaction Status');
              }
            })
          })
        }
      })
    }).catch(e => {
      console.log(e)
    })

  }

  public async getindividualDetails(dataaddress): Promise<any> {
    return new Promise((resolve, reject) => {
      myContract.methods.addressToIndiv(dataaddress).call(function (error, result) {
        if (error) {
          console.log(error)
          resolve(error);
        }
        if (result) {
          console.log(result)
          myContract.methods.individuals(result).call(function (error, data) {
            if (error) {
              resolve(error);
              console.log(error);
            }
            if (data) {
              data["individualid"] = result;
              // console.log(data)
              resolve(data);
              // console.log(data);
            }
          })

        }
      });
    }) as Promise<any>;
  }

  public async updateindividual(data): Promise<any> {
    console.log(data);
    const tx = {
      to: contractAddress,
      gas: 3000000,
      data: myContract.methods.updateIndividualAddress(data.Individualid, data.address, data.dochash).encodeABI()
    }

    return new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);

        }
        if (data) {
          web3.eth.sendSignedTransaction(data['rawTransaction']).on('transactionHash', txHash => {
            console.log("txHash", txHash);
            this.txstatus(txHash).then(result => {
              console.log(result)
              if (result == "success") {
                resolve(result);
                this.toster.success('success', 'Transaction Status');
              }
              if (result == "failed") {
                resolve(result);
                this.toster.error('error', 'Transaction Status');
              }
            })
          })

        }
      })
    }) as Promise<any>;

  }

  addemployee(data) {
    console.log("sriram",data);
    var signature = web3.eth.accounts.sign(data.Employeedochash, privatekey);
    console.log(" sriram signature",signature);

    const tx = {
      to: contractAddress,
      gas: 3000000,
      data: myContract.methods.addEmployee(data.Employeename, data.Employeeaddress, data.Employeedochash, data.Employeecompanyid, signature.signature).encodeABI()
    }

    return new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        if (data) {
          console.log(data)
          web3.eth.sendSignedTransaction(data['rawTransaction']).on('transactionHash', txHash => {
            console.log("txHash", txHash);
            this.txstatus(txHash).then(result => {
              console.log(result)
              if (result == "success") {
                resolve(result);
                this.toster.success('success', 'Transaction Status');
              }
              if (result == "failed") {
                resolve(result);
                this.toster.error('error', 'Transaction Status');
              }
            })
          })
        }
      })
    }).catch(e => {
      console.log(e)
    })

  }


  public async updateemployee(data): Promise<any> {
    console.log(data);
    const tx = {
      to: contractAddress,
      gas: 3800000,
      data: myContract.methods.updateEmployeeAddress(data.Individualid, data.address, data.dochash,data.companysign).encodeABI()
    }

    return new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, privatekey, (err, data) => {
        if (err) {
          console.log(err);
          resolve(err);

        }
        if (data) {
          web3.eth.sendSignedTransaction(data['rawTransaction']).on('transactionHash', txHash => {
            console.log("txHash", txHash);
            this.txstatus(txHash).then(result => {
              console.log(result)
              if (result == "success") {
                resolve(result);
                this.toster.success('success', 'Transaction Status');
              }
              if (result == "failed") {
                resolve(result);
                this.toster.error('error', 'Transaction Status');
              }
            })
          })

        }
      })
    }) as Promise<any>;

  }

}

