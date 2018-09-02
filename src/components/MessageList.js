import React from 'react'
import Message from './Message'

class MessageList extends React.Component{

    
    render(){
        if(!this.props.roomId){
            return(
                <div className="message-list" >
                    <div className="join-room" >
                        &larr; Join a room!
                    </div>
                </div>
            )
         }

        return(
            <div className="message-list">
                <ul>
                    {this.props.messages.map((message)=>{
                        return(
                            <Message key={message.id} message={message} />
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default MessageList