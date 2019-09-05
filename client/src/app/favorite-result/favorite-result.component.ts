import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-result',
  templateUrl: './favorite-result.component.html',
  styleUrls: ['./favorite-result.component.scss']
})
export class FavoriteResultComponent implements OnInit {
  @Input() favorites: any[];
  constructor() { }

  ngOnInit() {
  }

}
