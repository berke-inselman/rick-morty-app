import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { character } from '../../models/character.model';
import { episode } from '../../models/episode.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit {
  characterId!: number;
  characterDetail: character = new character();
  episode: episode[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.characterId = Number(params.get('id'));
      this.getCharacter();
    });
  }

  getCharacter() {
    this.characterService.getCharacterById(this.characterId).subscribe(
      (response: any) => {
        this.characterDetail = response;
        this.getEpisodes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEpisodes() {
    this.characterDetail.episode.forEach((url) => {
      this.characterService.getEpisode(url).subscribe(
        (response: any) => {
          this.episode.push(response);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
}
