import React from "react";
import EditEntryButton from "./EditEntryButton";

export default function EntryList({ entries }) {
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
                        <strong>Start Time:</strong> {doc.datetimestart}
                      </p>
                      <p>
                        <strong>End Time:</strong> {doc.datetimeend}
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
