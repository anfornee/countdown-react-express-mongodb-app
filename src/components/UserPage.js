import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios'

import AddEventBtn from "./AddEventBtn";
import EventCreator from "./EventCreator";
import CountdownContainer from "./CountdownContainer";
import TopMenu from './TopMenu'

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
        top: '18px',
        zIndex: 100,
      },
      eventFormStyle: {
        opacity: 0,
        zIndex: -1,
      },
      countdownContainerStyle: {
        transition: '.3s',
        zIndex: 1,
        position: 'relative',
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
        transition: 'all .5s',
        top: '-200px',
      },
      eventFormStyle: {
        transition: 'all .7s ease-in-out .1s',
        zIndex: 100,
        opacity: 1,
      },
      countdownContainerStyle: {
        transition: '.3s',
        zIndex: -1,
        position: 'relative',
      },
      isHidden: true
    })
  }

  bringMeBack = () => {
    this.setState({
      addEventStyle: {
        position: 'relative',
        transition: 'all .7s ease-in-out .1s',
        top: '0px',
        zIndex: 100,
      },
      eventFormStyle: {
        transition: '.7s',
        opacity: 0,
        zIndex: -1,
      },
      countdownContainerStyle: {
        transition: '.3s',
        zIndex: 1,
        position: 'relative',
      },
      isHidden: false
    })
  }

  getNewEvent = eventInfo => {
    this.setState({
      addEventStyle: {
        position: 'relative',
        transition: 'all .7s ease-in-out .1s',
        top: '0px',
        zIndex: 100,
      },
      eventFormStyle: {
        transition: '.7s',
        opacity: 0,
        zIndex: -1,
      },
      countdownContainerStyle: {
        transition: '.3s',
        zIndex: 1,
        position: 'relative',
      },
      isHidden: false,
      events: [...this.state.events, eventInfo]
    }, () => {
      console.log('events: ', this.state.events)
      const amountOfEvents = this.state.events.length
      if (amountOfEvents === 2) {
        this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
      } else if (amountOfEvents === 1) {
        this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
      }
    })
  }

  deleted = (eventId, index) => {
    let events = this.state.events
    events.splice(index, 1)
    axios.delete('http://localhost:3001/events/delete', { params: { eventId } })
      .then(async (response) => {
        this.setState({ events }, () => {
          const amountOfEvents = this.state.events.length
          if (amountOfEvents === 2) {
            this.setState({ countdownContainerGrid: "countdownContainerGrid2" })
          } else if (amountOfEvents === 1) {
            this.setState({ countdownContainerGrid: "countdownContainerGrid1" })
          }
        })
      })
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>
    }
    else {
      return (
        <Router>
          <TopMenu />
          <div style={this.state.addEventStyle} onClick={this.hideMe}>
            <AddEventBtn />
          </div>
          <div style={this.state.eventFormStyle} onClick={this.hideMeToo}>
            <EventCreator
              getNewEvent={this.getNewEvent}
              bringMeBack={this.bringMeBack}
            />
          </div>
          <div style={this.state.countdownContainerStyle}>
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
