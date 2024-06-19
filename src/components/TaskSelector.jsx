import React, { useState } from "react";
import useSWR from "swr";

export default function TaskSelector() {
  const [selectedTitle, setSelectedTitle] = useState("");

  const { data: tasks = [], error } = useSWR(`/api/tasks`);

  console.log("tasks data: ", tasks);

  if (!tasks && !error) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error loading client data</h1>;
  }

  if (!tasks) {
    return <h1>Client data not available</h1>;
  }

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  return (
    <>
      <div style={styles.container}>
        <label htmlFor="task" style={styles.label}>
          Task:{" "}
        </label>
        <select
          id="task"
          name="task"
          value={selectedTitle}
          onChange={handleTitleChange}
          style={styles.select}
        >
          <option value="">Select Task</option>
          {tasks?.map((task) => (
            <option key={task._id} value={task.task}>
              {task.task}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  label: {
    marginRight: "10px",
    fontSize: "1em",
    color: "white",
    width: "30%",
    textAlign: "left",
  },
  select: {
    width: "70%",
    padding: "3px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
};
