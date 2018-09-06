import React from 'react'

class Message extends React.Component{


    render(){
        const active=this.props.userId==this.props.message.senderId? "message-active": ""
        return(
            <div className={"message "+active}>
                <div className="message-username" >{this.props.message.senderId}</div>
                <div className={"message-text "+active}>{this.props.message.text}</div>
            </div>
        )
    }
}

export default Message