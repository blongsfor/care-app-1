import React from "react";
import { DateTimePicker } from "@hilla/react-components/DateTimePicker.js";

export default function DateTimePickerValue({
  setStartDateTime,
  setEndDateTime,
}) {
  return (
    <div>
      <DateTimePicker
        label="Start date and time"
        onValueChanged={(event) => setStartDateTime(event.detail.value)}
      />
      <DateTimePicker
        label="End date and time"
        onValueChanged={(event) => setEndDateTime(event.detail.value)}
      />
    </div>
  );
}
