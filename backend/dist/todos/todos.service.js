"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const error_message_util_1 = require("../common/error-message.util");
const todos_repository_1 = require("./todos.repository");
let TodosService = class TodosService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(createTodoDto) {
        return this.repository.create(createTodoDto);
    }
    async findAll(query) {
        return this.repository.findAll(query);
    }
    async findOne(id) {
        const todo = await this.repository.findOne(id);
        if (!todo) {
            throw new common_1.NotFoundException(error_message_util_1.ErrorMessageUtil.notFound('Todo'));
        }
        return todo;
    }
    async update(id, updateTodoDto) {
        try {
            return await this.repository.update(id, updateTodoDto);
        }
        catch (error) {
            error_message_util_1.ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.repository.remove(id);
        }
        catch (error) {
            error_message_util_1.ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
            throw error;
        }
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todos_repository_1.TodosRepository])
], TodosService);
//# sourceMappingURL=todos.service.js.map