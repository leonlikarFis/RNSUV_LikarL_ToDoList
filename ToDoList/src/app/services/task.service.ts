import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>("/api/task");
  }

  getAllTypes(): Observable<any>{
    return this.http.get<Task[]>("/api/task/types");
  }

  createTask(t: Task){
    return this.http.post("/api/task", t);
  }

  changeFinished(id: number):Observable<any>{
    return this.http.patch('/api/task/'+id, {});
  }
}
