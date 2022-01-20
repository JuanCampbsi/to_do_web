import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
      const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      isComplete: false
    }

    const TaskTitle = tasks.find(item => item.title === newTaskTitle)
    
    if (!TaskTitle && newTaskTitle) {
       return setTasks(oldSate => [...oldSate, newTask]);
    } 
   
  }

  function handleToggleTaskCompletion(id: number) {
  // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id);
    console.log(foundItem)

    if (!foundItem)
      return;
    foundItem.isComplete = !foundItem.isComplete;
    setTasks(updatedTasks);
  } 

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const dataNew = [...tasks];
    const newData = tasks.findIndex((item) => item.id === id);
    dataNew.splice(newData, 1);
    
    setTasks(oldSate => oldSate.filter(
        item => item.id !== id
    ));
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
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
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

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}