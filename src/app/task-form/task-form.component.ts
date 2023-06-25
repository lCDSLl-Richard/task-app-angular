import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  private service: TasksService;
  matcher = new ErrorStateMatcher();
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(tasksService: TasksService) {
    this.service = tasksService;
  }

  addTask() {
    const title = this.taskForm.get('title')?.value ?? '';
    const description = this.taskForm.get('description')?.value ?? '';
    if (!title) return;
    this.service.addTask({ title, description, completed: false });
    this.taskForm.reset();
    this.matcher.isErrorState = () => false;
  }
}
