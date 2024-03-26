export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  password: string;
  readonly profilePicture?: string;
  emailConfirmed?: boolean;
  emailToken: string;
}
