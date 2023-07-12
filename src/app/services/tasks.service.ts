import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly snackBarDuration = 2000;

  private currentTasks: Task[] = [];

  constructor(private readonly snackBar: MatSnackBar) {}

  addTask(task: Task): void {
    this.currentTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.currentTasks));
    this.snackBar.open('Task added', 'Close', {
      duration: this.snackBarDuration,
    });
    this.sortTasks();
  }

  getTasks(): Task[] {
    this.currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.sortTasks();
    return this.currentTasks;
  }

  deleteTask(title: string): void {
    const index = this.currentTasks.findIndex((t) => t.title === title);
    this.currentTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.currentTasks));
    this.snackBar.open('Task deleted', 'Close', {
      duration: this.snackBarDuration,
    });
    this.sortTasks();
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
    this.sortTasks();
  }

  private sortTasks(): void {
    this.currentTasks.sort((a, b) => a.title.localeCompare(b.title));
    this.currentTasks.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? -1 : 1
    );
  }
}
