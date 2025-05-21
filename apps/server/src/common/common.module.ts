import { Global, Module } from '@nestjs/common';
import { AuthGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  exports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CommonModule {}
