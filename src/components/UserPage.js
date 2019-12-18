import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddEventBtn from "./AddEventBtn";
import EventCreator from "./EventCreator";
import CountdownContainer from "./CountdownContainer";

export default class UserPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

    style = {
        display: "initial"
    };

    hideMe = () => {
        this.style = {
            display: "none"
        };
        this.setState({ isHidden: true });
    };

    bringMeBack = () => {
        this.style = {
            display: "initial"
        };
        this.setState({ isHidden: false });
    };

    addedEvent = eventInfo => {
        this.setState({ eventInfo });
    };


    render() {
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
                            addedEvent={this.addedEvent}
                            bringMeBack={this.bringMeBack}
                        />
                    )}
                />
                <CountdownContainer
                    eventInfo={this.state.eventInfo}
                    newEvent={this.state.newEvent}
                    uri="http://localhost:3001/events/"
                />
            </Router>
        )
    }
}
