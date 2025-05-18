import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResultService } from '../../shared/services/result.service';
import { Result } from '../../shared/models/result';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterLink],
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

  constructor(
    private resultService: ResultService,
    private authService: AuthService
  ) {
    // Feliratkozás a bejelentkezési állapotra
  
  }

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

    // Ellenőrizzük, hogy be van-e jelentkezve a felhasználó
    const userEmail = this.authService.getCurrentUserEmail();
    if (!userEmail) {
      console.log('A felhasználó nincs bejelentkezve, nem lehet menteni az eredményt');
      return;
    }

    this.isSaving = true;
    
    setTimeout(() => {
      const newResult: Result = {
        owneremail: userEmail,
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