import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private snackBar;
  private snackBarDuration = 2000;

  private currentTasks: Task[] = [];

  constructor(private _snackBar: MatSnackBar) {
    this.snackBar = _snackBar;
  }

  addTask(task: Task): void {
    this.currentTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.currentTasks));
    this.snackBar.open('Task added', 'Close', {
      duration: this.snackBarDuration,
    });
  }

  getTasks(): Task[] {
    this.currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return this.currentTasks;
  }

  deleteTask(title: string): void {
    const index = this.currentTasks.findIndex((t) => t.title === title);
    this.currentTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.currentTasks));
    this.snackBar.open('Task deleted', 'Close', {
      duration: this.snackBarDuration,
    });
  }

  changeCompletedTask(title: string, newState: boolean): void {
    const task = this.currentTasks.find((task) => task.title === title);
    if (!task) {
      this.snackBar.open('Error modfiying task', 'Close', {
        duration: this.snackBarDuration,
      });
      return;
    }
    task.completed = newState;
    localStorage.setItem('tasks', JSON.stringify(this.currentTasks));
    this.snackBar.open(`Task ${newState ? 'completed' : 'pending'}`, 'Close', {
      duration: this.snackBarDuration,
    });
  }
}
