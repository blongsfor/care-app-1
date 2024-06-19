import React from "react";
import EditEntryButton from "./EditEntryButton";
import DeleteEntryButton from "./DeleteEntryButton";

export default function EntryList({ entries, onUpdate, onDelete }) {
  // Function to format the date and time
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
    <div style={styles.container}>
      <ul style={styles.ul}>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li key={entry.clientID || entry._id} style={styles.li}>
              <details style={styles.details}>
                <summary style={styles.summary}>{entry.client}</summary>
                {entry.documentation?.length > 0 ? (
                  <ul>
                    {entry.documentation.map((doc, index) => (
                      <li key={index} style={styles.li1}>
                        <p style={styles.p}>
                          <strong>Start: </strong>{" "}
                          {formatDateTime(doc.datetimestart)}
                        </p>
                        <p style={styles.p}>
                          <strong>End: </strong>{" "}
                          {formatDateTime(doc.datetimeend)}
                        </p>
                        <p style={styles.p}>
                          <strong>Task:</strong> {doc.task}
                        </p>
                        <p style={styles.p}>
                          <strong>Details:</strong>
                          <br /> {doc.details}
                        </p>
                        <div style={styles.buttonContainer}>
                          <div style={styles.editButtonContainer}>
                            <EditEntryButton
                              clientID={entry.clientID}
                              docIndex={index}
                              doc={doc}
                              onUpdate={onUpdate}
                            />
                          </div>
                          <div style={styles.deleteButtonContainer}>
                            <DeleteEntryButton
                              clientID={entry.clientID}
                              docIndex={index}
                              onDelete={onDelete}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={styles.p}>No documentation available</p>
                )}
              </details>
            </li>
          ))
        ) : (
          <p style={styles.p}>No entries available</p>
        )}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    transition: "all 0.5s ease-in-out",
    marginTop: "10px",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    width: "100%",
  },
  li: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    marginBottom: "10px",
    transition: "transform 0.2s",
    color: "white",
    listStyle: "none",
  },
  li1: {
    position: "relative", // Ensure relative positioning for absolute children
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(85, 111, 154, 0.6)",
    marginBottom: "10px",
    transition: "transform 0.2s",
    color: "white",
    listStyle: "none",
    width: "100%",
  },
  details: {
    width: "100%",
  },
  summary: {
    cursor: "pointer",
    padding: "10px",
    width: "100%",
    color: "white",
  },
  p: {
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyItems: "center",
    marginTop: "10px",
  },
  editButtonContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  deleteButtonContainer: {
    alignSelf: "center",
  },
};
