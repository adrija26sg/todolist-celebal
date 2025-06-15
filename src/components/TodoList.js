import React, { useState, useEffect, useCallback } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showCompleted, setShowCompleted] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskPriority, setTaskPriority] = useState("medium");
  const [showCelebration, setShowCelebration] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    highPriority: 0,
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setStats({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      active: tasks.filter((task) => !task.completed).length,
      highPriority: tasks.filter((task) => task.priority === "high").length,
    });
  }, [tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: taskPriority,
        dueDate: selectedDate,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setTaskPriority("medium");
      setSelectedDate("");
      setIsAddingTask(false);
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const taskToToggle = tasks.find((task) => task.id === id);
    if (taskToToggle && !taskToToggle.completed) {
      setShowCelebration(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showCelebration) {
      timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showCelebration]);

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const updatePriority = (id, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#e74c3c";
      case "medium":
        return "#f39c12";
      case "low":
        return "#2ecc71";
      default:
        return "#95a5a6";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || task.dueDate === selectedDate;
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed) ||
      (filter === "high" && task.priority === "high");
    const matchesCompleted = showCompleted || !task.completed;

    return matchesSearch && matchesDate && matchesFilter && matchesCompleted;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.dueDate || 0) - new Date(a.dueDate || 0);
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "alphabetical":
        return a.text.localeCompare(b.text);
      default:
        return 0;
    }
  });

  return (
    <div className="app-container">
      {showCelebration && (
        <div className="celebration-animation-container">
          🎉 Task Completed! 🎉
        </div>
      )}
      <div className="todo-list-container">
        <div className="parallax-header">
          <h1>Task Master</h1>
          <p>Organize your day, achieve your goals</p>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Active</h3>
            <p>{stats.active}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>
          <div className="stat-card">
            <h3>High Priority</h3>
            <p>{stats.highPriority}</p>
          </div>
        </div>

        <div className="todo-list">
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-filter"
            />
          </div>

          <div className="controls">
            <div className="filter-section">
              <div className="filter-group">
                <label>Filter by:</label>
                <div className="filter-buttons">
                  <button
                    className={`filter-button ${
                      filter === "all" ? "active" : ""
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={`filter-button ${
                      filter === "active" ? "active" : ""
                    }`}
                    onClick={() => setFilter("active")}
                  >
                    Active
                  </button>
                  <button
                    className={`filter-button ${
                      filter === "completed" ? "active" : ""
                    }`}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </button>
                  <button
                    className={`filter-button ${
                      filter === "high" ? "active" : ""
                    }`}
                    onClick={() => setFilter("high")}
                  >
                    High Priority
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label>Sort by:</label>
                <div className="filter-buttons">
                  <button
                    className={`filter-button ${
                      sortBy === "date" ? "active" : ""
                    }`}
                    onClick={() => setSortBy("date")}
                  >
                    Date
                  </button>
                  <button
                    className={`filter-button ${
                      sortBy === "priority" ? "active" : ""
                    }`}
                    onClick={() => setSortBy("priority")}
                  >
                    Priority
                  </button>
                  <button
                    className={`filter-button ${
                      sortBy === "alphabetical" ? "active" : ""
                    }`}
                    onClick={() => setSortBy("alphabetical")}
                  >
                    Alphabetical
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label className="show-completed">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                  />
                  Show Completed
                </label>
              </div>
            </div>

            <button
              className={`add-task-button ${isAddingTask ? "active" : ""}`}
              onClick={() => setIsAddingTask(!isAddingTask)}
            >
              {isAddingTask ? "Cancel" : "+ Add Task"}
            </button>
          </div>

          {isAddingTask && (
            <form onSubmit={addTask} className="add-task-form">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="task-input"
                autoFocus
              />
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="priority-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="due-date-input"
              />
              <button type="submit" className="submit-button">
                ADD
              </button>
            </form>
          )}

          <div className="tasks-container">
            {sortedTasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks found! Add one to get started.</p>
              </div>
            ) : (
              <ul className="tasks-list">
                {sortedTasks.map((task) => (
                  <li
                    key={task.id}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                    style={{
                      borderLeft: `4px solid ${getPriorityColor(
                        task.priority
                      )}`,
                    }}
                  >
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                        className="task-checkbox"
                      />
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={task.text}
                          onChange={(e) => updateTask(task.id, e.target.value)}
                          onBlur={() => setEditingTask(null)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && setEditingTask(null)
                          }
                          className="edit-input"
                          autoFocus
                        />
                      ) : (
                        <span
                          className="task-text"
                          onDoubleClick={() => setEditingTask(task.id)}
                        >
                          {task.text}
                        </span>
                      )}
                      <div className="task-meta">
                        {task.dueDate && (
                          <span className="due-date">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        <select
                          value={task.priority}
                          onChange={(e) =>
                            updatePriority(task.id, e.target.value)
                          }
                          className="priority-select"
                          style={{ color: getPriorityColor(task.priority) }}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => setEditingTask(task.id)}
                        className="edit-button"
                        aria-label="Edit task"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="delete-button"
                        aria-label="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
