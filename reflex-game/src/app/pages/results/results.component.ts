import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../shared/services/result.service';
import { Result } from '../../shared/models/result';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: Result[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit() {
    this.results = this.resultService.getResults();
  }

  get averageTime(): number {
    if (this.results.length === 0) return 0;
    const total = this.results.reduce((sum, r) => sum + r.time, 0);
    return Math.round(total / this.results.length);
  }

  displayedColumns: string[] = ['date', 'time'];
}
