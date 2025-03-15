import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

const todoKey = "reactTodo";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");

  const [task, setTask] = useState(() => {
    const rawTodos = localStorage.getItem(todoKey);
    if (!rawTodos) return [];
    return JSON.parse(rawTodos);
  });

  const [completedTasks, setCompletedTasks] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleInputValue = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    if (task.includes(inputValue)) {
      setInputValue("");
      return;
    }
    setTask((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  // DATE-TIME UPDATE
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // DELETE A SINGLE TASK
  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curtask) => curtask !== value);
    setTask(updatedTask);
  };

  // CLEAR ALL TASKS
  const handleClearTodoData = () => {
    setTask([]);
    setCompletedTasks([]);
  };

  // MARK TASK AS COMPLETED
  const handleCompleteTodo = (value) => {
    // console.log(value);
    console.log(completedTasks);
    if (!completedTasks.includes(value)) {
      setCompletedTasks([...completedTasks, value]);
    }
  };

  //Add data in localstorage
  useEffect(() => {
    localStorage.setItem(todoKey, JSON.stringify(task));
  });

  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Todo List</h1>
          <h2>{dateTime}</h2>
        </header>
        <section>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <input
                type="text"
                placeholder="Enter a task..."
                autoComplete="off"
                className="w-full p-2 border rounded-md focus:outline-none"
                value={inputValue}
                onChange={(e) => handleInputValue(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add Task
              </button>
            </div>
          </form>
        </section>

        {/* TASK LIST */}
        <div className="mt-4">
          <ul className="space-y-2">
            {task.map((curtask, index) => (
              <li
                key={index}
                className={`flex items-center justify-between bg-white shadow-md p-3 rounded-md border border-gray-200 ${
                  completedTasks.includes(curtask)
                    ? "opacity-50 line-through"
                    : ""
                }`}
              >
                <span className="text-gray-700">{curtask}</span>

                <div className="flex gap-2">
                  <button
                    className="text-green-500 hover:text-green-700 transition"
                    onClick={() => handleCompleteTodo(curtask)}
                  >
                    <MdCheck size={20} />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDeleteTodo(curtask)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CLEAR ALL BUTTON */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={handleClearTodoData}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
