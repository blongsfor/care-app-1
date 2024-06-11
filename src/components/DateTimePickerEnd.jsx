export default function DateTimePickerEnd() {
  const date = new Date().toISOString().slice(0, 16);

  return (
    <>
      <label htmlFor="meeting-end">End:</label>
      <input
        type="datetime-local"
        id="meeting-end"
        name="meeting-end"
        defaultValue={date}
      />
    </>
  );
}
