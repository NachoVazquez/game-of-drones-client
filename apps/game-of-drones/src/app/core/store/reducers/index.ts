import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';
import { environment } from '../../../../environments/environment';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

/**
 * Interface defining the State of the URL
 *
 * @export
 * @interface RouterStateUrl
 */
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    // Only return an object including the URL and query params
    // instead of the entire snapshot
    return { url, queryParams };
  }
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
};

export const metaReducers: Array<MetaReducer<State>> = !environment.production
  ? [storeFreeze]
  : [];

//#region Selectors

//#endregion
