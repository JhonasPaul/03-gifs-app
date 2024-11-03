import { Component } from '@angular/core';
import {Gif} from '../interfaces/gif';
import {GifsService} from '../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {


  constructor(private gifsService: GifsService) {
  }

  get gifList():Gif[] {
    return this.gifsService.gifsList;
  }
}
