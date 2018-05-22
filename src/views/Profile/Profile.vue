<template src="./template.html">
    
</template>

<script>
export default {
  name: "Profile",
  props: ["id"],
  data() {
    return {
      name: "",
      email: "",
      imageProfile: "",
      repu: "",
      img: "",
      post: "",
      level: 0,
      posts: [],
      owner: false,
      wallet: 0,
      privKey: 0
    };
  },
  async created() {
    if (this.id === localStorage.username) {
      this.owner = true;
    }
    let info = await this.$getUserDetails(this.id);
    this.name = info[0];
    this.email = info[1];
    this.imageProfile = info[2];
    this.repu = await this.$getRepu(this.id);
    let postscount = await this.$getTotalPosts(this.id);
    this.img = postscount[1];
    this.post = postscount[0];
    this.wallet = await this.$getWallet(localStorage.username);
    this.privKey = await this.$getPrivKey(localStorage.username);
    this.coins = (await this.$getBalance(this.wallet)) || 0;

    this.index = await this.$getPostNumber();

    for (var i = this.index - 1; i >= 0; i--) {
      let ind = await this.$getImagePosts(i);
      if (ind[1] === this.id) {
        let img = document.createElement("IMG");
        img.src = ind[0];
        img.className = "imgClass";
        document.getElementById("imageParent").appendChild(img);
      }
    }
    this.indexPost = await this.$getPostNumber2();
    var newposts = [];
    for (var i = this.indexPost - 1; i >= 0; i--) {
      let ind = await this.$getPosts(i);
      if (this.id === ind[3]) {
        let d = new Date(ind[2] * 1);
        let info = await this.$getUserDetails(ind[3]);
        let html;
        console.log(ind[3]);
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
  }
};
</script>
