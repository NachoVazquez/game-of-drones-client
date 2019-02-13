import { GlobalStatistics } from './../../../core/models/global-statistics.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../core/services/statistics.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Player } from '@angular/core/src/render3/interfaces/player';
import {
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap
} from 'rxjs/operators';
import { PlayerStatistics } from '../../../core/models/player-stats.model';

@Component({
  selector: 'god-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  searchForm: FormGroup;
  searchField: FormControl;

  playerStats$: Observable<PlayerStatistics>;

  globalStatistics$: Observable<GlobalStatistics>;

  constructor(
    protected statisticsService: StatisticsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({ search: this.searchField });

    this.globalStatistics$ = this.statisticsService.getGlobalStatistics();
    this.playerStats$ = this.searchForPlayer$();
  }

  protected searchForPlayer$(): Observable<PlayerStatistics> {
    return this.searchField.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      tap(player => {
        console.log(player);
      }),
      switchMap(playerName => {
        return this.statisticsService.getPlayerStatistics(playerName);
      })
    );
  }

  // const carSearch$ = fromEvent(carSearch, 'input').pipe(
  //   map(event => event.target.value),
  //   filter(query => query),
  //   distinctUntilChanged(),
  //   debounceTime(1000),
  //   tap(query => console.log(`About to make an API call with query: ${query}`)),
  //   switchMap(getCars)
  // );
}
