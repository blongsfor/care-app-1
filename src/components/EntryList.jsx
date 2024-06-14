import React from "react";
import EditEntryButton from "./EditEntryButton";
import DeleteEntryButton from "./DeleteEntryButton";

export default function EntryList({ entries }) {
  //this function formats the time
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
            <li key={entry.clientID || entry._id}>
              <details>
                <summary>{entry.client}</summary>
                {entry.documentation?.length > 0 ? (
                  <ul>
                    {entry.documentation.map((doc, index) => (
                      <li key={index}>
                        <p>
                          <strong>Date and Start Time:</strong>{" "}
                          {formatDateTime(doc.datetimestart)}
                        </p>
                        <p>
                          <strong>Date and End Time:</strong>{" "}
                          {formatDateTime(doc.datetimeend)}
                        </p>
                        <p>
                          <strong>Task:</strong> {doc.task}
                        </p>
                        <p>
                          <strong>Details:</strong> {doc.details}
                        </p>
                        <EditEntryButton
                          clientID={entry.clientID}
                          docIndex={index}
                          doc={doc}
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
              </details>
            </li>
          ))
        ) : (
          <p>No entries available</p>
        )}
      </ul>
    </>
  );
}
