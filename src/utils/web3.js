import Web3 from "web3";
import Vue from "vue";

const ethNodeUri = "http://localhost:8545";

const web3 = new Web3(new Web3.providers.HttpProvider(ethNodeUri));

const JPC = new web3.eth.Contract(
  [
    {
      constant: false,
      inputs: [
        {
          name: "tokenAmount",
          type: "uint256"
        }
      ],
      name: "generateToken",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address"
        },
        {
          name: "_value",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          name: "value",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ],
  "0x3e7eacf16b8065448f2deb005dbf0d3c319965b5"
);

const gladus = new web3.eth.Contract(
  [
    {
      constant: false,
      inputs: [
        {
          name: "accName",
          type: "string"
        },
        {
          name: "walletAddr",
          type: "address"
        },
        {
          name: "privateKey",
          type: "string"
        }
      ],
      name: "addAccountDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "url",
          type: "string"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "title",
          type: "string"
        }
      ],
      name: "addImgPost",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "title",
          type: "string"
        },
        {
          name: "text",
          type: "string"
        },
        {
          name: "timestamp",
          type: "string"
        },
        {
          name: "name",
          type: "string"
        }
      ],
      name: "addPost",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "username",
          type: "string"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "password",
          type: "string"
        },
        {
          name: "email",
          type: "string"
        },
        {
          name: "timestamp",
          type: "string"
        }
      ],
      name: "addUser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "username",
          type: "string"
        },
        {
          indexed: false,
          name: "email",
          type: "string"
        }
      ],
      name: "addUsername",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "disliker",
          type: "string"
        },
        {
          name: "index",
          type: "uint256"
        }
      ],
      name: "dislikes",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "disliker",
          type: "string"
        },
        {
          name: "index",
          type: "uint256"
        }
      ],
      name: "imgdislikes",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "liker",
          type: "string"
        },
        {
          name: "index",
          type: "uint256"
        }
      ],
      name: "imglike",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "liker",
          type: "string"
        },
        {
          name: "index",
          type: "uint256"
        }
      ],
      name: "like",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "title",
          type: "string"
        },
        {
          indexed: false,
          name: "text",
          type: "string"
        },
        {
          indexed: false,
          name: "timestamp",
          type: "string"
        },
        {
          indexed: false,
          name: "name",
          type: "string"
        }
      ],
      name: "postSubmitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "IpfsHash",
          type: "string"
        }
      ],
      name: "profilePictureUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "imgHash",
          type: "string"
        },
        {
          indexed: false,
          name: "imgName",
          type: "string"
        }
      ],
      name: "imageAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "index",
          type: "uint256"
        }
      ],
      name: "postLiked",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "profileName",
          type: "string"
        },
        {
          name: "profilepicturehash",
          type: "string"
        }
      ],
      name: "setProfilePicture",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      constant: false,
      inputs: [
        {
          name: "for_user",
          type: "string"
        },
        {
          name: "newPassword",
          type: "string"
        }
      ],
      name: "updatePassword",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "imgNumber",
          type: "uint256"
        }
      ],
      name: "getImages",
      outputs: [
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "ind",
          type: "uint256"
        }
      ],
      name: "getLikes",
      outputs: [
        {
          name: "",
          type: "uint256"
        },
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "by_username",
          type: "string"
        }
      ],
      name: "getPassword",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "getPostNumber",
          type: "uint256"
        }
      ],
      name: "getPosts",
      outputs: [
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "uint256"
        },
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "eth_priv_key",
          type: "string"
        }
      ],
      name: "getPrivateKey",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "whose",
          type: "string"
        }
      ],
      name: "getPrPic",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "user",
          type: "string"
        }
      ],
      name: "getRepu",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "userpostname",
          type: "string"
        }
      ],
      name: "getTotalPosts",
      outputs: [
        {
          name: "",
          type: "uint256"
        },
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "detail_username",
          type: "string"
        }
      ],
      name: "getUserDetails",
      outputs: [
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        },
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "eth_username",
          type: "string"
        }
      ],
      name: "getWalletaddr",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "ind",
          type: "uint256"
        }
      ],
      name: "imggetLikes",
      outputs: [
        {
          name: "",
          type: "uint256"
        },
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "imgPostNumber",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "postNumber",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalReputation",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalUsers",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      name: "usernameArray",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ],
  "0x4a550e4a78e013652658807a89ac914bd7d4fb50"
);
var web3Account = "0xbfe37132b046993e9d514cae8101824406137d42";
//using a web3 default account
web3.eth.defaultAccount = web3Account;
// console.log(web3.eth.defaultAccount);
export function getPassword(username) {
  return gladus.methods.getPassword(username).call();
}

