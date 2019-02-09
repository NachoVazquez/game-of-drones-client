import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '@god/god-shared';
import { Round } from '../models/round.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class RoundService extends BaseCrudService<Round, number> {
  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'rounds', httpClient, snack);
  }
}
