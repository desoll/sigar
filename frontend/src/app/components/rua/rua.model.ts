import uuid from 'uuid';
import { Bairro } from '../bairro/bairro.model';

export interface Rua{
  id: uuid.v4,
  designacao: string,
  bairro: Bairro[]
}