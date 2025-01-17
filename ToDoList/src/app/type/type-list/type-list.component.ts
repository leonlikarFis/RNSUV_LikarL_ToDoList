import { Component } from '@angular/core';
import { Type } from '../../model/type';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-type-list',
  standalone: false,
  
  templateUrl: './type-list.component.html',
  styleUrl: './type-list.component.css'
})
export class TypeListComponent {
  types!: Array<Type>;
  constructor(private toDoList: TaskService){
    this.toDoList.getAllTypes().subscribe({
      next: (res) => { this.types = res }
    })
  }
}
