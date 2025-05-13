import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Medicament } from '../../model/medicament.model';
import { Classification } from '../../model/classification.model';
import { MedicamentService } from '../services/medicament.service';

@Component({
  selector: 'app-recherche-par-classification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-classification.component.html',

})
export class RechercheParClassificationComponent implements OnInit {
  medicaments: Medicament[] = []; // Initialisé comme tableau vide
  IdClassification!: number;
  classifications: Classification[] = []; // Initialisé comme tableau vide
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private medicamentService: MedicamentService) {}

  ngOnInit(): void {
    this.loadClassifications();
  }

  loadClassifications(): void {
    this.isLoading = true;
    this.medicamentService.listeClassifications().subscribe({
      next: (classif) => {
        // Gestion des différents formats de réponse
        if (classif && (classif as any)._embedded) {
          this.classifications = (classif as any)._embedded.classifications;
        } else if (Array.isArray(classif)) {
          this.classifications = classif;
        } else {
          this.classifications = [{
            idClass: (classif as any).idClass,
            nomClass: (classif as any).nomClass,
            descriptionClass: (classif as any).descriptionClass
          }];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading classifications:', err);
        this.errorMessage = 'Erreur lors du chargement des classifications';
        this.isLoading = false;
      }
    });
  }

  onChange(): void {
    if (!this.IdClassification) {
      this.medicaments = [];
      return;
    }

    this.isLoading = true;
    this.medicamentService.RechercheParClassification(this.IdClassification).subscribe({
      next: (meds) => {
        this.medicaments = meds || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching medicaments:', err);
        this.errorMessage = 'Erreur lors de la recherche des médicaments';
        this.medicaments = [];
        this.isLoading = false;
      }
    });
  }
}