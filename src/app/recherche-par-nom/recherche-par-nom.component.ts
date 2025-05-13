import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Medicament } from '../../model/medicament.model';
import { MedicamentService } from '../services/medicament.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {
  nomMedicament!: string;
  medicaments: Medicament[] = [];
  allMedicaments: Medicament[] = [];
  searchTerm!: string;

  constructor(private medicamentService: MedicamentService) {}

  ngOnInit(): void {
    this.medicamentService.ListerMedicaments().subscribe(meds => {
      console.log(meds);
      this.medicaments = meds;
      this.allMedicaments = meds;
    });
  }

  recherchermeds() {
    if(this.nomMedicament) {
      this.medicamentService.rechercherParNom(this.nomMedicament).subscribe(meds => {
        console.log(meds);
        this.medicaments = meds;
      });
    } else {
      this.medicamentService.ListerMedicaments().subscribe(meds => {
        console.log(meds);
        this.medicaments = meds;
      });
    }
  }

  onDelete(medicament: Medicament) {
    // Your delete implementation
    this.medicamentService.supprimerMedicament(medicament.idMed).subscribe(() => {
      this.medicaments = this.medicaments.filter(m => m.idMed !== medicament.idMed);
    });
  }

  onKeyup(filtrerText: string) {
    this.medicaments = this.allMedicaments.filter(item =>
      item.nomMed.toLowerCase().includes(filtrerText.toLowerCase())
    );
  }
}