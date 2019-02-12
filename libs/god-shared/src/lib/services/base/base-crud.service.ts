import { ForbiddenError } from './../../error-handling/forbidden-error';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import {
  ServerDown,
  BadInput,
  NotFoundError,
  UnauthorizedError,
  ServerError
} from '../../error-handling';
import { MatSnackBar } from '@angular/material';
import { InternalServerError } from '../../error-handling/internal-server.error';

import { retryBackoff, RetryBackoffConfig } from 'backoff-rxjs';

@Injectable()
export class BaseCrudService<TEntity, TKey> {
  public url: string;

  protected readonly retryConfig: RetryBackoffConfig = {
    initialInterval: 1000,
    maxRetries: 8,
    shouldRetry: (error: ServerError) =>
      !(error instanceof UnauthorizedError || error instanceof ForbiddenError)
  };

  constructor(
    url: string,
    public http: HttpClient,
    protected snack: MatSnackBar
  ) {
    this.url = url;
  }

  public getAll(): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(this.url + '/getAll').pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public get(id: TKey): Observable<TEntity> {
    return this.http.get<TEntity>(this.url + '/get/' + id).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public getWithPagAndSort(
    pageNumber: number,
    pageSize: number,
    columnToSort: string,
    sortDir: string,
    columnsToReturn: string = '*',
    tableToQuery: string = null
  ): Observable<TEntity[]> {
    const fUrl =
      this.url +
      '/getWithPaginationAndFilter?pageNumber=' +
      pageNumber +
      '&pageSize=' +
      pageSize +
      '&columnNameForSorting=' +
      columnToSort +
      '&sortingType=' +
      sortDir +
      '&columnsToReturn=' +
      columnsToReturn +
      (tableToQuery ? '&tableToQuery=' + tableToQuery : '');
    return this.http.get<TEntity[]>(fUrl).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public create(resource: TEntity): Observable<TEntity> {
    return this.http.post<TEntity>(this.url + '/post/', resource).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public update(id: TKey, resource: TEntity): Observable<TEntity> {
    return this.http.put<TEntity>(this.url + '/put/' + id, resource).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public delete(id: TKey) {
    return this.http.delete<TEntity>(this.url + '/delete/' + id).pipe(
      publishLast(),
      refCount(),
      catchError(error => {
        return this.handleError(error);
      }),
      retryBackoff(this.retryConfig)
    );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      if (this.snack) {
        this.snack.open('Error: Server Down', 'Close', { duration: 5000 });
      }

      return throwError(new ServerDown(error));
    }

    if (error.status === 400) {
      this.snack.open('Error: Bad Requests', 'Close', { duration: 5000 });
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      this.snack.open('Error: Not Found', 'Close', { duration: 5000 });

      return throwError(new NotFoundError(error));
    }

    if (error.status === 401) {
      this.snack.open('Error: Unauthorized Request', 'Close', {
        duration: 5000
      });

      return throwError(new UnauthorizedError(error));
    }
    if (error.status === 403) {
      this.snack.open(
        'Error: Forbidden Request, not enough privileges',
        'Close',
        {
          duration: 5000
        }
      );

      return throwError(new UnauthorizedError(error));
    }

    if (error.status === 409) {
      this.snack.open(
        'Error: There was a conflict processing your request, ' + error.message,
        'Close'
      );
    }

    if (error.status === 500) {
      this.snack.open('Error: Internal Server Error', 'Close', {
        duration: 5000
      });

      return throwError(new InternalServerError(error));
    }

    return throwError(new ServerError(error));
  }
}
