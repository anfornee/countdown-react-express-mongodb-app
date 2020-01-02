import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class AddEventBtn extends Component {

    render() {
        return (
            <div className="addEventBtn">
                <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    onClick={this.props.hideMe}
                    to="/add-an-event">
                    Add an event!
                    </Link>
            </div>
        )
    }
}

export default AddEventBtn
