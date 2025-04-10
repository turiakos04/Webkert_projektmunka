import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { OrdinalPipe } from '../../shared/pipes/ordinal.pipe';
import { CommonModule } from '@angular/common';

interface PlayerResult {
  name: string;
  reactionTime: number;
  date: string;
  rank?: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    OrdinalPipe,
    CommonModule
  ]
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: PlayerResult[] = [
    { name: 'Kovács Anna', reactionTime: 265, date: '2025-04-09' },
    { name: 'Szabó Béla', reactionTime: 280, date: '2025-04-08' },
    { name: 'Tóth Tamás', reactionTime: 300, date: '2025-04-07' },
    { name: 'Nagy László', reactionTime: 210, date: '2025-04-06' },
    { name: 'Farkas Júlia', reactionTime: 245, date: '2025-04-05' },
    { name: 'Péter Zoltán', reactionTime: 330, date: '2025-04-04' },
    { name: 'Varga Eszter', reactionTime: 210, date: '2025-04-03' },
    { name: 'Bíró Róbert', reactionTime: 320, date: '2025-04-02' },
    { name: 'Horváth Krisztina', reactionTime: 190, date: '2025-04-01' },
    { name: 'Kiss Gábor', reactionTime: 310, date: '2025-03-31' },
    { name: 'Mészáros Péter', reactionTime: 255, date: '2025-03-30' },
    { name: 'Takács Fanni', reactionTime: 220, date: '2025-03-29' },
    { name: 'Sárközi Viktor', reactionTime: 305, date: '2025-03-28' },
    { name: 'Szabó Emese', reactionTime: 265, date: '2025-03-27' },
    { name: 'Czene Ádám', reactionTime: 275, date: '2025-03-26' },
  ];
  

  displayedColumns: string[] = ['rank', 'name', 'reactionTime', 'date'];

  dataSource = new MatTableDataSource(this.leaderboardData);

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  ngOnInit() {
    this.leaderboardData.sort((a, b) => a.reactionTime - b.reactionTime);

    this.leaderboardData.forEach((player, index) => {
      player.rank = index + 1;
    });

    this.dataSource = new MatTableDataSource(this.leaderboardData);

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
