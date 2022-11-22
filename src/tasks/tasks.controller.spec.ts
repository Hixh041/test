import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './../notifications/notifications.service';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let fakeTasksService: Partial<TasksService>;
  let fakeNotificationsService: Partial<NotificationsService>;

  beforeEach(async () => {
    fakeTasksService = {
      find: (where: {id?: number, technicianId?: number}): Promise<Task[]> => {
        return Promise.resolve([
          { id: 1, technicianId: 1, summary: 'test', date: '01/01/2022', completed: true, Isworking: false } as unknown as Task
        ]);
      },
    };

    fakeNotificationsService = {
      send: (msg: {desctiption: string, otherData: any}) => {
        return Promise.resolve(msg);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: fakeTasksService,
        },
        {
          provide: NotificationsService,
          useValue: fakeNotificationsService,
        }
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find returns a list of task', async () => {
    const task = await controller.getTasks({
      user: {
        userId: 1,
        userType: 'Technician'
      }
    });
    expect(task).toBeDefined();
  });
});
