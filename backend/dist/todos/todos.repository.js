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
exports.TodosRepository = void 0;
const common_1 = require("@nestjs/common");
const query_util_1 = require("../common/query.util");
let TodosRepository = class TodosRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.todo.create({ data });
    }
    async findAll(query) {
        const { where, orderBy, skip, take, page, limit } = (0, query_util_1.buildPrismaQuery)(query, [
            'title',
            'description',
        ]);
        const [items, total] = await Promise.all([
            this.prisma.todo.findMany({
                where,
                orderBy,
                skip,
                take,
            }),
            this.prisma.todo.count({ where }),
        ]);
        return {
            items,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        return this.prisma.todo.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return this.prisma.todo.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.todo.delete({
            where: { id },
        });
    }
};
exports.TodosRepository = TodosRepository;
exports.TodosRepository = TodosRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], TodosRepository);
//# sourceMappingURL=todos.repository.js.map