import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'god-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: 'email',
      url: '/dashboard'
    },
    {
      id: 'comment',
      title: 'Comments',
      type: 'item',
      icon: 'email',
      url: '/comments'
    },
    {
      id: 'articles',
      title: 'Articles',
      type: 'item',
      icon: 'email',
      url: '/articles'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      type: 'item',
      icon: 'email',
      url: '/marketing'
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {}
}