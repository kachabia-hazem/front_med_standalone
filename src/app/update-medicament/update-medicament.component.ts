import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentService } from '../services/medicament.service';
import { Medicament } from '../../model/medicament.model';
import { Classification } from '../../model/classification.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-medicament',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-medicament.component.html',
})
export class UpdateMedicamentComponent implements OnInit {
  currentMedicament: Medicament = new Medicament();
  classifications: Classification[] = [];
  updatedClassId!: number;
  message: string = '';
  messageType: 'success' | 'error' | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private medicamentService: MedicamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClassifications();
    this.loadMedicament();
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
        this.message = 'Erreur lors du chargement des classifications';
        this.messageType = 'error';
      }
    });
  }

  loadMedicament(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.medicamentService.consulterMedicament(id).subscribe({
      next: (med) => {
        this.currentMedicament = med;
        this.updatedClassId = this.currentMedicament.classification?.idClass!;
      },
      error: (err) => {
        console.error('Error loading medicament:', err);
        this.message = 'Erreur lors du chargement du médicament';
        this.messageType = 'error';
      }
    });
  }

  updateMedicament(): void {
    // Conversion en nombre au cas où la valeur serait une chaîne
    const selectedClass = this.classifications.find(c => c.idClass === +this.updatedClassId);
    if (!selectedClass) {
      this.message = 'Veuillez sélectionner une classification valide';
      this.messageType = 'error';
      return;
    }

    this.currentMedicament.classification = selectedClass;

    this.medicamentService.updateMedicament(this.currentMedicament).subscribe({
      next: () => {
        this.message = 'Médicament mis à jour avec succès';
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/medicaments']), 1500);
      },
      error: (err) => {
        console.error('Error updating medicament:', err);
        this.message = 'Erreur lors de la mise à jour du médicament';
        this.messageType = 'error';
      }
    });
  }

  isFormValid(): boolean {
    return !!(
      this.currentMedicament.nomMed &&
      this.currentMedicament.prixMed !== undefined &&
      this.currentMedicament.dateCreation &&
      this.currentMedicament.dateExpiration &&
      this.updatedClassId
    );
  }

  trackByClassId(index: number, item: Classification): number {
    return item.idClass;
  }
}
