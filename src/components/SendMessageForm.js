import React from 'react'


class SendMessageForm extends React.Component {
    constructor(){
        super()
        this.state={
            text: ''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        const text=e.target.value
        this.setState({
            text
        })
    }
    
    handleSubmit(e){
        e.preventDefault()
        this.props.sendMessage(this.state.text)
        
        this.setState({
            text:' '
        })        
        
    }

    render(){
        
        return(
            <div className="send-message-form" onSubmit={this.handleSubmit} >
                <form>
                    <input type="text"
                        disabled={this.props.disabled}
                        value={this.state.text}
                        onChange={this.handleChange} 
                        placeholder="Send a Message" />

                </form>
            </div>
        )
    }
}

export default SendMessageForm