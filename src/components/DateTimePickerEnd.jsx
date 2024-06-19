export default function DateTimePickerEnd() {
  const currentDate = new Date();

  const timezoneOffset = currentDate.getTimezoneOffset(); //set to our timezone
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

  const currentDateTime = currentDate.toISOString().slice(0, 16); // Formats the current date and time in ISO format, 0-16 is the number of characters a date in this format has
  return (
    <>
      <label htmlFor="meeting-end" style={styles.label}>
        End:{" "}
      </label>
      <input
        type="datetime-local"
        id="meeting-end"
        name="meeting-end"
        defaultValue={currentDateTime}
      />
    </>
  );
}

const styles = {
  label: {
    marginBottom: "5px",
    fontSize: "1em",
    color: "white",
  },
};
