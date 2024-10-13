import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { JwtService } from '../auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor(private jwtService: JwtService) {}

  connect(): void {
    this.socket = io(
      `http://localhost:3000?token=${this.jwtService.getToken()}`
    );
  }

  onEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });

      return () => this.socket.off(eventName);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
