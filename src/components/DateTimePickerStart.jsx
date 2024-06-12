import React from "react";

export default function DateTimePickerStart() {
  return (
    <div>
      <label htmlFor="meeting-start">Start: </label>
      <input
        type="datetime-local"
        id="meeting-start"
        name="meeting-start"
        required
      />
    </div>
  );
}
