import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validate(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async isUserValid(user: IUser, plainPassword: string): Promise<boolean> {
    if (!user.emailConfirmed) {
      return false;
    }

    const isPasswordValid = await this.validate(plainPassword, user.password);
    return isPasswordValid;
  }
}
