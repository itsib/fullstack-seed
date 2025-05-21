import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HealthModule,
    UserModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
    ]),
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class ApiModule {}
