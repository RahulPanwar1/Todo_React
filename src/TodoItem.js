import React from "react";

export default function TodoItem({ todo, onEditClick, onDeleteClick, onMarkAsCompleted }) {
  const itemClassName = todo.completed ? "completed" : "";

  return (
    <li key={todo.id} className={itemClassName}>
      {todo.text}
      <button onClick={() => onEditClick(todo)} className="edit-button">Edit</button>
      <button onClick={() => onDeleteClick(todo.id)} className="delete-button">Delete</button>
      <button onClick={() => onMarkAsCompleted(todo.id)} className="complete-button">
        {todo.completed ? "Unmark" : "Mark as Completed"}
      </button>
    </li>
  );
}
