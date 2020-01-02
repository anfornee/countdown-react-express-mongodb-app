import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
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
            countdownContainerGrid: 'countdownContainerGrid',
            addEventStyle: {
                position: 'relative',
                transition: '.5s',
                top: '18px'
            },
            eventFormStyle: {
                position: 'relative',
                transition: '1s',
                top: '-750px'
            }
        }
    }

    async componentDidMount() {
        const userId = localStorage.getItem('userId')
        const res = await fetch(`http://localhost:3001/events/${userId}`);
        const events = await res.json();
        const amountOfEvents = events.length
        this.setState({ events, loading: !this.state.loading },
            () => {
                if (amountOfEvents === 2) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
                } else if (amountOfEvents === 1) {
                    this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
                }
            })
    }

    hideMe = () => {
        this.setState({
            addEventStyle: {
                position: 'relative',
                transition: '.5s',
                top: '-200px',
            },
            eventFormStyle: {
                position: 'relative',
                transition: '1s',
                top: '-200px',
                zIndex: '2'
            },
            isHidden: true
        })
    }

    bringMeBack = () => {
        this.setState({
            addEventStyle: {
                position: 'relative',
                transition: '.5s',
                top: '0px'
            },
            eventFormStyle: {
                position: 'relative',
                transition: '.7s',
                top: '-750px'
            },
            isHidden: false
        })
    }

    getNewEvent = eventInfo => {
        this.setState({ 
            addEventStyle: {
                position: 'relative',
                transition: '.5s',
                top: '0px'
            },
            eventFormStyle: {
                position: 'relative',
                transition: '.7s',
                top: '-750px'
            },
            isHidden: false, 
            events: [...this.state.events, eventInfo] })
    }

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
                    <div style={this.state.addEventStyle} onClick={this.hideMe}>
                        <AddEventBtn />
                    </div>
                    <div style={this.state.eventFormStyle} onClick={this.hideMeToo}>
                        <EventCreator
                            getNewEvent={this.getNewEvent}
                            bringMeBack={this.bringMeBack}
                        />
                    </div>
                    <div style={{ position: "relative", top: '-350px' }}>
                        <CountdownContainer
                            newEvent={this.state.newEvent}
                            events={this.state.events}
                            containerGrid={this.state.countdownContainerGrid}
                            deleted={this.deleted}
                        />
                    </div>
                </Router>
            )
        }
    }
}
