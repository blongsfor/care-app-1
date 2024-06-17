// // components/Scheduler.js
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: "Meeting",
//     start: new Date(),
//     end: new Date(moment().add(1, "hours")),
//     allDay: false,
//   },
//   // Add more events here
// ];

// const Scheduler = () => {
//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         view="day"
//         onEventEdit="true"
//       />
//     </div>
//   );
// };

// export default Scheduler;

// components/Scheduler.js
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

const Scheduler = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(moment().add(1, "hours")),
      allDay: false,
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start,
          end,
          allDay: false,
        },
      ]);
    }
  };

  const handleEventResize = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
  };

  return (
    <div>
      <h2>Scheduler</h2>
      <DraggableCalendar
        localizer={localizer}
        events={events}
        selectable
        onEventDrop={handleEventDrop}
        resizable
        onEventResize={handleEventResize}
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        style={{ height: 500, marginTop: 20 }}
      />
    </div>
  );
};

export default Scheduler;
