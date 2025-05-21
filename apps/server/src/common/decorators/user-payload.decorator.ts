import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '@app/types';

export const UserPayload = createParamDecorator((property: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
  const payload = ctx.switchToHttp().getRequest()!.user as JwtPayload;

  if (!property) {
    return { ...payload };
  }

  return payload[property];
});