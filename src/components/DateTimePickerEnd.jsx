export default function DateTimePickerEnd() {
  const currentDate = new Date();

  // Adjust for timezone offset
  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

  // Format the current date and time in ISO 8601 format
  const currentDateTime = currentDate.toISOString().slice(0, 16);
  return (
    <>
      <label htmlFor="meeting-end">End: </label>
      <input
        type="datetime-local"
        id="meeting-end"
        name="meeting-end"
        defaultValue={currentDateTime}
      />
    </>
  );
}
