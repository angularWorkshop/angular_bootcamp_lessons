import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly mockUsers: User[] = [
    { id: 1, name: 'Anna Petrova', email: 'anna@example.com', role: 'admin' },
    { id: 2, name: 'Boris Ivanov', email: 'boris@example.com', role: 'user' },
    { id: 3, name: 'Clara Sidorova', email: 'clara@example.com', role: 'editor' },
    { id: 4, name: 'Denis Kuznetsov', email: 'denis@example.com', role: 'admin' },
    { id: 5, name: 'Elena Volkova', email: 'elena@example.com', role: 'user' },
  ];

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }
}
