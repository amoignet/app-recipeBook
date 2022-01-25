import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  collapsed = true;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
