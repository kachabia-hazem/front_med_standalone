import { Routes } from '@angular/router';
import { MedicamentsComponent } from './medicaments/medicaments.component';
import { AddMedicamentComponent } from './add-medicament/add-medicament.component';
import { UpdateMedicamentComponent } from './update-medicament/update-medicament.component';
import { RechercheParClassificationComponent } from './recherche-par-classification/recherche-par-classification.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeClassificationsComponent } from './liste-classifications/liste-classifications.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { medicamentGuard } from './medicament.guard';



export const routes: Routes = [
    {path:"forbidden", component:ForbiddenComponent},
    {path:"medicaments", component: MedicamentsComponent},
    {path:"add-medicament", component:AddMedicamentComponent, canActivate:[medicamentGuard]},
    {path:"", redirectTo:"medicaments", pathMatch:"full"},
    {path:"update-medicament/:id", component:UpdateMedicamentComponent},
    {path:"rechercheParClassification", component:RechercheParClassificationComponent},
    {path:"rechercheParNom", component:RechercheParNomComponent},
    {path:"listeClassifications", component:ListeClassificationsComponent},
    {path:"login", component:LoginComponent}
    
];
