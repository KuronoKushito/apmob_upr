// src/app/todo/todo.page.ts
import { Component } from '@angular/core';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss']
})
export class TodoPage {
  todos: any[] = [];

  constructor(private sqliteService: SQLiteService) {
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    this.todos = await this.sqliteService.getTodos();
  }

  addTodo(): void {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      console.log('Adding todo:', taskName);
      this.saveTodoAndSync(taskName);
      // this.sqliteService.addTodo(taskName)
      //   .then(() => this.loadTodos())
      //   .catch(error => console.error('Error adding todo', error));
    }
  }

  updateTodoStatus(id: number, completed: number): void {
    this.sqliteService.updateTodoStatus(id, completed)
      .then(() => this.loadTodos())
      .catch(error => console.error('Error updating todo status', error));
  }

  deleteTodo(id: number): void {
    this.sqliteService.deleteTodo(id)
      .then(() => this.loadTodos())
      .catch(error => console.error('Error deleting todo', error));
  }

  clearTodos(): void {
    this.sqliteService.clearTodos()
      .then(() => this.loadTodos())
      .catch(error => console.error('Error clearing todos', error));
  }

  saveTodoAndSync(taskName: string): void {
    this.sqliteService.addTodoAndSync(taskName)
      .then(() => console.log('Todo added and synced successfully'))
      .catch(error => console.error('Error adding and syncing todo', error));
  }
}
