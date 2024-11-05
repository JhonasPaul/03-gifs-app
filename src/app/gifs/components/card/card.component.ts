import {Component, Input, OnInit} from '@angular/core';
import {Gif} from '../../interfaces/gif';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {

  @Input()
  public gif!: Gif;

  /*ngOnInit () {
    if (!this.gif) {
    throw new Error('error');
    }
  }*/
}
