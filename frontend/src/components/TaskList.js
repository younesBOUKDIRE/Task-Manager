import React, { useState } from 'react';
import axios from 'axios';

function TaskList({ tasks, fetchTasks }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      title: editedTitle,
      description: editedDescription,
    });
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          {editingTask === task._id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="input-field"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="textarea-field"
              />
              <button onClick={() => handleUpdate(task._id)} className="btn-primary">
                Save
              </button>
              <button onClick={() => setEditingTask(null)} className="btn-secondary">
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-buttons">
                <button onClick={() => handleEdit(task)} className="btn-modify">
                  Modify
                </button>
                <button onClick={() => handleDelete(task._id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
