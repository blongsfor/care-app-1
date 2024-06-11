import React, { useState } from "react";
import { DateTimePicker } from "@hilla/react-components/DateTimePicker.js";

export default function DateTimePickerValue() {
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();

  return (
    <>
      <div>
        <DateTimePicker
          label="Start date and time"
          value={startDateTime}
          onValueChanged={(event) => setStartDateTime(event.detail.value)}
        />

        <DateTimePicker
          label="End date and time"
          min={startDateTime}
          value={endDateTime}
          onValueChanged={(event) => setEndDateTime(event.detail.value)}
        />
      </div>
    </>
  );
}
