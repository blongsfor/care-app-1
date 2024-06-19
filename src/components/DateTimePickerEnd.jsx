export default function DateTimePickerEnd() {
  const currentDate = new Date();

  const timezoneOffset = currentDate.getTimezoneOffset(); //set to our timezone
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

  const currentDateTime = currentDate.toISOString().slice(0, 16); // Formats the current date and time in ISO format, 0-16 is the number of characters a date in this format has
  return (
    <>
      <div style={styles.container}>
        <label htmlFor="meeting-end" style={styles.label}>
          End:{" "}
        </label>
        <input
          type="datetime-local"
          id="meeting-end"
          name="meeting-end"
          defaultValue={currentDateTime}
          style={styles.select}
        />
      </div>
    </>
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
