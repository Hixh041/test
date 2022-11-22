import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsService } from './../notifications/notifications.service';
import { Repository } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import * as moment from 'moment';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private repo: Repository<Task>,
    private notificationsService: NotificationsService) {}

    create(body: createTaskDto) {
        const task = this.repo.create(body);

        return this.repo.save(task);
    }

    find(where: {id?: number, technicianId?: number}) {
        return this.repo.find({
            where
        });
    }

    findOneBy(where: {id?: number, technicianId?: number}) {
        if(!where.id && !where.technicianId) {
            return null
        } 
        
        return this.repo.findOne({
            where
        });
    }

    async update(id: number, attrs: Partial<Task>, currentUser: number | null) {
        const task = await this.repo.findOneBy({id});

        if(!task || ( currentUser && task.technicianId !== currentUser)) {
            throw new NotFoundException("task not found");
        }

        if(!currentUser && (attrs.completed || attrs.Isworking)) {
            // send notification
            this.notificationsService.send({desctiption: `The tech ${task.technicianId} performed the task {${task.id} on date ${moment().format('DD-MM-YYYY')}`, otherData: attrs});
        }

        Object.assign(task, attrs);

        return this.repo.save(task);
    }

    async delete(id: number) {
        const task = await this.repo.findOneBy({id});

        if(!task) {
            throw new NotFoundException("task not found");
        }

        return this.repo.remove(task);
    }
}
