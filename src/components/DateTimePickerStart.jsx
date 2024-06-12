// export default function DateTimePickerStart() {
//   const date = new Date().toISOString("de-De").slice(0, 16);

//   return (
//     <>
//       <label htmlFor="meeting-start">Start:</label>
//       <input
//         type="datetime-local"
//         id="meeting-start"
//         name="meeting-start"
//         defaultValue={date}
//       />
//     </>
//   );
// }

import React from "react";

export default function DateTimePickerStart() {
  return (
    <div>
      <label htmlFor="meeting-start">Meeting Start</label>
      <input
        type="datetime-local"
        id="meeting-start"
        name="meeting-start"
        required
      />
    </div>
  );
}
