import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreKeeperComponent } from './score-keeper.component';

describe('ScoreKeeperComponent', () => {
  let component: ScoreKeeperComponent;
  let fixture: ComponentFixture<ScoreKeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreKeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
