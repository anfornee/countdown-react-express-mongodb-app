import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';

import AddEventBtn from './components/AddEventBtn';
import EventCreator from './components/EventCreator';
import CountdownContainer from './components/CountdownContainer';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isHidden: false,
            newThing: false
        }
    }

    initialState = {
        newEvent: false
    }

    reducer = (state = this.initialState, action) => {
        switch (action.type) {
            case 'NO':
                return {
                    newEvent: false
                };
            case 'YES':
                return {
                    newEvent: true
                };
            default:
                return state;
        }
    }

    style = {
        display: 'initial'
    }

    hideMe = () => {
        this.style = {
            display: 'none'
        };
        this.setState({ isHidden: true })
    }

    bringMeBack = () => {
        this.style = {
            display: 'initial'
        };
        this.setState({ isHidden: false })
    }

    newThingMade = () => {
        this.setState({ newThing: !this.state.newThing });
    }

    store = createStore(this.reducer);

    render() {
        return (
            <Router>
                <Provider store={this.store}>
                    <div style={this.style} >
                        <AddEventBtn hideMe={this.hideMe} />
                    </div>
                    <Route exact path="/add-an-event" render={() => <EventCreator wasItMade={this.state.newThing} newThingMade={this.newThingMade} bringMeBack={this.bringMeBack} />} />
                    <CountdownContainer uri="http://localhost:3001/events/" />
                </Provider>
            </Router>
        )
    }
}

export default App;
