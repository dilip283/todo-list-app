// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const addTask = async () => {
//     if (!newTask) return;

//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: newTask,
//           completed: false,
//         }),
//       });

//       const newTaskData = await response.json();
//       setTasks([...tasks, newTaskData]);
//       setNewTask('');
//       setSuccessMessage('Task has been added successfully');

//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000);
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const completeTask = async (taskId) => {
//     const updatedTasks = tasks.map((task) => {
//       if (task.id === taskId) {
//         task.completed = !task.completed;
//         fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(task),
//         });
//       }
//       return task;
//     });
//     setTasks(updatedTasks);
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
//         method: 'DELETE',
//       });

//       const updatedTasks = tasks.filter((task) => task.id !== taskId);
//       setTasks(updatedTasks);
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Todo List</h1>
//       <div className="task-input">
//         <input
//           type="text"
//           placeholder="Add a new task"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button onClick={addTask}>Add</button>
//       </div>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id} className={task.completed ? 'completed' : ''}>
//             <input
//               type="checkbox"
//               checked={task.completed}
//               onChange={() => completeTask(task.id)}
//             />
//             {task.title}
//             <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect } from 'react';
import './App.css';
import ConfirmationDialog from './ConfirmationDialog';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask) return;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask,
          completed: false,
        }),
      });

      const newTaskData = await response.json();
      setTasks([...tasks, newTaskData]);
      setNewTask('');
      setSuccessMessage('Task has been added successfully');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
        fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = async (taskId) => {
    try {
      setTaskToDelete(taskId);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${taskToDelete}`, {
          method: 'DELETE',
        });

        const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setShowConfirmation(false);
        setTaskToDelete(null);
      }
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;
