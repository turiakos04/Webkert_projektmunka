import { Injectable } from '@angular/core';
import { Result } from '../../shared/models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private readonly STORAGE_KEY = 'reactionGameResults';

  private loadResults(): Result[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private saveResults(results: Result[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(results));
  }

  addResult(result: Result) {
    const results = this.loadResults();
    results.push(result);
    this.saveResults(results);
  }

  getResults(): Result[] {
    return this.loadResults();
  }
}
