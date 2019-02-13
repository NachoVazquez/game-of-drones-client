import { GlobalStatistics } from './../../../core/models/global-statistics.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../core/services/statistics.service';

@Component({
  selector: 'god-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  globalStatistics$: Observable<GlobalStatistics>;

  constructor(protected statisticsService: StatisticsService) {}

  ngOnInit() {
    this.globalStatistics$ = this.statisticsService.getGlobalStatistics();
  }
}
