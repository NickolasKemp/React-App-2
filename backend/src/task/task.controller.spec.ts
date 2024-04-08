import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskService } from './task.service';
import { TaskModule } from './task.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskService: TaskService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    taskService = moduleFixture.get<TaskService>(TaskService)
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    jest.spyOn(taskService, 'getAll').mockResolvedValue([])
  })

  it('GET /task - should return an empty array initially', async () => {
    const response = await request(app.getHttpServer()).get('/task')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

})