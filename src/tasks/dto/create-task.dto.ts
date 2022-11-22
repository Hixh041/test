import { Type } from "class-transformer";
import { IsString, IsNumber, IsDate, IsBoolean, IsOptional, MaxLength } from "class-validator";

export class createTaskDto {
    @IsOptional()
    @IsNumber()
    technicianId: number;

    @IsString()
    @MaxLength(2500, {
        message: 'Summary is too long',
    })
    summary: string;

    @Type(() => Date)
    @IsDate()
    date: Date;

    @IsBoolean()
    completed: boolean;

    @IsBoolean()
    Isworking: boolean;
}