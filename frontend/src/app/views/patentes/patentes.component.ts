import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patentes',
  templateUrl: './patentes.component.html',
  styleUrls: ['./patentes.component.css']
})
export class PatentesComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  navigatetoNovo() : void {
    this.router.navigate(['/patente/nova'])
  }
}
