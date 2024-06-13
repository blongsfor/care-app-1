import React from "react";
import EditEntryButton from "./EditEntryButton";
import DeleteEntryButton from "./DeleteEntryButton";

export default function EntryList({ entries }) {
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString("default", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    });
  }
  return (
    <>
      <ul>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li key={entry.clientID}>
              <h2>{entry.client}</h2>
              {entry.documentation?.length > 0 ? (
                <ul>
                  {entry.documentation.map((doc, index) => (
                    <li key={index}>
                      <p>
                        <strong>Start Time:</strong>{" "}
                        {formatDateTime(doc.datetimestart)}
                      </p>
                      <p>
                        <strong>End Time:</strong>{" "}
                        {formatDateTime(doc.datetimeend)}
                      </p>
                      <p>
                        <strong>Task:</strong> {doc.task}
                      </p>
                      <p>
                        <strong>Details:</strong> {doc.details}
                      </p>
                      <EditEntryButton
                        clientID={entry.clientID} // the props we need in the EditEntryButton to make it work for the specific entry
                        docIndex={index} // the specific index from the created documentationentry
                        doc={doc} // the documentationentry from the maped entries
                      />
                      <DeleteEntryButton
                        clientID={entry.clientID}
                        docIndex={index}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documentation available</p>
              )}
            </li>
          ))
        ) : (
          <p>No entries available</p>
        )}
      </ul>
    </>
  );
}
