import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Classification } from '../../model/classification.model';

@Component({
  selector: 'app-update-classification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-classification.component.html',

})
export class UpdateClassificationComponent {
  @Input() 
  classification: Classification = {
    idClass: 0,
    nomClass: '',
    descriptionClass: ''
  };

  @Output() 
  classificationUpdated = new EventEmitter<Classification>();
  
  @Input() 
  modeAjout: boolean = true;

  saveClassification(): void {
    // Validation simple avant émission
    if (this.classification.nomClass && this.classification.nomClass.trim() !== '') {
      this.classificationUpdated.emit({
        ...this.classification,
        nomClass: this.classification.nomClass.trim()
      });
    }
  }
}