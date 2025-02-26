import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  auth!:any;
  durationInSeconds = 5;
  authRout=false;
  encPassword!: string;
  link:any
  private x:AuthServiceService=new AuthServiceService();
  constructor(private api:HttpClient, private router: Router, ) {
    localStorage.setItem('server', 'https://cvggold-dash.ns0.it');
    this.link = sessionStorage.getItem('server')+"/img/logodef.png";
   }

  login(i:string, p:string){
      let resp:any;
      const body = this.x.setUsers(i, p);
      const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})}
      this.api.post("https://newdatasystem.myftp.biz/External/Authentication/Authpage.php", body).subscribe(
        data=>{
          resp = data;
            if(resp['stato'] == 'OK'){
              this.x.loginSetting(resp['id'],p,resp['idss'], resp['Tipo'], resp['path'])
              this.router.navigate(['Home']);
              window.location.reload()
            }else{
              console.log("Errore Login")
            }
        }
      )
  }

}
