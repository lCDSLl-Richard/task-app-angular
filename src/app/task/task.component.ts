import { Component, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() completed = false;

  constructor(private readonly service: TasksService) {}

  onComplete() {
    this.service.changeCompletedTask(this.title, !this.completed);
  }

  onDelete() {
    this.service.deleteTask(this.title);
  }
}
