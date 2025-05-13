import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Classification } from '../../model/classification.model';
import { MedicamentService } from '../services/medicament.service';
import { UpdateClassificationComponent } from '../update-classification/update-classification.component';

@Component({
  selector: 'app-liste-classifications',
  standalone: true,
  imports: [CommonModule, FormsModule, UpdateClassificationComponent],
  templateUrl: './liste-classifications.component.html'
})
export class ListeClassificationsComponent implements OnInit {
  classifications: Classification[] = [];
  updatedClassification: Classification = { idClass: 0, nomClass: '', descriptionClass: '' };
  ajout: boolean = true;

  constructor(private medicamentService: MedicamentService) {}

  ngOnInit(): void {
    this.chargerClassifications();
  }

  chargerClassifications(): void {
    this.medicamentService.listeClassifications().subscribe({
      next: (classif) => {
        this.classifications = classif;
        console.log('Classifications chargées:', this.classifications);
      },
      error: (err) => {
        console.error('Erreur chargement classifications:', err);
        this.classifications = [];
      }
    });
  }

  classificationUpdated(classification: Classification): void {
    console.log("Classification updated event", classification);
    this.medicamentService.ajouterClassification(classification).subscribe({
      next: () => {
        this.chargerClassifications();
        this.ajout = true;
      },
      error: (err) => {
        console.error('Erreur mise à jour classification:', err);
      }
    });
  }

  updateClassification(classification: Classification): void {
    this.updatedClassification = { ...classification };
    this.ajout = false;
  }

  trackById(index: number, item: Classification): number {
    return item.idClass;
  }
}
