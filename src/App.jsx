import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: input,
        completed: false,
      },
    ]);

    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Todo App</h1>

      <h3>Total Tasks: {tasks.length}</h3>

      <input
        type="text"
        placeholder="Enter task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <button onClick={clearAllTasks}>
        Clear All
      </button>

      <ul style={{ listStyle: "none" }}>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
                marginRight: "10px",
              }}
            >
              {task.text}
            </span>

            <button
              onClick={() =>
                toggleComplete(index)
              }
            >
              Complete
            </button>

            <button
              onClick={() =>
                deleteTask(index)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;