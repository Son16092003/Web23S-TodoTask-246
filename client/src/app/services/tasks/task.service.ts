import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TestModel } from 'src/models/test.modle';
import { environment } from '../../../environments/environment';
import { TaskModel } from '../../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient, private socket: Socket) { }

  url = `${environment.baseURL}task`;

  getAllTasks(){
    return  this.httpClient.get(`${this.url}`);
  }

  getAllTasksByProjectId(project_id: string){
    return this.httpClient.get(`${this.url}/project?id=${project_id}`);
  }

  getById(id: string){
    return this.httpClient.get(`${this.url}/ID?id=${id}`);
  }

  create(task: TaskModel){
    return this.httpClient.post(`${this.url}/create`, task);
  }

  update(task: TaskModel, id: string){
    return this.httpClient.put(`${this.url}/update?id=${id}`, task);
  }

  delete(id: string){
    return this.httpClient.delete(`${this.url}/delete?id=${id}`);
  }

  getTasksSocket(project_id: string){
    const channel = 'message-' + project_id;
    return this.socket.fromEvent(channel);
  }

  sendTask(task: TaskModel){
    this.socket.emit('message', task);
  }

  getTest(test: string){
    const channel = 'message-' + test;
    return this.socket.fromEvent(channel);
  }

  sendTest(test: TestModel){
    this.socket.emit('message', test);
  }
}
