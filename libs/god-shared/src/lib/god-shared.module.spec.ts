import { async, TestBed } from '@angular/core/testing';
import { GodSharedModule } from './god-shared.module';

describe('GodSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GodSharedModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GodSharedModule).toBeDefined();
  });
});
