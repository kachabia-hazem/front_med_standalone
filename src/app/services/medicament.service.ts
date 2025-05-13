import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Medicament } from '../../model/medicament.model';
import { Classification } from '../../model/classification.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  apiURL: string = 'http://localhost:8080/medicaments/api';
  apiURLClass: string = 'http://localhost:8080/medicaments/api/class';

  constructor(private http: HttpClient) { }

  // Liste des médicaments
  ListerMedicaments(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(this.apiURL).pipe(
      tap(response => console.log('Liste des médicaments:', response)),
      catchError(error => {
        console.error('Erreur liste médicaments:', error);
        return throwError(() => error);
      })
    );
  }

  // Ajouter un médicament
  AjouterMedicament(medicament: Medicament): Observable<Medicament> {
    return this.http.post<Medicament>(this.apiURL, medicament, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur ajout médicament:', error);
        return throwError(() => error);
      })
    );
  }

  // Supprimer un médicament
  supprimerMedicament(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur suppression médicament:', error);
        return throwError(() => error);
      })
    );
  }

  // Consulter un médicament
  consulterMedicament(id: number): Observable<Medicament> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Medicament>(url).pipe(
      catchError(error => {
        console.error('Erreur consultation médicament:', error);
        return throwError(() => error);
      })
    );
  }

  // Mettre à jour un médicament
  updateMedicament(med: Medicament): Observable<Medicament> {
    return this.http.put<Medicament>(this.apiURL, med, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur mise à jour médicament:', error);
        return throwError(() => error);
      })
    );
  }

  // Liste des classifications
  listeClassifications(): Observable<Classification[]> {
    return this.http.get<Classification[]>(this.apiURLClass).pipe(
      tap(response => console.log('Liste des classifications:', response)),
      catchError(error => {
        console.error('Erreur liste classifications:', error);
        return throwError(() => error);
      })
    );
  }

  // Consulter une classification
  consulterClassification(id: number): Observable<Classification> {
    const url = `${this.apiURLClass}/${id}`;
    return this.http.get<Classification>(url).pipe(
      catchError(error => {
        console.error('Erreur consultation classification:', error);
        return throwError(() => error);
      })
    );
  }

  // Recherche par classification
  RechercheParClassification(idClass: number): Observable<Medicament[]> {
    const url = `${this.apiURL}/medscat/${idClass}`;
    return this.http.get<Medicament[]>(url).pipe(
      catchError(error => {
        console.error('Erreur recherche par classification:', error);
        return throwError(() => error);
      })
    );
  }

  // Recherche par nom
  rechercherParNom(nom: string): Observable<Medicament[]> {
    const url = `${this.apiURL}/medsNom/${nom}`;
    return this.http.get<Medicament[]>(url).pipe(
      catchError(error => {
        console.error('Erreur recherche par nom:', error);
        return throwError(() => error);
      })
    );
  }

  // Ajouter une classification
  ajouterClassification(classification: Classification): Observable<Classification> {
    return this.http.post<Classification>(this.apiURLClass, classification, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur ajout classification:', error);
        return throwError(() => error);
      })
    );
  }

  private medicamentsSubject = new BehaviorSubject<Medicament[]>([]);
  medicaments$ = this.medicamentsSubject.asObservable();

  refreshMedicaments(): void {
    this.ListerMedicaments().subscribe(meds => {
      this.medicamentsSubject.next(meds);
    });
  }
}
