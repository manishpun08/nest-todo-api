import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Entity, Message } from '../common/decorators/entity.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { User } from '../../generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Entity('User')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @Entity('User')
  @Message('User logged in successfully')
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(200)
  @Message('User logged out successfully')
  async logout(@Request() req: { user: { userId: string } }) {
    await this.authService.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(200)
  @Message('Tokens refreshed successfully')
  async refreshTokens(
    @Request() req: { user: { sub: string; refreshToken: string } },
  ) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
