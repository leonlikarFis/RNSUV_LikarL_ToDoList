import { Component } from '@angular/core';
import { Task } from '../../model/task';
import { Type } from '../../model/type';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  standalone: false,
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreateComponent {
  selectedTypeId: string = "1";
  task!: Task;
  types!: Type[];

  constructor(private taskService: TaskService, private router: Router) {
    this.initializeTask();

    // Pridobi vse vrste nalog
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.types = res;
      },
      error: (err) => {
        alert(err.message.msg);
      },
    });
  }

  createTask() {
    // Nastavi ID tipa naloge
    this.task.typeOfTask = parseInt(this.selectedTypeId);

    // Pridobi najvišji ID iz baze in ustvari nalogo
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.idNumber)) : 0;
        this.task.idNumber = maxId + 1; // Dodeli naslednji ID

        // Pošlji zahtevek za ustvarjanje naloge
        this.taskService.createTask(structuredClone(this.task)).subscribe({
          next: () => {
            this.initializeTask();
            this.router.navigate(['/tasks/list']);
          },
          error: (err) => {
            alert(err.message);
          },
        });
      },
      error: (err) => {
        alert("Napaka pri pridobivanju nalog: " + err.message);
      },
    });
  }

  initializeTask() {
    this.task = {
      idNumber: 0, // ID bo določen avtomatsko
      name: '',
      typeOfTask: 1,
      description: '',
      finished: false,
    };
  }
}
