import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RotaServiceService {

  private selectedCategory = new BehaviorSubject<string>(''); // Varsayılan olarak boş bir kategori

  selectedCategory$ = this.selectedCategory.asObservable();

  setSelectedCategory(category: string) {
    this.selectedCategory.next(category);
  }
}
