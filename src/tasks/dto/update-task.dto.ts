import { Type } from "class-transformer";
import { IsString, IsOptional, IsDate, IsBoolean } from "class-validator";

export class updateTaskDto {
    @IsString()
    @IsOptional()
    summary: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @IsBoolean()
    @IsOptional()
    completed: boolean;

    @IsBoolean()
    @IsOptional()
    Isworking: boolean;
}