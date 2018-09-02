import React from 'react'


class NewRoomForm extends React.Component {
    constructor(){
        super()
        this.state={
            newRoomName:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e){
        const newRoomName=e.target.value
        this.setState({
            newRoomName
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.onSubmit(this.state.newRoomName)
        this.setState({
            newRoomName:''
        })
    }
    render(){
        return(
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.newRoomName} placeholder="Create a New Room" onChange={this.handleChange} />
                    <button type="submit">+ </button>
                </form>
            </div>
        )
    }
}

export default NewRoomForm