import { UserRole } from '../../api/user/user.entity';

export interface JwtPayload {
  sub: string;
  login: string;
  role: UserRole;
}
