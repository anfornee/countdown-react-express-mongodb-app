import React, { Component } from 'react';
import axios from 'axios';

import Countdown from './Countdown';

class CountdownContainer extends Component {
    state = {
        events: [],
        amountOfEvents: 0,
        countdownContainerGrid: "countdownContainerGrid",
        deletedEvent: false,
        newEvent: this.props.newEvent
    }

    fetchEvents = () => {
        const encodedURI = window.encodeURI(this.props.uri);
        return axios.get(encodedURI).then(res => {
            this.setState({ events: res.data, amountOfEvents: res.data.length },
                () => {
                    if (this.state.amountOfEvents === 2) {
                        this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
                    } else if (this.state.amountOfEvents === 1) {
                        this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
                    }
                });
        });
    }

    componentDidMount() {
        this.fetchEvents();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState(nextProps);
        }
    }

    deleted = () => {
        this.fetchEvents();
        this.setState({ deletedEvent: !this.state.deletedEvent });
    }

    render() {
        console.log(this.props.newEvent);
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
