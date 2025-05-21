import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { JwtPayload } from '@app/types';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '@app/common/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this._extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('app.jwt.secret'),
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private _extractToken(request: FastifyRequest) {
    let token = (request.query as any)?.token as string | undefined;
    if (!token) {
      const [type, _token] = (request.headers as any).authorization?.split(' ') ?? [];
      token = type === 'Bearer' ? _token : undefined;
    }
    return token;
  }
}
