import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private _dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  saveRecipes() {
    this._dataStorageService.saveRecipes().subscribe();
  }

  fetchRecipes() {
    this._dataStorageService.fetchRecipes().subscribe();
  }

}
