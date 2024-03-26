import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthHelper } from '../user-helpers/auth.helper';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let authHelper: AuthHelper;

  beforeEach(() => {
    prismaService = new PrismaService();
    jwtService = new JwtService({});
    authHelper = new AuthHelper();
    userService = new UserService(prismaService, jwtService, authHelper);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        profilePicture: 'default.jpg',
        emailConfirmed: false,
        emailToken: 'token123',
      };

      // Mock no existing user with same email
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null);

      // Mock hashed password

      jest
        .spyOn(authHelper, 'hashPassword')
        .mockResolvedValueOnce('hashedPassword');

      // Mock creating user
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValueOnce(mockUserData);

      const result = await userService.createUser(mockUserData);

      expect(result).toEqual(mockUserData);
    });

    it('should throw ConflictException if user with same email already exists', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        profilePicture: 'default.jpg', // Optional property with default value
        emailConfirmed: false, // Optional property with default value
        emailToken: 'token123', // Optional property with default value
      };

      // Mock existing user with same email
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce({ email: 'test@example.com' });

      await expect(userService.createUser(mockUserData)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  // Similarly, you can write tests for other methods like login, findOneById, confirmEmail
});
