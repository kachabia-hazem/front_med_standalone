import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicament } from '../../model/medicament.model';
import { MedicamentService } from '../services/medicament.service';
import { Classification } from '../../model/classification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medicament',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-medicament.component.html',
  styleUrls: ['./add-medicament.component.css']
})
export class AddMedicamentComponent implements OnInit {
  newMedicament: Medicament = new Medicament();
  classifications: Classification[] = [];
  newIdClass!: number;
  message: string | undefined;
  messageType: 'success' | 'error' | undefined;

  constructor(
    private medicamentService: MedicamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClassifications();
  }

  loadClassifications(): void {
    this.medicamentService.listeClassifications().subscribe({
      next: (classif) => {
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
      },
      error: (err) => {
        console.error('Error loading classifications:', err);
        this.showMessage('Erreur lors du chargement des classifications', 'error');
      }
    });
  }

  addMedicament(): void {
    if (!this.newIdClass) {
      this.showMessage('Veuillez sélectionner une classification', 'error');
      return;
    }

    const selectedClassification = this.classifications.find(
      classif => classif.idClass === this.newIdClass
    );

    if (!selectedClassification) {
      this.showMessage('Classification invalide', 'error');
      return;
    }

    this.newMedicament.classification = selectedClassification;

    this.medicamentService.AjouterMedicament(this.newMedicament).subscribe({
      next: (addedMedicament) => {
        this.showMessage('Médicament ajouté avec succès!', 'success');
        // Rafraîchir la liste des médicaments dans le service
        this.medicamentService.refreshMedicaments();
        setTimeout(() => this.router.navigate(['/medicaments']), 1500);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout:', err);
        this.showMessage('Erreur lors de l\'ajout du médicament', 'error');
      }
    });
  }

  isFormValid(): boolean {
    return !!(
      this.newMedicament.nomMed &&
      this.newMedicament.prixMed !== undefined &&
      this.newMedicament.dateCreation &&
      this.newMedicament.dateExpiration &&
      this.newIdClass
    );
  }

  private showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = undefined, 5000);
  }
}