import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { character } from '../../models/character.model';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  characters: character[] = [];
  page: number = 1;
  totalSize: number = 0;
  status: string[] = ['alive', 'dead', 'unknown'];
  genders: string[] = ['male', 'female', 'genderless', 'unknown'];

  statusControl = new FormControl();
  genderControl = new FormControl();
  selectedStatus: string = '';
  selectedGender: string = '';
  name: string = '';
  species: string = '';

  constructor(
    private characterService: CharacterService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    if (this.genderControl.value) {
      this.selectedGender = String(this.genderControl.value);
    }

    if (this.statusControl.value) {
      this.selectedStatus = String(this.statusControl.value);
    }

    this.characterService
      .getCharacters(
        this.page,
        this.name,
        this.selectedStatus,
        this.selectedGender,
        this.species
      )
      .subscribe(
        (response: any) => {
          this.characters = response.results;
          this.totalSize = response.info.count;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error(error);
          this._snackBar.open(
            'Hatalı bir değer girdiniz veya aradığnız sonuç bulunamadı...',
            'Kapat'
          );
        }
      );
  }

  pageChanged(event: any) {
    this.page = event.pageIndex + 1;
    this.getCharacters();
    console.log('page changed..');
  }

  filter() {
    this.resetPaginator();
  }

  clear() {
    this.selectedStatus = '';
    this.selectedGender = '';
    this.name = '';
    this.species = '';
    this.genderControl = new FormControl();
    this.statusControl = new FormControl();
    this.resetPaginator();
  }

  resetPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 20;
      this.pageChanged({ pageIndex: this.paginator.pageIndex });
    }
  }
}
