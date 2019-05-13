import React, { Component } from "react";
import { tokenUrl, instanceLocator, key } from "./config";
import { ChatManager, TokenProvider } from "@pusher/chatkit";
import md5 from "md5";
import Login from "./Login";
import MessageList from "./MessageList";
import RoomList from "./RoomList";
import SendMessageForm from "./SendMessageForm";
import NewRoomForm from "./NewRoomForm";
import Sidebar from "./Sidebar";
import getData from "./getData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      roomId: "",
      joinableRooms: [],
      joinedRooms: [],
      messages: [],
      onlineUsers: [],
      offlineUsers: [],
      wrongPass: false
    };
    this.db = [
      "e89eacc690fe360f76dbdc3dc6893b3f",
      "9446a28dbec56d2d77f94f7c9f7e6c5a",
      "42861968773f1949a619727daba9e7d8"
    ];
    this.handleAddUser = this.handleAddUser.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleNewRoom = this.handleNewRoom.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.initialize = this.initialize.bind(this);
    this.setUsersState = this.setUsersState.bind(this);
  }

  componentDidMount() {
    //if the user is already logged, start ap
    if (this.state.userId) this.initialize();
  }

  initialize(userId) {
    if (this.state.userId) userId = this.state.userId;
    const chatManager = new ChatManager({
      instanceLocator,
      key,
      userId,
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });
    
    chatManager
      .connect()
      .then(currentUser => {
        console.log("made it this far");
        
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log("err on connecting: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
        // console.log("users: ",this.state.joinedRooms[0].userIds)
      })
      .catch(err => console.log("error in getJoinableRooms", err));
  }
  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: this.state.messages.concat(message)
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.setUsersState(room.users);
        this.getRooms();
      })
      .catch(err => console.log("error in subscribeToRoom: ", err));
  }
  handleSendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }
  handleNewRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => {
        this.subscribeToRoom(room.id);
      })
      .catch(err => console.log("error creating room: ", err));
  }
  setUsersState(users) {
    let onlineUsers = [];
    let offlineUsers = [];
    // let store=this.currentUser.presenceStore.store
    // for(let user in store){
    //   let state=store[user].state
    //   if(state=="online")
    //     online.push(user)
    //   else
    //     offline.push(user)
    // }

    users.forEach(user => {
      if (user.presence.state == "online") onlineUsers.push(user);
      else offlineUsers.push(user);
    });
    this.setState({
      onlineUsers,
      offlineUsers
    });
  }

  handleAddUser(userId) {
    this.setState({
      userId
    });
  }
  handleLogin(userId, password) {
    if (this.db.includes(md5(userId + ":" + password))) {
      this.handleAddUser(userId);
      this.initialize(userId);
    } else this.setState({ wrongPass: true });
  }

  render() {
    if (!this.state.userId) {
      return (
        <Login
          username={this.handleAddUser}
          creds={this.handleLogin}
          wrongPass={this.state.wrongPass}
          initialize={this.initialize}
        />
      );
    } else {
      return (
        <div className="app">
          <RoomList
            joinedRooms={this.state.joinedRooms}
            joinableRooms={this.state.joinableRooms}
            subToRoom={this.subscribeToRoom}
            activeRoom={this.state.roomId}
          />
          <MessageList
            messages={this.state.messages}
            roomId={this.state.roomId}
            userId={this.state.userId}
          />
          <SendMessageForm
            disabled={!this.state.roomId}
            sendMessage={this.handleSendMessage}
          />
          <NewRoomForm onSubmit={this.handleNewRoom} />
          <Sidebar
            inRoom={this.state.roomId}
            onlineUsers={this.state.onlineUsers}
            offlineUsers={this.state.offlineUsers}
          />
        </div>
      );
    }
  }
}

export default App;
