import { Classification } from './classification.model';

export class Medicament {
  idMed!: number;
  nomMed!: string;
  descMed!: string;
  marqueMed!: string;
  url!: string;
  prixMed!: number;
  code!: number;
  dateCreation!: Date;
  dateExpiration!: Date;
  classification!: Classification;
}
