import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
@Injectable()
export class UserService {
  private users: Array<User> = [
    {
      id: 1,
      name: 'mary',
      email: 'mary@gmail.com',
      password: '123456',
      completeName: 'Mary Jesus',
      entryDate: new Date(),
    },
  ];
  public cria(user: User): User {
    this.users.push(user);
    return user;
  }

  public findUserByName(userName: string): User {
    return this.users.find((user) => user.name == userName);
  }
}
