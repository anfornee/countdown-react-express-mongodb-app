import React, { Component } from 'react'

class AddEventBtn extends Component {

  render () {
    return (
      <div className='addEventBtn'>
        <div
          style={{ textDecoration: 'none', color: 'black' }}
          onClick={this.props.hideMe}>
                    Add an event!
        </div>
      </div>
    )
  }
}

export default AddEventBtn
