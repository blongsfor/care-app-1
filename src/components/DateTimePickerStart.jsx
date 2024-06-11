export default function DateTimePickerStart() {
  const date = new Date().toISOString("de-De").slice(0, 16);

  return (
    <>
      <label htmlFor="meeting-start">Start:</label>
      <input
        type="datetime-local"
        id="meeting-start"
        name="meeting-start"
        defaultValue={date}
      />
    </>
  );
}
