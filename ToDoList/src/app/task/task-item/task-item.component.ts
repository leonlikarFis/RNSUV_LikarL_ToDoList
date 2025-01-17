import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { Type} from '../../model/type';

@Component({
  selector: 'app-task-item',
  standalone: false,
  
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {

  selectedTypeId: string = "1";
  tasks!: Array<Task>;
  types!: Type[]

  constructor(private taskService: TaskService) {
    
  }

  ngOnInit(): void {
    this.getAllTypes();
    this.getAllTasks();
  }

  getAllTypes(){
    this.taskService.getAllTypes().subscribe({
      next: (res) => { this.types = res }
    })
  }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe({
      next: (res) => { this.tasks = res },
      error: (err) => { alert(err.message) }      
    });
  }

  getTypeName(id: number): string | undefined {
    return this.types.find(t => t.id == id)?.name;
  }

  toggleFinished(i: number) {
    this.taskService.changeFinished(this.tasks[i].idNumber).subscribe({
      next: (res) => { this.tasks[i].finished = !this.tasks[i].finished },
      error: (err) => { alert(err.message) }
    });
  }

  onChange(){
    this.taskService.getAllTasks().subscribe({
      next: (res) => { this.tasks = res.filter(s => s.typeOfTask == parseInt(this.selectedTypeId)); },
      error: (err) => { alert(err.message) }      
    });
    
  }
}


