import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/store/reducers';
import * as routerActions from '../store/actions/router.actions';

@Injectable({ providedIn: 'root' })
export class RouterSandbox {
  constructor(protected store$: Store<fromRoot.State>) {}

  public navigate(routes: string[]): void {
    this.store$.dispatch(new routerActions.GoAction({ path: routes }));
  }
}
