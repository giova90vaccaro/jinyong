import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ChartErrorEvent,
  ChartMouseLeaveEvent,
  ChartMouseOverEvent,
  ChartSelectionChangedEvent,
  ChartType,
  Column,
  GoogleChartComponent
} from 'angular-google-charts';

@Component({
  selector: 'app-vendite',
  templateUrl: './vendite.component.html',
  styleUrls: ['./vendite.component.css']
})
export class VenditeComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  displayedColumns = ['Categoria', 'Prodotto', 'Qta', 'Base','Perc','prezzo', 'VBase','Valore'];
  displayedColumnsDue = ['Categoria', 'Prodotto', 'Qta', 'Base', ,'Perc'];

  dataSource!:any
  documenti!:any;
  incasso!:any;
  show = false
  show2=false;
  show3=false;
  show4=false;
  columns:string[] =['Categoria', 'Totale']
  columns2:string[] =['Fascia Oraria', 'Conti', 'Pezzi']
  mese11!:any;
  righe3!:any;
  righealt3!:any;
  title3="Classifica Categoria";
  type3!:any
  columns3!:any
  col3!:any
  data4!:any
  options3!:any
  size!:any;
  for!:any;
  righe4!:any;
  righealt4!:any;
  data5!:any
  options4!:any
  title4="Fascia Oraria";
  type4!:any


  chartHeight = 0
  chartHeight2 = 0;
  chartWidth = 0

  serverLink!:any
  permessi!:any
  constructor(private api:HttpClient, private and:HttpClient, private mese:HttpClient, private ora:HttpClient, private sizehttp:HttpClient, private dochttp:HttpClient) {
    this.serverLink = "http://192.168.1.254/json/dettagli/test/"
    this.permessi = String(sessionStorage.getItem('Tipo'))
  }

  ValoriPermessi():boolean{
    if(this.permessi === 'Tutti'){
      return true
    }else if(this.permessi === 'Mg'){
      return false
    }else{
      return false
    }
  }

  ngOnInit(): void {
  }

  ricerca(){
    if( this.range.value.start.toLocaleDateString("it-IT")!= null && this.range.value.end.toLocaleDateString("it-IT")!=null ){
      console.log(this.range.value.start.toLocaleDateString("it-IT"))
        this.api.get(this.serverLink+"/itemsd.php?d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT")).subscribe(
          data=>{
            this.dataSource = data
            this.show = true
          })
        this.and.get(this.serverLink+"/periodo.php?d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT")).subscribe(
          data=>{
              this.incasso = data;
              this.show2 = true
          }
        )

        this.mese.get(this.serverLink+"/categoria.php?d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT")).subscribe(
        data =>{
        this.mese11 = data
        this.righe3=[];
      this.righealt3 = [];
      var i:number
        for(i=0; i<this.mese11.length; i++){
          var aux = [this.mese11[i].Categoria, Number(this.mese11[i].Qta) ]
          this.righe3.push(aux)
        }
        this.title3= 'Fascia Oraria'
        this.type3= ChartType.Bar
        this.columns3 = "categoria";

        this.data4 = this.righe3
        this.options3={
          chart: {
            title: "Andamento FasciaOraria da",
            subtitle: 'Totale Scontrinato - Numero di Pezzi'
          }
        }
        this.show3 = true;
      })

        this.ora.get(this.serverLink+"/hora.php?d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT")).subscribe(
          data=>{
            this.for = data

            this.righe4=[];
            this.righealt4 = [];
            var i:number
              for(i=0; i<this.for.length; i++){
                var aux = [this.for[i].Hour, Number(this.for[i].Conti),  Number(this.for[i].Pezzi)]
                this.righe4.push(aux)
              }
              this.title4= 'Fascia Oraria'
              this.type4= ChartType.Bar

              this.data5 = this.righe4
              this.options4={
                chart: {
                  title: "Andamento FasciaOraria da",
                  subtitle: 'Totale Scontrinato - Numero di Pezzi'
                }
              }
            this.show4=true;
          }
        )

        this.sizehttp.get(this.serverLink+"/size.php?d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT")).subscribe(
          data=>{
            this.size = data;
          }
        );
        this.dochttp.get(this.serverLink+"/tipodocumento.php?d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT")).subscribe(
          data=>{
            this.documenti = data;
          }
        );


    }else{
      console.log("Data non inserita")
    }
  }

}
