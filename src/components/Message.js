import React from 'react'

class Message extends React.Component{


    render(){
        return(
            <div className="message">
                <div className="message-username" >{this.props.message.senderId}</div>
                <div className="message-text">{this.props.message.text}</div>
            </div>
        )
    }
}

export default Message