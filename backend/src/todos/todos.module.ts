import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  imports: [PrismaModule],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
