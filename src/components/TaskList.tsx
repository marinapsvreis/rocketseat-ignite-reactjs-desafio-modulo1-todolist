import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    let newTask: Task = {
      id: tasks.length,
      title: newTaskTitle,
      isComplete: false,
    };

    if (newTask.title.length === 0) {
      console.error("A tarefa deve conter uma descrição válida!");
      return;
    }

    let newTaskList = [...tasks, newTask];
    setTasks(newTaskList);
  }

  function handleToggleTaskCompletion(id: number) {
    let newTaskList = [...tasks];
    let taskIndex = tasks.findIndex((task) => task.id === id);

    newTaskList[taskIndex].isComplete =
      newTaskList[taskIndex].isComplete == false ? true : false;
    setTasks(newTaskList);
  }

  function handleRemoveTask(id: number) {
    let newTaskList = [...tasks];
    let taskIndex = tasks.findIndex((task) => task.id === id);

    newTaskList.splice(taskIndex, 1);
    setTasks(newTaskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
