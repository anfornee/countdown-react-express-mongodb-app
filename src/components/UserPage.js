import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios'

import AddEventBtn from "./AddEventBtn";
import EventCreator from "./EventCreator";
import CountdownContainer from "./CountdownContainer";

export default class UserPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            isHidden: false,
            newEvent: false,
            deletedEvent: false,
            eventInfo: {},
            events: {},
            amountOfEvents: 0,
            countdownContainerGrid: 'countdownContainerGrid'
        };
    }

    async componentDidMount() {
        const res = await fetch(`http://localhost:3001/events`);
        const events = await res.json();
        const amountOfEvents = events.length
        this.setState({ events, loading: !this.state.loading },
            () => {
                if (amountOfEvents === 2) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
                } else if (amountOfEvents === 1) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
                }
            });
    }

    style = {
        display: "initial"
    };

    hideMe = () => {
        this.style = {
            display: "none"
        };
        this.setState({ isHidden: true });
    };

    bringMeBack = eventInfo => {
        this.style = {
            display: "initial"
        };
        this.setState({ isHidden: false, events: [...this.state.events.reverse(), eventInfo]});
    };

    deleted = (eventId, index) => {
        let events = this.state.events
        events.splice(index, 1)
        axios.delete('http://localhost:3001/events/delete', { params: { eventId } })
            .then(async (response) => {
                this.setState({ events })
            })
    }

    render() {
        if (this.state.loading) {
            return <h1>loading...</h1>
        }
        else {
            return (
                <Router>
                    <div style={this.style}>
                        <AddEventBtn hideMe={this.hideMe} />
                    </div>
                    <Route
                        exact
                        path="/add-an-event"
                        render={() => (
                            <EventCreator
                                getNewEvent={this.getNewEvent}
                                bringMeBack={this.bringMeBack}
                            />
                        )}
                    />
                    <CountdownContainer
                        newEvent={this.state.newEvent}
                        events={this.state.events}
                        containerGrid={this.state.countdownContainerGrid}
                        deleted={this.deleted}
                    />
                </Router>
            )
        }
    }
}
