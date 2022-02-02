import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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

    getTasksWithFilters(filterDto: GetTasksFilterDto):Task[]{
        const {status,description} = filterDto;

        let tasks = this.tasks;

        if(status){
            tasks = tasks.filter((task)=>task.status === status);
        };

        if(description){
            tasks = tasks.filter((task)=>{
                if(task.title.toLowerCase().includes(description) || task.description.toLowerCase().includes(description))
                    return true
                return false
            });
        }

        return tasks;
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

    deleteTask(id:string): void{
        this.tasks = this.tasks.filter((task)=>task.id !== id);
    }

    updateTaskStatus(id:string, status:TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
