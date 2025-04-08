import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule], // 👈 EZ A FONTOS RÉSZ
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  state: 'waiting' | 'ready' | 'active' | 'result' | 'tooSoon' = 'waiting';
  startTime!: number;
  reactionTime!: number;
  timeoutId: any;

  startGame() {
    this.state = 'ready';
    const delay = Math.random() * 4000 + 1000;

    this.timeoutId = setTimeout(() => {
      this.state = 'active';
      this.startTime = new Date().getTime();
    }, delay);
  }

  onBoxClick() {
    const now = new Date().getTime();

    if (this.state === 'ready') {
      clearTimeout(this.timeoutId);
      this.state = 'tooSoon';
    }

    if (this.state === 'active') {
      this.reactionTime = now - this.startTime;
      this.state = 'result';
    }
  }
}
