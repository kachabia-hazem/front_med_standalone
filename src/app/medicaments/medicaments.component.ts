import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Medicament } from '../../model/medicament.model';
import { MedicamentService } from '../services/medicament.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-medicaments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  medicaments!: Medicament[];

  constructor(private medicamentService: MedicamentService,public authService: AuthService) {
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    if (isloggedin != "true" || !loggedUser)
      this.authService.logout();
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    
  }

  ngOnInit(): void {
    this.medicamentService.ListerMedicaments().subscribe(meds => {
      console.log(meds);
      this.medicaments = meds;
    });
  }

  chargerMedicaments() {
    this.medicamentService.ListerMedicaments().subscribe(meds => {
      console.log(meds);
      this.medicaments = meds;
    });
  }

  supprimerMedicament(med: Medicament) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.medicamentService.supprimerMedicament(med.idMed).subscribe(() => {
        console.log("Medicament supprimé");
        this.chargerMedicaments();
      });
    }
  }
}
