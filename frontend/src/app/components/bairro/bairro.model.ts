import * as uuid from 'uuid';
import { Municipio } from '../municipio/municipio.model';

export interface Bairro {
  id:uuid.v4,
  designacao: string,
  municipio: Municipio[]
}