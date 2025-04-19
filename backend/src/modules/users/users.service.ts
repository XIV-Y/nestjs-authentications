import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      // 実運用では、パスワードはハッシュ化して保存する
      // 'password123'
      password: '$2b$10$L3elpRmTMfYQuyj2cmt8oOERSWCufm8Ool8CeQLRLkXHYC8.cdoc.',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(userId: number): Promise<User | undefined> {
    return this.users.find((user) => user.userId === userId);
  }
}
