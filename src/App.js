import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import EditForm from "./EditForm";
import "./styles.css";
import Login from "./login";
import Register from "./register";

export default function App() {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const usersData = localStorage.getItem("registeredUsers");
    if (usersData) {
      return JSON.parse(usersData);
    } else {
      return [];
    }
  });
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleLogin = (username, password) => {
    // Check if the user exists in the registered users list
    const userExists = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (userExists) {
      // Set the authenticated user
      setUser(username);
    } else {
      alert("Invalid username or password");
    }
  };
  const handleLogout = () => {
    setUser(null);
  };

  const handleRegister = (username, password) => {
    // Check if the username is already taken
    const usernameTaken = registeredUsers.some((user) => user.username === username);

    if (usernameTaken) {
      alert("Username is already taken");
    } else {
      // Save the new user in the registered users list
      const newUser = { username, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      localStorage.setItem("registeredUsers", JSON.stringify([...registeredUsers, newUser]));
      setUser(username);
    }
  };

  if (!user) {
    return (
      <>
        <Register onRegister={handleRegister} />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();
  
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: new Date(),
          text: todo.trim()
        }
      ]);
      setTodo(""); 
    }
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  function handleMarkAsCompleted(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        if (updatedTodo.completed) {
          setCompletedTodos([...completedTodos, updatedTodo]);
        } else {
          setCompletedTodos(completedTodos.filter((item) => item.id !== id));
        }
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  
  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="App">
       <button onClick={handleLogout}>Logout</button>
      {/* Rest of your TODO app code */}
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          onAddInputChange={handleAddInputChange}
          onAddFormSubmit={handleAddFormSubmit}
        />
      )}

<ul className="todo-list">
  {todos.map((todo) => (
    <TodoItem
      todo={todo}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      onMarkAsCompleted={handleMarkAsCompleted} 
    />
  ))}
</ul>

    </div>
  );
}