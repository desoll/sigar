import uuid from 'uuid';
import { Rua } from '../rua/rua.model';

export interface Esquadra {
  id: uuid.v4,
  designacao: string,
  rua: Rua[]
}