import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent  implements OnInit {

  @Input() suggestion: string = '';
  isVisible: boolean = true;

  constructor() {}

  ngOnInit() {}

  // Cerrar sugerencia
  closeSuggestion() {
    this.isVisible = false;
  }
}
