import React from 'react'


class RoomList extends React.Component{

    render(){
        const joined=this.props.joinedRooms.sort((a,b) => a.id-b.id)
        const joinable=this.props.joinableRooms
        
        
        return(
            <div className="rooms-list" >
                <ul>
                <h3> Your Rooms</h3>
                    {joined.map((room) =>{
                        const active= this.props.activeRoom===room.id? "active": ""
                        return(
                            <li  key={room.id} className={"room "+active}><a  onClick={()=>this.props.subToRoom(room.id)} href="#">#{room.name}</a></li>
                        )
                    })}
                </ul>
                {(joinable.length>0)
                ? <ul>
                    <h3>Suggested Rooms</h3>
                    {joinable.map((room) =>{            
                        return(
                            <li  key={room.id} className="room" ><a  onClick={()=>this.props.subToRoom(room.id)} href="#">#{room.name}</a></li>
                        )
                    })}
                </ul>
                : null
                }
            </div>
        )
    }
}

export default RoomList