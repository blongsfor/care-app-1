import React from "react";

export default function DateTimePickerStart() {
  const currentDate = new Date();

  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

  const currentDateTime = currentDate.toISOString().slice(0, 16);

  return (
    <div style={styles.container}>
      <label htmlFor="meeting-start" style={styles.label}>
        Start:{" "}
      </label>
      <input
        type="datetime-local"
        id="meeting-start"
        name="meeting-start"
        defaultValue={currentDateTime}
        style={styles.select}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  label: {
    marginRight: "10px",
    fontSize: "1em",
    color: "white",
    width: "30%",
    textAlign: "left",
  },
  select: {
    width: "70%",
    padding: "3px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
};
