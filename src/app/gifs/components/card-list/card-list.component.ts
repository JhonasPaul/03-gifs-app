import {Component, Input, Output} from '@angular/core';
import {Gif} from '../../interfaces/gif';
import {GifsService} from '../../services/gifs.service';

@Component({
    selector: 'gifs-card-list',
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.css'
})
export class CardListComponent {


  constructor(private gifsService: GifsService) {}

  @Input()
  public gifs: Gif[] = [];



}
