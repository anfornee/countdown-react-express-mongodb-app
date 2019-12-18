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

    async componentDidMount() {
        const res = await fetch(`http://localhost:3001/events`);
        const posts = await res.json();
        this.setState({ events: posts, amountOfEvents: posts.length },
            () => {
                if (this.state.amountOfEvents === 2) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
                } else if (this.state.amountOfEvents === 1) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
                }
            });
    }

    newEvent = eventInfo => {
        console.log('i ran')
        this.setState({
            events: [...this.state.events, eventInfo]
        });
    }

    deleted = eventId => {
        axios.delete('http://localhost:3001/events/delete', { params: { eventId } })
            .then(async (response) => {
                // const res = await fetch(`http://localhost:3001/events`);
                // const events = await res.json();
                const events = this.state.events.filter((value, index, arr) => {
                    return value._id !== eventId;
                })
                this.setState({ events, amountOfEvents: events.length },
                    () => {
                        if (this.state.amountOfEvents === 2) {
                            this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
                        } else if (this.state.amountOfEvents === 1) {
                            this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
                        }
                    });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.props.eventInfo._id) {
            console.log('farts')
        }
        console.log('event info props: ', this.props.eventInfo)
        let events = this.state.events;
        return (
            <div className="App">
                <h1>Stuff be happening!</h1>
                <div className={this.state.countdownContainerGrid}>
                    {events.map(event =>
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
