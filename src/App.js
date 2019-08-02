import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import AddEventBtn from './components/AddEventBtn';
import EventCreator from './components/EventCreator';
import CountdownContainer from './components/CountdownContainer';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isHidden: false,
            newEvent: false,
            deletedEvent: false
        }
    }

    style = {
        display: 'initial'
    }

    hideMe = () => {
        this.style = {
            display: 'none'
        };
        this.setState({ isHidden: true });
    }

    bringMeBack = () => {
        this.style = {
            display: 'initial'
        };
        this.setState({ isHidden: false });
    }

    addedEvent = () => {
        this.setState({ newEvent: !this.state.newEvent }, () => {
            this.reRender()
        });
    }

    reRender = () => {
        this.setState({ newEvent: !this.state.newEvent });
    }

    render() {
        return (
            <Router>
                <div style={this.style} >
                    <AddEventBtn hideMe={this.hideMe} />
                </div>
                <Route
                    exact path="/add-an-event"
                    render={() =>
                        <EventCreator
                            addedEvent={this.addedEvent}
                            bringMeBack={this.bringMeBack}
                        />}
                />
                <CountdownContainer newEvent={this.state.newEvent} uri="http://localhost:3001/events/" />
            </Router>
        )
    }
}

export default App;
