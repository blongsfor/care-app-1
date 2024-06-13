import React from "react";

export default function EntryList({ entries }) {
  return (
    <>
      <ul>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li key={entry._id}>
              <details>
                <summary>{entry.client}</summary>
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
