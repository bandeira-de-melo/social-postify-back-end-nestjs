import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';



describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await prisma.publication.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.media.deleteMany({})

    await app.init();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /medias should return Status Code 400 if info is not sent in body', async () => {
     await request(app.getHttpServer())
    .post('/medias')
    .send({})
    .expect(HttpStatus.BAD_REQUEST);
  })

  it('POST /posts should return Status Code 400 if info is not sent in body', async () => {
     await request(app.getHttpServer())
    .post('/posts')
    .send({})
    .expect(HttpStatus.BAD_REQUEST);
  })
});
