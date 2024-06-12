import React from "react";

export default function EntryList({ entries }) {
  return (
    <>
      <ul>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li key={entry._id}>
              <h2>{entry.client}</h2>
              {entry.documentation?.length > 0 ? (
                <ul>
                  {entry.documentation.map((doc, index) => (
                    <li key={index}>
                      <p>
                        <strong>Date and Time:</strong> {doc.datetime}
                      </p>
                      <p>
                        <strong>Task:</strong> {doc.task}
                      </p>
                      <p>
                        <strong>Details:</strong> {doc.details}
                      </p>
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
