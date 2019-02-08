import { GameService } from './../../../core/services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'god-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  protected gameForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected gameService: GameService
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

  createGame(){
      
  }
}
