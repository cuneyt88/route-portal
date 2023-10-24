import { Component, Output, EventEmitter } from '@angular/core';
import { RotaServiceService } from '../rota-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private rotaService: RotaServiceService) {};

  onCategoryClick(category: string) {
    this.rotaService.setSelectedCategory(category);
  }
}
