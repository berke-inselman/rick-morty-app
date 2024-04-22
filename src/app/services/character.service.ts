import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCharacters(
    page: number,
    name: string,
    status: string,
    gender: string,
    species: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/character?name=${name}&status=${status}&gender=${gender}&species=${species}&page=${page}`
    );
  }

  getCharacterById(id: number) {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  getEpisode(url: string) {
    return this.http.get(url);
  }
}
