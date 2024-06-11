import React from "react";
import useSWR from "swr";

export default function CategorySelector({ setTask }) {
  const { data: tasks = [], error } = useSWR(`/api/tasks`);

  if (error) return <h1>Error loading task data</h1>;
  if (!tasks) return <h1>Loading ...</h1>;

  const handleTitleChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <div>
      <label htmlFor="title">Task</label>
      <select id="title" name="title" onChange={handleTitleChange}>
        <option value="">Select Task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.task}>
            {task.task}
          </option>
        ))}
      </select>
    </div>
  );
}
