import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultService } from '../../shared/services/result.service';
import { Result } from '../../shared/models/result';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  state: 'waiting' | 'ready' | 'active' | 'result' | 'tooSoon' = 'waiting';
  startTime!: number;
  reactionTime!: number;
  timeoutId: any;
  resultSaved: boolean = false;
  isSaving: boolean = false;
  saveMessageShown: boolean = false;

  constructor(private resultService: ResultService) {}

  startGame() {
    this.state = 'ready';
    this.resultSaved = false;
    this.saveMessageShown = false;
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

  saveResult() {
    if (this.resultSaved) return;

    this.isSaving = true;

    setTimeout(() => {
      const newResult: Result = {
        owneremail: 'user@email.com',
        time: this.reactionTime,
        date: new Date().toISOString().slice(0, 10)
      };

      this.resultService.addResult(newResult);
      this.resultSaved = true;
      this.isSaving = false;
      this.saveMessageShown = true;
      console.log('Mentett eredmény:', newResult);
    }, 1500);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.onBoxClick();
    }
  }
}
