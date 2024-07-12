import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { STRATEGY_JWT_AUTH } from './constant';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_EXPIRES_IN, JWT_SECRET } from 'src/core/environment';
import { UserModule } from '../user/user.module';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_AUTH }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthStrategy, JwtRefreshStrategy],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
