import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const ReactBigCalendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Get events from the Redux store
  const { allEvent } = useSelector((store) => store.companies);

  // Convert ISO strings back to Date objects
  const formattedEvents = allEvent.map(event => ({
    title: event.title,
    allDay: event.allDay,
    start: new Date(event.startDate), // Convert back to Date object
    end: new Date(event.endDate), // Convert back to Date object
    id: event.id
  }));

  const handleShowMore = (events, date) => {
    setShowModal(true);
    setSelectedEvents(events);
  };

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={formattedEvents} // Use formatted events here
        step={60}
        views={["month", "week", "day", "agenda"]}
        defaultDate={new Date()}
        popup={true}
        onShowMore={handleShowMore}
      />
      {showModal && (
        <div className="modal">
          <h2>Events on this date:</h2>
          <ul>
            {selectedEvents.map((event) => (
              <li key={event.id || event.title}>{event.title}</li>
            ))}
          </ul>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ReactBigCalendar;
