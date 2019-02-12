import { GameService } from './../../../core/services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterSandbox } from '../../../core/facades/router-sandbox';

@Component({
  selector: 'god-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  protected gameForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected gameService: GameService,
    protected routerFacade: RouterSandbox
  ) {}

  ngOnInit() {
    this.loadGameForm();
  }

  private loadGameForm() {
    this.gameForm = this.formBuilder.group({
      player1Name: ['', Validators.required],
      player2Name: ['', Validators.required]
    });
  }

  createGame() {
    this.gameService
      .createGameByPlayersNames({
        player1Name: this.gameForm.get('player1Name').value,
        player2Name: this.gameForm.get('player2Name').value
      })
      .subscribe(game => {
        if (game) {
          this.routerFacade.navigate(['game', game.id.toString()]);
        }
      });
  }
}
