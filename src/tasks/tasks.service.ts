import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    constructor(){
        const task1: Task = {
            id: v4(),
            title: "Clean house",
            description: "All rooms are filthy.",
            status: TaskStatus.OPEN
        };

        const task2: Task = {
            id: v4(),
            title: "Wash dog",
            description: "Fred is quite smelly.",
            status: TaskStatus.OPEN
        };

        this.tasks.push(task1);
        this.tasks.push(task2);
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto:CreateTaskDto): Task{
        const { title, description } = createTaskDto;

        const task: Task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    getTaskById(id:string): Task{
        return this.tasks.find((task)=> task.id === id);
    }
}
