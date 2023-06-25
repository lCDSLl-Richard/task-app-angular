import { Component, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() title: string = '';
  @Input() description = '';
  @Input() completed = false;
  private service: TasksService;

  constructor(tasksService: TasksService) {
    this.service = tasksService;
  }

  onComplete() {
    this.service.changeCompletedTask(this.title, !this.completed);
  }

  onDelete() {
    this.service.deleteTask(this.title);
  }
}
