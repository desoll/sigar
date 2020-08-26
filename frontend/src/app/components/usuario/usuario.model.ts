import uuid from 'uuid';
import { Rua } from '../rua/rua.model';
import { Esquadra } from '../esquadra/esquadra.model';
import { Patente } from '../patente/patente.model';

export interface Usuario {
   id: uuid.v4;
   nome: string,
   senha: string,
   telefone: string,
   email: string,
   rua: Rua[],
   esquadra: Esquadra[],
   patente: Patente[]
}