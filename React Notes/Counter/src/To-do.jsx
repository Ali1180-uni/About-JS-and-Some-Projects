import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ToDo() {
  let [Task, setTask] = useState([{ Task: "Tasks Left", id: uuidv4() }]);
  let [newTask, setNewTask] = useState([""]);
  let [isFav, setIsFav] = useState(false);
  function updateList() {
    setTask([...Task, { Task: newTask, id: uuidv4() }]);
  }
  function fetchValue(event) {
    setNewTask(event.target.value);
  }
  function deleteValue(id) {
    setTask((addedTask) => {
      return addedTask.filter((NewTask) => NewTask.id != id);
    });
  }
  function UpdateAllUpper() {
    setTask((addedTask) => {
      return addedTask.map((upTodo) => {
        return {
          ...upTodo,
          Task: upTodo.Task.toUpperCase(),
        };
      });
    });
  }
  function UpdateAllLower() {
    setTask((addedTask) => {
      return addedTask.map((upTodo) => {
        return {
          ...upTodo,
          Task: upTodo.Task.toLowerCase(),
        };
      });
    });
  }
  function UpdateOneUpper(id) {
    setTask((addedTask) => {
      return addedTask.map((upTodo) => {
        if (upTodo.id === id) {
          return {
            ...upTodo,
            Task: upTodo.Task.toUpperCase(),
          };
        } else {
          return upTodo;
        }
      });
    });
  }

  function toggleFav() {
    setIsFav(!isFav);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        style={{ height: "50px", width: "200px", border: "2px solid white" }}
        placeholder="Enter the Task"
        type="text"
        value={newTask}
        onChange={fetchValue}
      />
      <br />
      <br />
      <button onClick={updateList}>Enter the Task</button>
      <br />
      <br />
      <hr />
      <div>
        <ul>
          {Task.map((tasks) => (
            <li key={tasks.id}>
              <span>{tasks.Task}</span>
              &nbsp;&nbsp;&nbsp;
              <button
                onClick={() => {
                  deleteValue(tasks.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  UpdateOneUpper(tasks.id);
                }}
              >
                Update to Uppercase
              </button>
              <span>
                <p onClick={toggleFav}>
                  {isFav ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </p>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={UpdateAllUpper}>Update All to Uppercase</button>
      <button onClick={UpdateAllLower}>Update All to LowerCase</button>
    </div>
  );
}

export default ToDo;
