import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'patient-search';
  column_to_search:any;
  searchkey:any;
  constructor( ) {
  }
  getPatientData(){
  
  this.column_to_search = {
      itemsPerPage: 10000,
      order: 'DESC'
    }
    if(this.searchkey !== undefined && this.searchkey !== null){
      
      this.column_to_search.searchkey = this.searchkey;
  }
  
    //In this i will cal patient data api with serach key word and i will be pass value here 
    this.patientdata(this.column_to_search);
    
    
  }
  
  patientdata(){
  //Here i will cal list of patients data API code
  }
}
