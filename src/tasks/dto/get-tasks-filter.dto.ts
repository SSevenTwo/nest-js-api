import { IsNotEmpty , IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;

    
    @IsOptional()
    @IsString()
    description?:string;
}