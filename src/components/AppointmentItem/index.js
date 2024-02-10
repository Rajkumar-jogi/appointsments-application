import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachItem, toggleStarImage} = props
  const {title, date, id, isStarred} = eachItem

  console.log(id)
  const year = date.slice(0, 4)
  const month = date.slice(5, 7)
  const day = date.slice(8)

  const appointmentDate = format(
    new Date(year, parseInt(month) - 1, day),
    'dd MMMM yyyy, EEEE',
  )

  const onClickStartButton = () => {
    toggleStarImage(id)
  }

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="item-container">
      <div className="title-contianer">
        <p className="booked-title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickStartButton}
          data-testid="star"
        >
          <img src={starImageUrl} alt="star" />
        </button>
      </div>
      <p className="booked-date">Date: {appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
