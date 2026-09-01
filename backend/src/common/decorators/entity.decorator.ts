import { SetMetadata } from '@nestjs/common';

export const ENTITY_KEY = 'entity';
export const Entity = (name: string) => SetMetadata(ENTITY_KEY, name);

export const MESSAGE_KEY = 'message';
export const Message = (msg: string) => SetMetadata(MESSAGE_KEY, msg);
