import React, { Component } from 'react'

export default class TopMenu extends Component {

  handleLogout = () => {
    console.log('hello there')
    localStorage.clear()
    return window.location.href = '/'
  }

  render() {

    const name = localStorage.getItem('name')

    return (
      <div className='topMenu' >
        <p>Hello, {name}</p>
        <p className="topMenuLogout" onClick={this.handleLogout}>Logout</p>
      </div>
    )
  }
}
