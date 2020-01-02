import React, { Component } from 'react'
import axios from 'axios'

import SignUp from './SignUp'

export default class Login extends Component {

    state = {
        name: '',
        password: '',
        loggedIn: false
    }

    nameChange = e => {
        this.setState({ name: e.target.value })
    }

    passwordChange = e => {
        this.setState({ password: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const user = {
            name: this.state.name,
            password: this.state.password
        }

        axios.post('http://localhost:3001/users/login', user)
            .then(res => {
                const user = res.data
                if (!user) {
                    console.log('No user found!')
                } else {
                    localStorage.setItem('userId', user._id)
                    localStorage.setItem('name', user.name)
                    localStorage.setItem('loggedIn', 'true')
                    this.setState({ 
                        loggedIn: !this.state.loggedIn 
                    })
                }
            })
            .catch(e => console.log(e))
    }

    render() {
        if (this.state.loggedIn) {
            window.location.href = `http://localhost:3000/${this.state.name}`
        }
        return (
            <div className="forms-container">
                <form className="login-forms" onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.nameChange}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.passwordChange}
                    />
                    <button
                        type="submit"
                        id="submit"
                    >
                    Login
                    </button>
                </form>
                <br />
                <SignUp />
                {/* <Link to="/home">Login</Link> */}
            </div>
        )
    }
}
