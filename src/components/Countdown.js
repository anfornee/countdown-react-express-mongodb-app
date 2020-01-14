import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import closeIcon from '../assets/images/close-cross-in-circular-outlined-interface-button-2.png';

let bg = ""
let bgColor = {}

class Countdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            second: 0,
            deleted: false,
        }
    }

    componentDidMount() {
        this._isMounted = true
    }

    deleted = () => {
        this._isMounted = false
        this.props.deleted(this.props.id, this.props.index)
    }

    interval = setInterval(() => {
        if (this._isMounted) {
            this.setState({ second: this.state.second + 1 })
        }
    }, 1000);

    checkForBackground() {
        if (this.props.image === "") {
            bg = "";
            bgColor = {
                background: ""
            };
        } else {
            bg = this.props.image;
            bgColor = {
                background: "none"
            };
        }
    }

    render() {
        this.checkForBackground();

        const event = new Date(`${this.props.month}/${this.props.day}/${this.props.year}`).getTime();

        let date = new Date().getTime();
        let diff = event - date;

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return (
            <div className="eventContainer">
                <div className="imgContainer">
                    <img src={bg} alt="background" ></img>
                </div>
                <div className="textContainer" style={bgColor}>
                    <div>
                        <img
                            onClick={this.deleted}
                            src={closeIcon} alt="close">
                        </img>
                    </div>
                    <div className="text">
                        <h1>{this.props.title}</h1>
                        <h4>{this.props.month}/{this.props.day}/{this.props.year}</h4>
                        <h2>{days}:{hours}:{minutes}:{seconds}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Countdown);