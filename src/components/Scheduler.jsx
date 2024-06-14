// components/Scheduler.js
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Meeting",
    start: new Date(),
    end: new Date(moment().add(1, "hours")),
    allDay: false,
  },
  // Add more events here
];

const Scheduler = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Scheduler;
