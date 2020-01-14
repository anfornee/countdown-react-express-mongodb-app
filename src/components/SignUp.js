import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SignUp extends Component {

    state = {
        name: '',
        password: '',
        confirmPassword: '',
        signedUp: false
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

        axios.post('http://localhost:3001/users/signup', user)
            .then(res => {
                const user = res.data
                if (!user) {
                    console.log('Sign up unsuccesful!')
                } else {
                    localStorage.setItem('userId', user._id)
                    localStorage.setItem('name', user.name)
                    localStorage.setItem('loggedIn', 'true')
                    this.setState({ 
                        signedUp: !this.state.signedUp
                    })
                }
            })
            .catch(e => console.log(e))
    }

    render() {
        if (this.state.signedUp) {
            window.location.href = `http://localhost:3000/user/${this.state.name}`
        }
        return (
            <div className="forms-container">
                <form className="login-forms" onSubmit={this.onSubmit}>
                    <h1>Sign Up</h1>
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
                        Sign Up
                    </button>
                </form>
                <Link to='/'>
                    <h2>Login</h2>
                </Link>
            </div>
        )
    }
}
