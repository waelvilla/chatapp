import React, { Component } from 'react'
import {tokenUrl, instanceLocator} from './config'
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import md5 from 'md5'
import Login from './Login'
import MessageList from './MessageList'
import RoomList from './RoomList'
import SendMessageForm from './SendMessageForm'
import NewRoomForm from './NewRoomForm'
import Sidebar from './Sidebar'

class App extends Component {
  constructor(){
    super()
    this.state={
      userId: '',
      roomId:'',
      joinableRooms: [],
      joinedRooms:[],
      messages: [],
      wrongPass:false
    }
    this.db=['e89eacc690fe360f76dbdc3dc6893b3f','9446a28dbec56d2d77f94f7c9f7e6c5a']
    this.handleAddUser=this.handleAddUser.bind(this)
    this.getRooms=this.getRooms.bind(this)
    this.setOnlineUser=this.setOnlineUser.bind(this)
    this.subscribeToRoom=this.subscribeToRoom.bind(this)
    this.handleSendMessage=this.handleSendMessage.bind(this)
    this.handleNewRoom=this.handleNewRoom.bind(this)
    this.handleLogin=this.handleLogin.bind(this)
  }

  initialize(){
    const chatManager=new ChatManager({
      instanceLocator,
      userId: this.state.userId,
      tokenProvider: new TokenProvider({
        url:tokenUrl
      })
    })
    chatManager.connect()
    .then(currentUser =>{
      this.currentUser=currentUser
      this.getRooms()
      this.setOnlineUser()
    })
    .catch(err => console.log('err on connecting: ', err)
    )
  }
  componentWillReceiveProps(){
    console.log("---componentWillReceiveProps---")
    
  }
  getRooms(){    
    this.currentUser.getJoinableRooms()
    .then(joinableRooms =>{
      this.setState({
        joinableRooms,
        joinedRooms:this.currentUser.rooms,

      })
    })
    .catch(err => console.log('error in getJoinableRooms', err)
    )
  }
  subscribeToRoom(roomId){
    this.setState({messages:[]})
    this.currentUser.subscribeToRoom({
      roomId,
      hooks:{
        onNewMessage: message => {
          this.setState({
            messages: this.state.messages.concat(message)
          })
        }
      }
    })
    .then(room =>{
      this.setState({
        roomId: room.id,

      })
      this.getRooms()
    })
    .catch(err => console.log("error in subscribeToRoom: " , err)
    )

  }
  handleSendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }
  handleNewRoom(name){
    this.currentUser.createRoom({
      name
    })
    .then(room =>{
    this.subscribeToRoom(room.id)
    })
    .catch(err => console.log("error creating room: ",err)
    )
    
  }
  setOnlineUser(){
    
    console.log(this.currentUser);
    
    if(this.currentUser.presence.state==='online')
      console.log(this.currentUser.name,'is online');
    
  }
  handleAddUser(userId){
    this.setState({
      userId
    })
  }
  handleLogin(userId,password){
    
    if(this.db.includes(md5(userId+':'+password)))
      this.handleAddUser(userId)
    else
      this.setState({wrongPass:true})
  }

  render() {
    
    if(!this.state.userId){
      return(
        <Login username={this.handleAddUser} creds={this.handleLogin} wrongPass={this.state.wrongPass}/>
      )
    }
    else{
      this.initialize()
      return (
        <div className="app">
          <RoomList joinedRooms={this.state.joinedRooms} 
            joinableRooms={this.state.joinableRooms} 
            subToRoom={this.subscribeToRoom} 
            activeRoom={this.state.roomId} />
          <MessageList messages={this.state.messages} roomId={this.state.roomId}/>
          <SendMessageForm disabled={!this.state.roomId} sendMessage={this.handleSendMessage}/>
          <NewRoomForm onSubmit={this.handleNewRoom} />
          <Sidebar inRoom={this.state.roomId}/>
        </div>
      )
    }

  }
}

export default App
