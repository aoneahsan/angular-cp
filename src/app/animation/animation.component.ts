import { Component, OnInit } from '@angular/core';
import { 
  trigger, 
  state, 
  style, 
  transition, 
  animate
 } from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('divState', [
      // ...
      state('normal', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('highlighted', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('* => highlighted', [
        animate('1s')
      ]),
      transition('* => normal', [
        animate('0.5s')
      ]),
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        height: '200px',
      })),
      state('wildState', style({
        backgroundColor: 'blue',
        height: '80px',
      })),
      transition('* => normal',[
        animate('1s', style({
          backgroundColor: 'red',
          opacity: 0.7,
          height: '30px',
        })),
        animate(309)
      ]),
      transition('* => wildState',[
        animate(309)
      ]),
    ])
  ],
})
export class AnimationComponent implements OnInit {

  state = 'normal';

  wildState = 'wildState';

  constructor() { }

  ngOnInit() {
  }

  animate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }

  animate2() {
    this.wildState == 'normal' ? this.wildState = 'wildState' : this.wildState = 'normal';
  }

}
