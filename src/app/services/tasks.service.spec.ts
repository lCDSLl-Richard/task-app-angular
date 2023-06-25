import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
