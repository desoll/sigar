import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.components.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'frontend';
  carregar = true;
 
    ngOnInit(): void {
       this.Processar()
      
    }

   Processar() {
     var rand = Math.round(Math.random() * (3000 - 500)) + 500;
   setTimeout(() => {
     this.carregar = false;
   }, rand);
 }
}
