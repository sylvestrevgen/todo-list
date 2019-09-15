import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a Lunch")
    ],
    searchText: "",
    statusButtonActive: "All"
  };

  componentDidMount() {
    const todoLS = localStorage.getItem("todos");

    if (todoLS) {
      this.setState({
        todoData: JSON.parse(todoLS)
      });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoData !== this.state.todoData) {
      localStorage.setItem("todos", JSON.stringify(this.state.todoData))
    }
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId += 1
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(el => el.id !== id);

      return {
        todoData: newArr
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      }
    })
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  search(items, searchText) {
    if (searchText.length === 0) {
      return items;
    }
    return items
      .filter(el => el.label.toLowerCase().includes(searchText.toLowerCase()));
  };

  onSearchChange = (event) => {
    this.setState({
      searchText: event.target.value,
    })
  };

  onStatusFilterItems(items, btnType) {
    if (btnType === "Active") {
      return items.filter(el => !el.done);
    } else if (btnType === "Done") {
      return items.filter(el => el.done);
    } else {
      return items;
    }
  };

  onBtnClick = (event) => {
    if (event.target.textContent === this.state.statusButtonActive) return;
    this.setState({
      statusButtonActive: event.target.textContent
    });
  };

  render() {
    const { todoData, searchText, statusButtonActive } = this.state;

    const visibleItems = this.onStatusFilterItems(this.search(todoData, searchText), statusButtonActive);
    // const filteredStatusItems = this.onStatusFilterItems(todoData, statusButtonActive)
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}
            value={searchText} />
          <ItemStatusFilter
            onBtnClick={this.onBtnClick}
            statusButtonActive={this.state.statusButtonActive} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};