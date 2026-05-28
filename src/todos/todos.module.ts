import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TodosRepository } from './todos.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
