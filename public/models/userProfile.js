class userProfile {
  constructor(userID,rsvp,connections,userName) {
    this.userName=userName;
     this.userID =userID;
    this.rsvp =rsvp;
    this.connections = connections;
  }

getUserID() {
    return this.userID;
  }

  setUserID(userID) {
    this.userID = userID;
  }
  getUserName() {
    return this.userName;
  }

  setUserName(userName) {
    this.userName = userName;
  }

  getRsvp() {
    return this.rsvp;
  }

  setRsvp(rsvp) {
    this.rsvp = rsvp;
  }
  getConnections() {
    return this.connections;
  }

  setConnections(connections) {
    this.connections = connections;
  }
  getUserProfileDetails() {
    return {
      userID:this.userID,rsvp:this.rsvp,connections:this.connections,userName:this.userName
    };
  };

  }
  module.exports =userProfile;