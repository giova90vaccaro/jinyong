import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  incasso:any;
  dataSource!:any

  displayedColumns = ['Categoria', 'Prodotto', 'Qta', 'Perc']

  constructor(private api:HttpClient, private api2:HttpClient) {
    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/test/home.php").subscribe(
      data=>{
        this.incasso = data
      }

    )
    this.api2.get("https://cvggold-dash.ns0.it/json/dettagli/test/items.php").subscribe(
      data=>{
        this.dataSource = data
      }
    )
  }
  ngOnInit(): void {
  }

}
