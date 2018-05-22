<template src="./template.html"></template>
 
 <script>
import NewPost from "@/components/NewPost/NewPost.vue";
import ipfsApi from "ipfs-api";

export default {
  name: "mainwall",
  components: {
    NewPost
  },
  data() {
    return {
      user: {
        totalPosts: {
          img: "",
          post: ""
        },
        reputation: 0,
        coins: 0,
        walletAddr: ""
      },
      name: "",
      email: "",
      posts: null,
      images: [],
      imgsrc: [],
      imageTitle: "Caption",
      index: 0,
      url: "",
      newUrl: "",
      indexPost: "",
      imageProfile:
        "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
      modalName: localStorage.username,
      modalTitle: "",
      modalText: ""
    };
  },
  async created() {
    let info = await this.$getUserDetails(localStorage.username);
    this.name = info[0];
    this.email = info[1];
    this.imageProfile = info[2];
    this.index = await this.$getPostNumber();
    let repu = await this.$getRepu(localStorage.username);
    this.user.reputation = repu;
    this.user.walletAddr = await this.$getWallet(localStorage.username);
    this.user.coins = (await this.$getBalance(this.user.walletAddr)) || 0;
    let postscount = await this.$getTotalPosts(localStorage.username);
    this.user.totalPosts.img = postscount[1];
    this.user.totalPosts.post = postscount[0];
    for (var i = this.index - 1; i >= 0; i--) {
      let ind = await this.$getImagePosts(i);
      let img = document.createElement("IMG");
      let title = document.createElement("H3");
      let P = document.createElement("A");
      var t = document.createTextNode("Image By: " + ind[1]);
      var tt = document.createTextNode(ind[2]);
      title.appendChild(tt);
      P.appendChild(t);
      P.href = "/?#/user/" + ind[1];
      img.src = ind[0];
      img.className = "imgClass";
      document.getElementById("imageParent").appendChild(title);
      document.getElementById("imageParent").appendChild(img);
      document.getElementById("imageParent").appendChild(P);
    }
    this.indexPost = await this.$getPostNumber2();
    var newposts = [];
    for (var i = this.indexPost - 1; i >= 0; i--) {
      let ind = await this.$getPosts(i);
      let d = new Date(ind[2] * 1);
      let info = await this.$getUserDetails(ind[3]);
      let html;
      if (localStorage.username === ind[3]) {
        html =
          '<div class="card-post" id="' +
          i +
          '">' +
          '<div class="row">' +
          '<div class="col-xs-3 col-sm-2">' +
          '<a href="/?#/user/' +
          ind[3] +
          '" title="Profile">' +
          '<img src="' +
          info[2] +
          '" alt="' +
          info[0] +
          '" class="img-circle img-user">' +
          "</a>" +
          " </div>" +
          '<div class="col-xs-9 col-sm-10 info-user namee">' +
          "<h3>" +
          ' <a href="/profile" title="Profile">' +
          info[0] +
          "</a>" +
          "</h3>" +
          " <p>" +
          " <i class='date'>" +
          d +
          "</i>" +
          "<i class='clickme'> PostNumber: " +
          (i + 1) +
          "</i>" +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col-sm-8 col-sm-offset-2 data-post">' +
          "<h4><strong>" +
          ind[0] +
          "</strong></h4><p>" +
          ind[1] +
          "</p>" +
          '<div class="reaction">' +
          "<p><span class='likeI'>&#x2764; </span>" +
          '<span class="likedNo">' +
          ind[4] +
          "</span>" +
          ' Likes  <span class="dislikeI"> &#128544; </span>' +
          '<span class="dislikedNo">' +
          ind[5] +
          "</span>" +
          " Dislikes</p>" +
          "</div>" +
          // ' <div class="comments">' +
          // ' <div class="more-comments">View more comments</div>' +
          // "<ul>" +
          // "<li>" +
          // "<b>User1</b> Hello My first Comment!</li>" +
          // "</ul>" +
          // "<form>" +
          // '<input type="text" class="form-control" placeholder="Add a comment">' +
          // '<button type="submit" v-on:click="addComment">Add Comment</button>' +
          // "</form>" +
          // "</div>" +
          // "</div>" +
          "</div>" +
          "</div>";
      } else {
        html =
          '<div class="card-post" id="' +
          i +
          '">' +
          '<div class="row">' +
          '<div class="col-xs-3 col-sm-2">' +
          '<a href="/?#/user/' +
          ind[3] +
          '" title="Profile">' +
          '<img src="' +
          info[2] +
          '" alt="' +
          info[0] +
          '" class="img-circle img-user">' +
          "</a>" +
          " </div>" +
          '<div class="col-xs-9 col-sm-10 info-user namee">' +
          "<h3>" +
          ' <a href="/profile" title="Profile">' +
          info[0] +
          "</a>" +
          "</h3>" +
          " <p>" +
          " <i class='date'>" +
          d +
          "</i>" +
          "<i class='clickme'> PostNumber: " +
          (i + 1) +
          "</i>" +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col-sm-8 col-sm-offset-2 data-post">' +
          "<h4><strong>" +
          ind[0] +
          "</strong></h4><h4>" +
          ind[1] +
          "</h4>" +
          '<div class="reaction">' +
          '<button class="like likeI">&#x2764;</button>' +
          '&nbsp;&nbsp;<span class="likedNo">' +
          ind[4] +
          "</span>" +
          ' likes&nbsp;&nbsp;<button class="dislike"> <span class="dislikeI">&#128544;</span></button>' +
          '&nbsp;&nbsp;<span class="dislikedNo">' +
          ind[5] +
          "</span>" +
          " dislikes " +
          "</div>" +
          // ' <div class="comments">' +
          // ' <div class="more-comments">View more comments</div>' +
          // "<ul>" +
          // "<li>" +
          // "<b>User1</b> Hello My first Comment!</li>" +
          // "</ul>" +
          // "<form>" +
          // '<input type="text" class="form-control" placeholder="Add a comment">' +
          // '<button type="submit" v-on:click="addComment">Add Comment</button>' +
          // "</form>" +
          // "</div>" +
          // "</div>" +
          "</div>" +
          "</div>";
      }
      $("#posts-container").append(html);
      newposts.push(ind);
    }
    this.posts = newposts;
    $(".like").on("click", el => {
      let id = $(el.target)
        .parent()
        .parent()
        .parent()
        .parent()
        .attr("id");

      let val = $(el.target)
        .siblings(".likedNo")
        .text();
      val = parseInt(val) + 1;
      $(el.target)
        .siblings(".likedNo")
        .text(val);
      this.$like(localStorage.username, id);
    });
    $(".dislike").on("click", el => {
      let id;
      if (!!window.chrome && !!window.chrome.webstore) {
        id = $(el.target)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .attr("id");
      } else {
        id = $(el.target)
          .parent()
          .parent()
          .parent()
          .parent()
          .attr("id");
      }
      let val = $(el.target)
        .siblings(".dislikedNo")
        .text();
      val = parseInt(val) + 1;
      $(el.target)
        .siblings(".dislikedNo")
        .text(val);

      this.$dislike(localStorage.username, id);
    });
    let list = [];
    list = await this.$getPopularUsers();
    for (var y = 0; y < list.length; y++) {
      let det = await this.$getUserDetails(list[y].user);
      let html =
        '<div><a href="/?#/user/' +
        list[y].user +
        '"><img src="' +
        det[2] +
        '" class="pops img-circle">' +
        "<h3>" +
        det[0] +
        "</h3></a></div>";
      $("#popUser").append(html);
    }
    $("#profilePic").attr("href", "/?#/user/" + localStorage.username);
  },
  watch: {
    posts: {
      handler: function(newVal) {
        // console.log(newVal);
      }
    }
  },
  computed: {},
  methods: {
    async distributeTokens() {
      alert("clicked");
      let number = 500;
      let repu = await this.$gettotalrepu();
      await this.$generateToken(number);
      let available = number / 2;
      let totalUsers = await this.$gettotalusers();
      for (let i = 0; i < totalUsers; i++) {
        let name = await this.$getusername(i);
        let temprepu = await this.$getRepu(name);
        let percentage = temprepu / repu;
        let tokensheget = parseInt(percentage * available);
        console.log("tokensheget = " + tokensheget);

        if (tokensheget > 0) {
          let address = await this.$getWallet(name);
          console.log(await this.$transfer(address, tokensheget));
        }
      }
      this.$notify({
        group: "foo",
        title: "Wallet Status",
        text: "Tokens Added and Distributed Successfully",
        type: "success"
      });
    },
    async setProfile() {
      this.validationErrors = [];
      let url = document.getElementById("url").innerHTML;
      if (url === "") {
        this.validationErrors.push("Please Upload Some Image");
      }
      if (!this.validationErrors.length) {
        await this.$setProfilePicture(localStorage.username, url);
        this.$notify({
          group: "foo",
          title: "Image status",
          text: "Image posted successfully",
          type: "success"
        });
      }
      setTimeout("location.reload(true);", 1000);
    },
    upload() {
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = ipfsApi("localhost", 5001); // Connect to IPFS
        const buf = new Buffer(reader.result); // Convert data into buffer
        ipfs.files.add(buf, (err, result) => {
          // Upload buffer to IPFS
          if (err) {
            console.error(err);
            return;
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`;
          this.newUrl = `https://ipfs.io/ipfs/${result[0].hash}`;
          console.log(`Url --> `, this.newUrl);
          document.getElementById("url").innerHTML = url;
          document.getElementById("url").href = url;
          document.getElementById("output").src = url;
        });
      };
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    },
    async Post() {
      this.validationErrors = [];
      let url = document.getElementById("url").innerHTML;
      if (url === "") {
        this.validationErrors.push("Please Upload Some Image");
      }
      if (!this.validationErrors.length) {
        await this.$addImagePost(localStorage.username, url, this.imageTitle);
        this.$notify({
          group: "foo",
          title: "Image status",
          text: "Image posted successfully",
          type: "success"
        });
      }
      setTimeout("location.reload(true);", 1000);
    },
    async PostText() {
      this.validationErrors = [];
      if (this.modalName === "") {
        this.validationErrors.push("Name is required!");
      }
      if (this.modalTitle === "") {
        this.validationErrors.push("Title is required!");
      }
      if (this.modalText === "") {
        this.validationErrors.push("Text is required!");
      }
      let timestamp = Date.now().toString();
      if (!this.validationErrors.length) {
        this.$addPost(
          localStorage.username,
          this.modalTitle,
          this.modalText,
          timestamp
        );
        this.$notify({
          group: "foo",
          title: "Post Added",
          text: "Post Added successfully",
          type: "success"
        });
        setTimeout("location.reload(true);", 1000);
      }
    }
  }
};
</script>