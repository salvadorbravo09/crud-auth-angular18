import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { TaskService } from '../../data-access/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, TableComponent],
  templateUrl: './task-list.component.html',
  providers: [TaskService],
})
export default class TaskListComponent {
  _taskService = inject(TaskService);
}
