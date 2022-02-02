import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    constructor(){
        const task: Task = {
            id: v4(),
            title: "Clean house",
            description: "All rooms are filthy.",
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
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
}