export default {
  install(Vue) {
    Vue.prototype.$isListening = async () => {
      let res;
      res = await web3.eth.net.isListening();
      if (res === true) return true;
      return false;
    };

    Vue.prototype.$getusername = async i => {
      return await gladus.methods.usernameArray(i).call();
    };

    Vue.prototype.$getPopularUsers = async () => {
      let index = await gladus.methods.totalUsers().call();
      var list = [];
      for (let i = 0; i < index; i++) {
        let name = await gladus.methods.usernameArray(i).call();
        list.push({
          user: name,
          reputation: await gladus.methods.getRepu(name).call()
        });
      }
      list.sort(function(a, b) {
        var keyA = a.reputation,
          keyB = b.reputation;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      if (list.length > 5) {
        return list;
      } else {
        return list.splice(0, 5);
      }
    };

    Vue.prototype.$createAccounts = async () => {
      return await web3.eth.accounts.create();
    };

    Vue.prototype.$likePost = async (liker, index) => {
      return await gladus.methods.like(liker, index).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$dislikePost = async (liker, index) => {
      return await gladus.methods.dislikes(liker, index).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$getBalance = async address => {
      return await JPC.methods.balanceOf(address).call();
    };

    Vue.prototype.$transfer = async (address, value) => {
      return await JPC.methods.transfer(address, value).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$generateToken = async value => {
      return await JPC.methods.generateToken(value).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$signUpUser = async function(reqObj) {
      let timestamp = Date.now().toString();
      return await gladus.methods
        .addUser(reqObj.un, reqObj.name, reqObj.pass, reqObj.email, timestamp)
        .send({
          from: web3Account,
          gas: 3000000
        });
    };

    Vue.prototype.$addAccount = async function(reqObj) {
      return await gladus.methods
        .addAccountDetails(reqObj.un, reqObj.address, reqObj.privateKey)
        .send({
          from: web3Account,
          gas: 3000000
        });
    };

    Vue.prototype.$setProfilePicture = async function(username, IpfsHash) {
      return await gladus.methods.setProfilePicture(username, IpfsHash).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$addPost = async function(name, title, text, timestamp) {
      return await gladus.methods.addPost(title, text, timestamp, name).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$addImagePost = async function(name, IpfsHash, khazana) {
      return await gladus.methods.addImgPost(IpfsHash, name, khazana).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$getPassword = async function(username) {
      return await gladus.methods.getPassword(username).call();
    };

    Vue.prototype.$getPosts = async function(index) {
      return await gladus.methods.getPosts(index).call();
    };

    Vue.prototype.$like = async function(liker, index) {
      return await gladus.methods.like(liker, index).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$dislike = async function(disliker, index) {
      return await gladus.methods.dislikes(disliker, index).send({
        from: web3Account,
        gas: 3000000
      });
    };

    Vue.prototype.$getWallet = async function(name) {
      return await gladus.methods.getWalletaddr(name).call();
    };

    Vue.prototype.$getPrivKey = async function(name) {
      return await gladus.methods.getPrivateKey(name).call();
    };

    Vue.prototype.$getlikes = async function(index) {
      return await gladus.methods.getLikes(index).call();
    };

    Vue.prototype.$getTotalPosts = async function(name) {
      return await gladus.methods.getTotalPosts(name).call();
    };

    Vue.prototype.$getImagePosts = async function(index) {
      return await gladus.methods.getImages(index).call();
    };

    Vue.prototype.$getRepu = async function(name) {
      return await gladus.methods.getRepu(name).call();
    };

    Vue.prototype.$getUserDetails = async function(username) {
      return await gladus.methods.getUserDetails(username).call();
    };

    Vue.prototype.$getPostNumber = async function() {
      return await gladus.methods.imgPostNumber().call();
    };

    Vue.prototype.$getPostNumber2 = async function() {
      return await gladus.methods.postNumber().call();
    };

    Vue.prototype.$gettotalusers = async function() {
      return await gladus.methods.totalUsers().call();
    };

    Vue.prototype.$gettotalSupply = async function() {
      return await JPC.methods.totalSupply().call();
    };

    Vue.prototype.$gettotalrepu = async function() {
      return await gladus.methods.totalReputation().call();
    };
  }
};
