import React from 'react'


class Sidebar extends React.Component  {

    render(){
        return(
            <div className="sidebar">
                {this.props.inRoom
                    ?<h3> Online Users </h3>
                    : null
                }
                
            </div>
        )
    }
}

export default Sidebar