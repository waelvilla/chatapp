import React from 'react'


class Sidebar extends React.Component  {
    
    render(){
        let online=this.props.onlineUsers.sort()
        let offline=this.props.offlineUsers.sort()
        console.log(online);
        
        return(
            <div className="sidebar">
                {this.props.inRoom
                    ? <ul>
                         <h3> Online Users </h3>
                         
                         {online.map((user)=>{
                             return(
                                <li key={user.id} className="room" >{user.name}</li>
                             )
                         })}
                         </ul>                        
                        
                    : null
                }
                {offline
                ? <ul>
                    <h3>Offline Users</h3>
                    {offline.map((user)=>{
                        return(
                            <li key={user.id} className="room">{user.name}</li>
                        )
                    })}
                </ul>
                : null
                }
            </div>
        )
    }
}

export default Sidebar