import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Task } from './interfaces/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tasks: Task[] = [];
  title = 'task-app';
  counter = 0;

  constructor(private readonly service: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.service.getTasks();
  }
}
