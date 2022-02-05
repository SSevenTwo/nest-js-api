import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository){
    }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    createTask(createTaskDto:CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(id:string): Promise<Task>{
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }
    
    async deleteTask(id:string): Promise<void>{

        // result returns an object { raw: [], affected: *number of rows deleted* }
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

    }

    async updateTaskStatus(id:string, status:TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        
        task.status = status;

        await this.taskRepository.save(task);

        return task;
    }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto):Task[]{
    //     const {status,description} = filterDto;

    //     let tasks = this.tasks;

    //     if(status){
    //         tasks = tasks.filter((task)=>task.status === status);
    //     };

    //     if(description){
    //         tasks = tasks.filter((task)=>{
    //             if(task.title.toLowerCase().includes(description) || task.description.toLowerCase().includes(description))
    //                 return true
    //             return false
    //         });
    //     }

    //     return tasks;
    // }

    // getTaskById(id:string): Task{
    //     const found = this.tasks.find((task)=> task.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }

    //     return found;
    // }

    // createTask(createTaskDto:CreateTaskDto): Task{
    //     const { title, description } = createTaskDto;

    //     const task: Task = {
    //         id: v4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id:string): void{
    //     this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task)=>task.id !== id);
    // }

    // updateTaskStatus(id:string, status:TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
