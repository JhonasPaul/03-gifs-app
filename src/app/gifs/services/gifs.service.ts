import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gif, SearchResonse} from '../interfaces/gif';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  public gifsList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apikey: string = 'hfF0UG6RTdcBJjK6sJJIISxjt5C6He4Z';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  get tagsHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    /*logica para filtrar repetidos*/
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    // /*agrega el elemento al principio del array*/
    this._tagHistory.unshift(tag);
    /*solo mostrara 10 elemenots del array*/
    this._tagHistory = this._tagHistory.slice(0.10);
    this.sabeLocalStorage()
  }


  /*guardar o leer en el localStorage*/
  private sabeLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  /*cargar localStoreage*/
  private loadLocalStorage(): void {
    /*si no hay data*/
    if (!localStorage.getItem('history')) {
      /*no  hace nada*/
      return;
    }
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagHistory.length === 0) {
      return;
    }
    /*carga el primer elemento del localStorage almacenado*/
    this.searchTag(this._tagHistory[0]);
  }

  /*recibe  de SearchBoxComponent*/
  public searchTag(tag: string): void {
    if (tag.length === 0) {
      return;
    }
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', 10)
      .set('q', tag)
    this.organizeHistory(tag);
    this.http.get<SearchResonse>(`${this.serviceUrl}/search?`, {params})
      .subscribe(response => {
        this.gifsList = response.data;
      })
  }
}
