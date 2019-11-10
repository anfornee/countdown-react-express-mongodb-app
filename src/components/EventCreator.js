import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import closeIcon from '../assets/images/close-cross-in-circular-outlined-interface-button-2.png';

class EventCreator extends Component {
    state = {
        title: '',
        year: 0,
        month: 0,
        day: 0,
        background: ""
    }

    titleChange = e => {
        this.setState({ title: e.target.value });
    }

    dateChange = e => {
        const dateArray = e.target.value.split('-');
        const year = parseInt(dateArray[0]);
        const month = parseInt(dateArray[1]);
        const day = parseInt(dateArray[2]);
        this.setState({
            year: year,
            month: month,
            day: day
        });
    }

    bgChange = e => {
        this.setState({ background: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const event = {
            title: this.state.title,
            year: this.state.year,
            month: this.state.month,
            day: this.state.day,
            background: this.state.background
        };

        axios.post('http://localhost:3001/events/add-an-event', event)
            .then(res => {
                const eventInfo = res.data;
                console.log(eventInfo)
                this.props.getNewEvent(eventInfo);
            })
            .catch(e => console.log(e))

        this.setState({
            title: '',
            year: 0,
            month: 0,
            day: 0,
            background: ''
        }, () => {
            this.props.bringMeBack();
            this.props.history.push('/')
            this.props.addedEvent();
        });
    }

    render() {
        console.log('event creator props: ', this.props)
        return (
            <div className="evntAddFormCont">
                <div className="eventAdderForm">
                    <Link
                        style={{ position: "relative", alignSelf: "flex-start", bottom: "15px" }}
                        onClick={this.props.bringMeBack} to="/" >
                        <img src={closeIcon} alt="close"></img>
                    </Link>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="title">Event Name: </label>
                        <input type="text" value={this.state.title} name="Title" onChange={this.titleChange} placeholder="Vacation!" />
                        <br></br>
                        <label htmlFor="date">Day of Event:</label>
                        <input id="date" name="Date" onChange={this.dateChange} type="date" />
                        <br></br>
                        <label htmlFor="background">Background URL:</label>
                        <input id="background" name="Background" onChange={this.bgChange} type="text" />
                        <br></br>
                        <button type="submit">Add it!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(EventCreator);