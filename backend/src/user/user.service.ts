import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private _users: User[] = [];

  get users(): User[] {
    return this._users;
  }

  addUser(user: User): User {
    if (!this.checkUsernameDuplication(user.username)) {
      this._users.push(user);
      return user;
    }
    return undefined;
  }

  getUserById(id: string): User | undefined {
    return this._users.find((user) => user.id === id);
  }

  getUserByUsername(username: string): User | undefined {
    return this._users.find((user) => user.username === username);
  }

  checkUsernameDuplication(username: string): boolean {
    return this._users.some((user) => user.username === username);
  }

  removeUser(id: string): void {
    this._users = this._users.filter((user) => user.id !== id);
  }
}
