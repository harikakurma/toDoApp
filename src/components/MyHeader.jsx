import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoList from "./TodoList";
import UUID from "uuid";

class MyHeader extends Component {
  state = {
    tasks: [],
    nextId: UUID(),
    input: "",
    editItem: false,
    completed: [],
    completedTask: ""
  };
  handleInputChange = e => {
    this.setState({
      ...this.state,
      input: e.target.value
    });
  };

  addTodo = e => {
    e.preventDefault();
    if (this.state.input === "") {
      alert("todo cannot be empty");
    } else {
      const addTask = {
        id: this.state.nextId,
        content: this.state.input
      };

      const updatedTasks = [...this.state.tasks, addTask];

      this.setState(currentState => {
        return {
          ...currentState,
          tasks: updatedTasks,
          nextId: UUID(),
          input: ""
        };
      });
    }
  };

  nullWarning() {
    let addWarning = "btn m-2 btn-";
    addWarning += this.state.input === "" ? "warning" : "success";
    return addWarning;
  }

  clearTasks = c => {
    c.preventDefault();
    this.setState({
      tasks: []
    });
  };

  deleteTask = id => {
    const filterTask = this.state.tasks.filter(input => input.id !== id);
    this.setState({
      tasks: filterTask
    });
  };

  editTask = id => {
    const filterTask = this.state.tasks.filter(input => input.id !== id);
    const selectedTask = this.state.tasks.find(input => input.id === id);
    this.setState({
      tasks: filterTask,
      input: selectedTask.content,
      id: id,
      editItem: true
    });
  };

  handlecompletedTask = id => {
    const filterTask = this.state.tasks.filter(input => input.id !== id);
    const selectedTask = this.state.tasks.find(input => input.id === id);
    const completedList = [...this.state.completed, selectedTask];
    this.setState({
      tasks: filterTask,
      completed: completedList,
      completedTask: selectedTask.content,
      id: id
    });
  };

  handlingRedoTask = id => {
    const filterTask = this.state.completed.filter(
      completedTask => completedTask.id !== id
    );
    const selectedTask = this.state.completed.find(
      completedTask => completedTask.id === id
    );
    const updatedRedoTask = [...this.state.tasks, selectedTask];
    this.setState({
      tasks: updatedRedoTask,
      completed: filterTask,
      id: id
    });
  };

  render() {
    return (
      <div className="div-heading">
        <h1 className="main-heading">Tasker</h1>

        <form className="form-header">
          <label className="m-4">Things to do: </label>

          <input
            className="adding-todo"
            type="Text"
            name="addTodo"
            placeholder="Enter your task"
            value={this.state.input}
            onChange={this.handleInputChange}
          ></input>
          <button
            className={this.nullWarning()}
            type="button"
            onClick={this.addTodo}
          >
            {this.state.editItem ? "submit" : "Add task"}
          </button>

          <TodoList
            tasks={this.state.tasks}
            clearTask={this.clearTasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            editItem={this.editItem}
            completed={this.state.completed}
            handlecompletedTask={this.handlecompletedTask}
            handlingRedoTask={this.handlingRedoTask}
          />
        </form>
      </div>
    );
  }
}

export default MyHeader;
