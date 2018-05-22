pragma solidity ^0.4.0;

contract gladus {
    uint public postNumber = 0;
    uint public imgPostNumber = 0;
    uint public totalUsers = 0;
    int public totalReputation = 0;
    
    address private owner;
    function gladus() public{
        owner = msg.sender;
    }
    modifier isOwner() {
       require(msg.sender == owner);
        _;
    }
    struct user {
        //data stored as encrypted data -- >
        string name;
        string password;
        string email;
        address account;
        string privateKey;
        // -- >
        // pictureHash will store ipfs hash for current profile picture
        string pictureHash;
        // timestamp will contain the time when the user registers
        string timestamp;
        int reputation;
        uint totalPosts;
        uint totalImgPosts;
    }
    
    struct post {
        string title;
        string text;
        string timestamp;
        string name;
        uint likes;
        uint dislikes;
    }
    mapping(uint => post) posts;
    
    struct imgpost {
        //contains ipfs hash for ipfs file containing posts in json
        string imghash;
        string name;
        string title;
        uint likes;
        uint dislikes;
    }
    
    mapping(uint => imgpost) imgPosts;
    
    // username array /*Imp username should be unique */
    string[] public usernameArray;
   
    //mapping username to users UNIQUE
    mapping(string => user) users;
    
    
    event addUsername(
        string username,
        string email
        );
        
    event postSubmitted(
        string title,
        string text,
        string timestamp,
        string name
        );
        
    event profilePictureUpdated(
        string IpfsHash
        );
        
    event imageAdded(
        string imgHash,
        string imgName
        );
    
    event postLiked(
        uint index
        );
    
    function like(string liker, uint index) public {
            posts[index].likes += 1; 
            string na = posts[index].name;
            users[na].reputation += (1 + (users[liker].reputation/100));
            totalReputation += (1 + (users[liker].reputation/100));
            emit postLiked(index);
    }
    
    function dislikes(string disliker, uint index) public {
         posts[index].dislikes += 1; 
         string na = posts[index].name;
         users[na].reputation -= (1 + (users[disliker].reputation/200));
         totalReputation -= (1 + (users[disliker].reputation/100));
         emit postLiked(index);
    }
    
    function getLikes(uint ind) public view returns(uint,uint){
        return (posts[ind].likes, posts[ind].dislikes);
    }
    
    
    function imglike(string liker, uint index) public {
            imgPosts[index].likes += 1; 
            users[imgPosts[index].name].reputation += (1 + (users[liker].reputation/100));
            totalReputation += (1 + (users[liker].reputation/100));
            emit postLiked(index);
    }
    
    function imgdislikes(string disliker, uint index) public {
         imgPosts[index].dislikes += 1; 
         users[posts[index].name].reputation -= (1 + (users[disliker].reputation/200));
         totalReputation -= (1 + (users[disliker].reputation/100));
         emit postLiked(index);
    }
    
    function imggetLikes(uint ind) public view returns(uint,uint){
        return (imgPosts[ind].likes, imgPosts[ind].dislikes);
    }
    
    
    function getPrPic(string whose) public view returns(string){
        return users[whose].pictureHash;
    }
    
    function getRepu(string user) public view returns(int){
        return users[user].reputation;
    }
    
    function addImgPost(string url,string name,string title) public {
            imgPosts[imgPostNumber].imghash = url;
            imgPosts[imgPostNumber].name = name;
            imgPosts[imgPostNumber].title = title;
            imgPostNumber = imgPostNumber + 1;
            users[name].totalImgPosts += 1;
            emit imageAdded(url, name);
    }
    
    function addUser(string username, string name, string password, string email, string timestamp) public {
        require(bytes(username).length != 0);
        require(bytes(password).length != 0);
        require(bytes(name).length != 0);
        require(bytes(timestamp).length != 0);
        require(bytes(email).length != 0);
        usernameArray.push(username);
        users[username].name = name;
        users[username].email = email;
        users[username].password = password;
        users[username].timestamp = timestamp;
        users[username].totalPosts = 0;
        users[username].reputation = 0;
        users[username].totalImgPosts = 0;
        emit addUsername(username, email);
        totalUsers += 1;
    } 
    
    function getTotalPosts(string userpostname) public view returns(uint, uint) {
        return (users[userpostname].totalPosts, users[userpostname].totalImgPosts);
    }
    
    function addAccountDetails(string accName, address walletAddr, string privateKey) public {
        users[accName].account = walletAddr;
        users[accName].privateKey = privateKey;
    }
    
    function setProfilePicture(string profileName,string profilepicturehash) public {
        require(bytes(profilepicturehash).length != 0);
        users[profileName].pictureHash = profilepicturehash;
        emit profilePictureUpdated(profilepicturehash);
    }
    
    function addPost(string title, string text, string timestamp, string name) public {
        posts[postNumber].title= title;
        posts[postNumber].text= text;
        posts[postNumber].timestamp= timestamp;
        posts[postNumber].name = name;
        posts[postNumber].likes = 0;
        posts[postNumber].dislikes = 0;
        postNumber = postNumber + 1;
        users[name].totalPosts = users[name].totalPosts + 1;
        emit postSubmitted(title,text,timestamp,name);
    }
    
    function updatePassword(string for_user, string newPassword) public isOwner {
        users[for_user].password = newPassword;
    }

    function getPassword(string by_username) public view returns(string) {
        return users[by_username].password;
    }
    
    function getUserDetails(string detail_username) public view returns(string,string,string) {
        return (users[detail_username].name,users[detail_username].email,users[detail_username].pictureHash);
    }
    
    function getWalletaddr(string eth_username) public view returns(address) {
        return (users[eth_username].account);
    }
    
    function getPrivateKey(string eth_priv_key) public view returns(string) {
        return users[eth_priv_key].privateKey;
    }
    
    function getPosts(uint getPostNumber) public view returns( string ,string, string, string, uint, uint) {
        return (posts[getPostNumber].title, posts[getPostNumber].text,  posts[getPostNumber].timestamp, posts[getPostNumber].name, posts[getPostNumber].likes, posts[getPostNumber].dislikes);
    }
    
    function getImages(uint imgNumber) public view returns( string , string, string) {
        return (imgPosts[imgNumber].imghash, imgPosts[imgNumber].name, imgPosts[imgNumber].title);
    }
}
