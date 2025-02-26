import { Component } from '@angular/core';
import { AuthServiceService } from './Auth/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JinYong';
  showFiller=false;
  private x:AuthServiceService=new AuthServiceService();
  session:any
  constructor(){
    console.log(this.session)
    this.session = this.x.controlSession();
    console.log(this.session+" Valore Sessione")
  }

  logOut(){
    sessionStorage.clear()
    window.location.reload()
  }
}
