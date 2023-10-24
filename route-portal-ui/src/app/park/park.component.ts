import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent{

  constructor() { }
  map!: Map;
  onResized(event: any) {

    this.map.updateSize();
  }

}
