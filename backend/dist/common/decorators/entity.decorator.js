"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MESSAGE_KEY = exports.Entity = exports.ENTITY_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ENTITY_KEY = 'entity';
const Entity = (name) => (0, common_1.SetMetadata)(exports.ENTITY_KEY, name);
exports.Entity = Entity;
exports.MESSAGE_KEY = 'message';
const Message = (msg) => (0, common_1.SetMetadata)(exports.MESSAGE_KEY, msg);
exports.Message = Message;
//# sourceMappingURL=entity.decorator.js.map