import React, { Component } from 'react';
import axios from 'axios';

import Countdown from './Countdown';

class CountdownContainer extends Component {

    state = {
        events: this.props.events,
        amountOfEvents: 0,
        countdownContainerGrid: "countdownContainerGrid",
        deletedEvent: false,
        newEvent: this.props.newEvent
    }

    getNewComment = commentInfo => {
        this.setState({
            commentBtnText: 'Comment',
            showCommentForm: !this.state.showCommentForm,
            comments: [...this.state.comments.reverse(), commentInfo],
        });
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
        let events = this.props.events;
        
        return (
            <div className="mainCountdownContainer">
                <h1>Stuff be happening!</h1>
                {
                    this.state.events.length > 0
                        ?
                        <div className={this.props.containerGrid}>
                            {events.map((event, index) =>
                                <Countdown
                                    deleted={this.props.deleted}
                                    key={event._id}
                                    id={event._id}
                                    title={event.title}
                                    month={event.month}
                                    day={event.day}
                                    year={event.year}
                                    image={event.background}
                                    index={index}
                                />
                            )}
                        </div>
                        :
                        <div></div>
                }
            </div>
        )
    }
}

export default CountdownContainer;
