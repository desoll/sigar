import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-listar.usuario',
  templateUrl: './listar.usuario.component.html',
  styleUrls: ['./listar.usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
 
  imagem:any;
  listaUsuarios:[];
  constructor(private usuarioService: UsuarioService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuarioService.listarTodos().subscribe(res=>{
      this.listaUsuarios = res['data']
      console.log('Dados: ', res['data'][0].nome)
      this.imagem = this.converterParaBase64(res['data']['0'].foto['data']);
    });
  }

    converterParaBase64(arrayBuffer) {
      // Converter arraybuffer para o tipo array object
      let TYPED_ARRAY = new Uint8Array(arrayBuffer);
      // converter o tipo array para string de caracteres
      const string64 = String.fromCharCode.apply(null, TYPED_ARRAY);
    return string64;
  }

}
