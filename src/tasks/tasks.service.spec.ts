import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './../notifications/notifications.service';
import { TasksService } from './tasks.service';
import { DataSource } from "typeorm";
import { Task } from './task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepositoryFactory = jest.fn(() => ({
  // mock find
  find: jest.fn(entity => ({ id: 1, technicianId: 1, summary: 'test', date: '01/01/2022', completed: true, Isworking: false })),
}));

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('TasksService', () => {
  let service: TasksService;
  let fakeNotificationsService: Partial<NotificationsService>;

  beforeEach(async () => {
    fakeNotificationsService = {
      send: (msg: {desctiption: string, otherData: any}) => {
        return Promise.resolve(msg);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockUserRepositoryFactory,
        },
        {
          provide: NotificationsService,
          useValue: fakeNotificationsService,
        }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find service returns a list of task', async () => {
    const task = await service.find({id: 1});
    expect(task).toBeDefined();
  });
});
