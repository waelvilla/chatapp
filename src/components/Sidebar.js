import React from 'react'


class Sidebar extends React.Component  {

    render(){
        return(
            <div className="sidebar">
                {this.props.inRoom
                    ? <div>
                         <h3> Online Users </h3>
                        </div>
                    : null
                }
                
            </div>
        )
    }
}

export default Sidebar