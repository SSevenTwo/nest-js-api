import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        const {status, description} = filterDto;

        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', { status: 'OPEN'});
        }

        if(description){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:description) OR LOWER(task.description) LIKE LOWER(:description)', 
                { description: `%${description}%`});
        }


        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;

        // Creating the object - has not been saved into database yet
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);

        return task;
    }
}