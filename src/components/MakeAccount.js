import React from 'react'
import md5 from 'md5'
class MakeAccount extends React.Component {

    constructor(){
        super()
        this.state={
            NewUsername:'',
            NewPassword:'',
            badPass: false,

        }
        this.handleNewUser=this.handleNewUser.bind(this)
        this.handleNewPass=this.handleNewPass.bind(this)
        this.handleNewAcc=this.handleNewAcc.bind(this)
    }
    handleNewUser(e){
        this.setState({
            NewUsername:e.target.value
        })
    }

    handleNewPass(e){
        this.setState({
            NewPassword:e.target.value
        })
    }
    handleNewAcc(e){
        e.preventDefault()  
        let npass=this.state.NewPassword
        if(npass.search(/\d/&&/[a-z]/&&/[A-Z]/)!==-1)
            this.props.newAcc([this.state.NewUsername,this.state.NewDisplay,md5(npass)])
       else
            this.setState({
                badPass:true
            })
    }

    render(){
        console.log('yes');
        
        return(
            <div>
                <form onSubmit={this.handleNewAcc}>
                New Username: <input required type="text"  value={this.state.NewUsername} onChange={this.handleNewUser} />
                <br />
                Display Name: <input required type="text" value={this.state.NewDisplay} onChange={this.handleDisplayChange} />
                <br />
                New Password: <input required type="password"  value={this.state.NewPassword} onChange={this.handleNewPass} />
                <br />
                <button type="submit" >Create Account</button>
                {this.state.badPass 
                ? <h6 style={{"color":"red"}}>Your password must contain a small letter, a Captial letter, and a number!</h6> 
                : ''}
                </form>
            </div>
        )
    }
}
export default MakeAccount