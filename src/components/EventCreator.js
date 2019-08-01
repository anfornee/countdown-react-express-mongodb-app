import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

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

        fetch('http://localhost:3001/events/add-an-event', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => console.log(data));

        // axios.post('http://localhost:3001/events/add-an-event', event.json())
        //     .then(response => console.log(response.data))
        //     .catch(e => console.log(e))
        // this.setState({ title: '' });
        // this.props.dispatch({
        //     type: 'YES'
        // });

        this.props.newThingMade();
    }

render() {
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

function mapStateToProps(state) {
    return {
        newEvent: state.newEvent
    };
}

export default connect(mapStateToProps)(EventCreator);