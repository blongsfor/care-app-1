import React from "react";

export default function DateTimePickerStart() {
  const currentDate = new Date();

  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

  const currentDateTime = currentDate.toISOString().slice(0, 16);

  return (
    <div>
      <label htmlFor="meeting-start">Start: </label>
      <input
        type="datetime-local"
        id="meeting-start"
        name="meeting-start"
        defaultValue={currentDateTime}
      />
    </div>
  );
}
