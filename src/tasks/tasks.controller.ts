import { Body, Controller, Post, Get, Query, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from './../interceptor/serialize.interceptor';
import { TaskDto } from './dto/task.dto';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('tasks')
@Serialize(TaskDto)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getTasks(@Req() req) { 
        if(req.user.userType === 'Manager') {
            return this.tasksService.find({});
        }
        
        return this.tasksService.find({technicianId: req.user.userId});
    }

    @Get('/user/:id')
    getTasksByUser(@Param('id') id: number) {
        return this.tasksService.find({technicianId: id});
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Req() req, @Body() body: createTaskDto) {
        if(req.user.userType !== 'Manager') {
            body.technicianId = req.user.userId;
        }

        const task =  await this.tasksService.create(body);
        return task;
    }

    @UseGuards(JwtAuthGuard, AuthGuard)
    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.tasksService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    update(@Req() req, @Param('id') id: number, @Body() body: updateTaskDto) {
        if(req.user.userType === 'Manager') {
            return this.tasksService.update(id, body, null);
        }
        return this.tasksService.update(id, body, req.user.userId);
    }

}
