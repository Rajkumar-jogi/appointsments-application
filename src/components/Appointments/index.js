import {Component} from 'react'

import {v4 as uniqueId} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    starredFilterActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const checkValidInputs = data => data !== null && data !== ''

    if (checkValidInputs(titleInput) && checkValidInputs(dateInput)) {
      const newAppointmentDetails = {
        id: uniqueId(),
        title: titleInput,
        date: dateInput,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentsList: [
          ...prevState.appointmentsList,
          newAppointmentDetails,
        ],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  toggleStarImage = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  toggleStarButton = () => {
    this.setState(prevState => ({
      starredFilterActive: !prevState.starredFilterActive,
    }))
  }

  getFilteredList = () => {
    const {starredFilterActive, appointmentsList} = this.state

    const filteredList = appointmentsList.filter(
      eachItem => eachItem.isStarred === starredFilterActive,
    )
    return filteredList
  }

  renderAppointmentsList = () => {
    const {starredFilterActive, appointmentsList} = this.state

    if (starredFilterActive === true) {
      const filteredList = this.getFilteredList()

      return filteredList.map(eachItem => (
        <AppointmentItem
          key={eachItem.id}
          eachItem={eachItem}
          toggleStarImage={this.toggleStarImage}
        />
      ))
    }

    return appointmentsList.map(eachItem => (
      <AppointmentItem
        key={eachItem.id}
        eachItem={eachItem}
        toggleStarImage={this.toggleStarImage}
      />
    ))
  }

  render() {
    const {titleInput, dateInput, starredFilterActive} = this.state
    const starButtonClassName = starredFilterActive
      ? 'after-clicked-star-button'
      : ''

    return (
      <div className="app-container">
        <div className="appointments-booking-container">
          <div className="form-image-container">
            <div className="form-details-cotainer">
              <h1 className="add-appointment-heading">Add Appointments</h1>
              <form className="form-container">
                <label htmlFor="title" className="title-label">
                  Title
                </label>
                <input
                  id="title"
                  className="title"
                  type="text"
                  placeholder="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="date" className="date-label"></label>
                <input
                  id="date"
                  className="date"
                  type="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button
                  type="submit"
                  className="add-button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                className="appointment-image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="appointsments-booked-container">
            <div className="appointsments-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`${starButtonClassName} starred-button`}
                type="button"
                onClick={this.toggleStarButton}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {this.renderAppointmentsList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
