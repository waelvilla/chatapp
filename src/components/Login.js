import React from 'react'
import MakeAccount from './MakeAccount'


class Login extends React.Component {

    constructor(){
        super()
        this.state={
            username:'',
            password: '',
            noAcc:false,

        }
        this.handleUserChange=this.handleUserChange.bind(this)
        this.handlePassChange=this.handlePassChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.getAcc=this.getAcc.bind(this)
    }
    
    handleUserChange(e){  
        this.setState({
            username:e.target.value
        })        
    }

    handlePassChange(e){
        this.setState({
            password:(e.target.value)
        })
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.creds(this.state.username,this.state.password)
        this.setState({
            password:''
        })
    }

    getAcc(){
        this.setState({
            noAcc:true
        })
    }

    render(){
        return(
            <div className="login">
            <h2> Login </h2>
            <form onSubmit={this.handleSubmit} >
                Username: <input type="text" value={this.state.username} onChange={this.handleUserChange} required />
                <br />
                Password: <input type="password"  value={this.state.password} onChange={this.handlePassChange} required/>
                <br />
                {this.props.wrongPass ? <h6 style={{"color":"red"}}>Your username and password combination is incorrect!</h6> : ''}
                <button type="submit">Submit </button>
                <br />
                <br />
                <h4> Don't have an account? <a href="#" onClick={this.getAcc}>Make one!</a> </h4>
                </form> 
                {this.state.noAcc
                ? <MakeAccount />
                : ''}

            </div>
        )
    }
}

export default Login