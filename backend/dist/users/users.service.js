"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = require("../../generated/prisma");
const error_message_util_1 = require("../common/error-message.util");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await this.repository.create({
                ...userData,
                password: hashedPassword,
            });
            const { password: _p, refreshToken: _rt, ...user } = result;
            return user;
        }
        catch (error) {
            if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException(error_message_util_1.ErrorMessageUtil.conflictEntity('Email'));
            }
            throw error;
        }
    }
    async findAll(query) {
        const result = await this.repository.findAll(query);
        return {
            items: result.items.map((u) => {
                const { password: _p, refreshToken: _rt, ...user } = u;
                return user;
            }),
            meta: result.meta,
        };
    }
    async findOne(id) {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(error_message_util_1.ErrorMessageUtil.notFound('User'));
        }
        const { password: _p, refreshToken: _rt, ...result } = user;
        return result;
    }
    async findById(id) {
        return this.repository.findOne(id);
    }
    async findByEmail(email) {
        return this.repository.findByEmail(email);
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.repository.update(id, updateUserDto);
            const { password: _p, refreshToken: _rt, ...result } = user;
            return result;
        }
        catch (error) {
            error_message_util_1.ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'User');
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.repository.remove(id);
        }
        catch (error) {
            error_message_util_1.ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'User');
            throw error;
        }
    }
    async updateRefreshToken(userId, refreshToken) {
        let hashedToken = null;
        if (refreshToken) {
            hashedToken = await bcrypt.hash(refreshToken, 10);
        }
        return await this.repository.update(userId, { refreshToken: hashedToken });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map