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
  cancreport!:any
  displayedColumns = ['Categoria', 'Prodotto',  'Valore','Qta']

  valStr:String="https://newdatasystem.myftp.biz/json/dettagli/test/"
  valStrDue:String="https://newdatasystem.myftp.biz/json/dettagli/test/"
  constructor(private api:HttpClient, private api2:HttpClient, private api3:HttpClient) {
    this.api.get(this.valStr+"home.php").subscribe(
      data=>{
        this.incasso = data
      }

    )
    this.api2.get(this.valStr+"items.php").subscribe(
      data=>{
        this.dataSource = data
      }
    )
    this.api3.get(this.valStrDue+"Cancellazione.php").subscribe(
      data=>{
        console.log(data)
        this.cancreport = data;
      }
    )
  }
  ngOnInit(): void {
  }

}
