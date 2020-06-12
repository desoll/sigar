import uuid from 'uuid';
import { Provincia } from '../provincia/provincia.model';

export interface Municipio{
  id: uuid.v4
  designacao: string,
  provincia: Provincia[]
}