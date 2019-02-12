import { RoundService } from './../../../core/services/round.service';
import { GameService } from './../../../core/services/game.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  AfterContentInit,
  AfterContentChecked,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  switchMap,
  share,
  map,
  tap,
  distinctUntilChanged,
  takeWhile
} from 'rxjs/operators';
import { Game } from '../../../core/models/game.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Round } from '../../../core/models/round.model';
import { MatHorizontalStepper } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PlayerMoves } from '../../../core/models/enums/player-moves.enum';

@Component({
  selector: 'god-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  private currentGameSubject$: BehaviorSubject<Game> = new BehaviorSubject(
    null
  );
  protected currentGame$: Observable<
    Game
  > = this.currentGameSubject$.asObservable();
  protected gameId: number;
  protected currentGame: Game;

  protected roundsPlayed: Round[] = [];

  protected roundReset$: BehaviorSubject<number> = new BehaviorSubject(0);

  protected mainStepper$: BehaviorSubject<
    MatHorizontalStepper
  > = new BehaviorSubject(null);

  protected mainStepper: MatHorizontalStepper;

  PlayerMoves = PlayerMoves;

  @ViewChild(MatHorizontalStepper)
  public set stepper(stepper: MatHorizontalStepper | null) {
    if (!stepper) {
      return;
    }
    this.mainStepper = stepper;
    if (this.isGameOver()) {
      this.mainStepper.selectedIndex = this.mainStepper.steps.length - 1;
    } else {
      this.mainStepper.selectedIndex = this.currentGame.rounds.length;
    }
    this.roundsPlayed = [...this.currentGame.rounds];
    this.cd.detectChanges();
  }

  constructor(
    private route: ActivatedRoute,
    protected gameService: GameService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getGameFromUrl().subscribe(game => {
      this.currentGameSubject$.next(game);
      this.currentGame = game;
    });
  }

  private getGameFromUrl(): Observable<Game> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        this.gameId = +params.get('id');
        return this.gameService.getGameWithPlayersById(this.gameId);
      })
    );
  }

  completeRound(round: Round, roundNumber: number) {
    this.roundsPlayed.push({ player1Move: null, player2Move: null });
    console.log(this.roundsPlayed);

    round.gameId = this.gameId;
    if (round.player1Move === round.player2Move) {
      this.roundReset$.next(roundNumber);
    } else {
      this.gameService
        .createRound(round)
        .pipe(
          tap(game => {
            if (game) {
              this.currentGameSubject$.next(game);
              // this.roundsPlayed.push(game.rounds[game.rounds.length - 1]);

              if (this.isGameOver()) {
                this.mainStepper.selectedIndex =
                  this.mainStepper.steps.length - 1;
              } else {
                this.mainStepper.next();
              }
            }
          })
        )
        .subscribe();
    }
  }

  isGameOver() {
    return (
      this.currentGame.player1RoundsWon >= this.currentGame.roundsToWin ||
      this.currentGame.player2RoundsWon >= this.currentGame.roundsToWin
    );
  }

  getRoundWinner(game: Game, round: Round): string {
    const wasPlayer1Winner = round.winnerMove === round.player1Move;

    return wasPlayer1Winner ? game.player1Name : game.player2Name;
  }
}
