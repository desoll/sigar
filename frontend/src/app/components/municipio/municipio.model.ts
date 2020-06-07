import uuid from 'uuid';
import { Provincia } from '../provincia/provincia.model';
import { Identifiers } from '@angular/compiler';

export interface Municipio{
  id: uuid.v4
  designacao: string,
  provincia: Provincia[]
}