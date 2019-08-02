import React, { Component } from 'react';
import axios from 'axios';

import Countdown from './Countdown';

class CountdownContainer extends Component {
    state = {
        events: [],
        amountOfEvents: 0,
        countdownContainerGrid: "countdownContainerGrid",
        deletedEvent: false,
    }

    fetchEvents = () => {
        const encodedURI = window.encodeURI(this.props.uri);
        return axios.get(encodedURI).then(res => {
            this.setState(() => {
                return {
                    events: res.data,
                    amountOfEvents: res.data.length
                }
            }, () => {
                if (this.state.amountOfEvents === 2) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
                } else if (this.state.amountOfEvents === 1) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
                }
            });
        });
    }

    deleted = () => {
        this.setState({ deletedEvent: !this.state.deletedEvent }, () => {
            this.reRender();
        });
    }

    reRender = () => {
        this.setState({ deletedEvent: !this.state.newEvent });
    }

    render() {
        this.fetchEvents();
        return (
            <div className="App">
                <h1>Stuff be happening!</h1>
                <div className={this.state.countdownContainerGrid}>
                    {this.state.events.map(event =>
                        <Countdown
                            deleted={this.deleted}
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            month={event.month}
                            day={event.day}
                            year={event.year}
                            image={event.background}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default CountdownContainer;
