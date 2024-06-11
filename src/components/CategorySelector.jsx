import React, { useState } from "react";
import useSWR from "swr";

export default function Categoryelector() {
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
      <div>
        <label htmlFor="title">Task</label>
        <select
          id="title"
          name="title"
          value={selectedTitle}
          onChange={handleTitleChange}
        >
          <option value="">Select Title</option>
          {tasks?.map((task) => (
            <option key={task.id} value={task.task}>
              {task.task}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
