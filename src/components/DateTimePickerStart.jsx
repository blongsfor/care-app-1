import React from "react";

export default function DateTimePickerStart() {
  const currentDate = new Date();

  // Adjust for timezone offset
  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

  // Format the current date and time in ISO 8601 format
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
