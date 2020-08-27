import uuid from 'uuid';
import { Rua } from '../rua/rua.model';
import { Esquadra } from '../esquadra/esquadra.model';
import { Patente } from '../patente/patente.model';
import * as CryptoJS from 'crypto-js';

export interface Usuario {
   id: uuid.v4;
   nome: string,
   telefone: string,
   email: string,
   senha: string, 
   rua: Rua[],
   esquadra: Esquadra[],
   patente: Patente[],
   foto: File 
}

