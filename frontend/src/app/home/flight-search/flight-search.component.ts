import { Component, OnInit } from '@angular/core';
import { SearchDetails } from './search-details';
import { FlightSearchService } from './flight-search.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Data } from '../data.service'
import { Airports } from './airports';
import { SearchResult } from '../search-result/search-result';
import { SearchResultService } from '../search-result/search-result.service';
import { appRoutes } from '../../app.routing';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  private airports = new Airports();
  submitted = false;
  flights: SearchResult = new SearchResult();
  private citiesNumber = [1];
  searchDetails = new SearchDetails(null,'Economy',null,[{city:null,days:null}], 1, 0);
  private adult_count = 1;
  private children_count = 0;

  citiesForms: FormGroup;
  constructor(private formBuilder: FormBuilder, private resultService: SearchResultService, private _flightService: FlightSearchService, private router: Router, private data: Data, private routes: ActivatedRoute) { }
  ngOnInit() { 
    this.getAirports();
    this.resultService.removeAccessToResult();

    this.citiesForms = this.formBuilder.group({
      source: ['',Validators.required],
      date: [null, Validators.required],
      cityinfo : this.formBuilder.array([
        this.buildCityForm()
      ])
    });
  }
  
  buildCityForm(){
    return this.formBuilder.group({
      city : ['', Validators.required],
      days : ['', Validators.required]
    });
  }

  getAirports(){
    // this.airports.city = ['India'];
    this._flightService.getAirports().subscribe((data: Airports)=> {
      this.airports = data;
    })
  }
   
  onSubmit(){
    this.submitted = true;
    if(!this.citiesForms.invalid){
      this._flightService.postFlightSearch(this.searchDetails).subscribe(response => {
        this.data.storage = response;
        this.resultService.giveAccessToResul();
        this.router.navigate(['searchresult']);
        console.log('here');
      });
      console.log(this.searchDetails);
    }
  }

  public isValidField(i: number, field: any) {
    var f = this.citiesForms
            .get('cityinfo') //retrieve items FormArray
            .get(i.toString()) //retrieve items FormGroup
            .get(field); //retrieve items form field
          // console.log(f.touched+".."+this.submitted+".."+this.citiesForms);
    return (f.touched && f.invalid) || (f.invalid && this.submitted);
}
  get cityInfoForms() {
    return this.citiesForms.get('cityinfo') as FormArray;
  }
  onAdd(){
    
    const control = <FormArray>this.citiesForms.controls['cityinfo'];
    const tempcityinfo = this.buildCityForm();
    control.push(tempcityinfo);

    // this.submitted = false;

    this.searchDetails.cities.push({city:null,days:null});
    this.citiesNumber.push(this.citiesNumber.length + 1);
  }
  removeCity(id:number){

    this.cityInfoForms.removeAt(id);

    this.citiesNumber = Array(this.citiesNumber.length-1).fill(0).map((x,i)=>i+1);
    this.searchDetails.cities.splice(id,1);
  }

  get f() {
    return this.citiesForms.controls;
  }
  onIncrementAdult(){
    this.adult_count++;
    this.searchDetails.updateAdults(this.adult_count);

  }
  onDecrementAdult(){
    this.adult_count--;
    this.searchDetails.updateAdults(this.adult_count);

  }
  onIncrementChildren(){
    this.children_count++;
    this.searchDetails.updateChildren(this.children_count);

  }
  onDecrementChildren(){
    this.children_count--;
    this.searchDetails.updateChildren(this.children_count);

  }
}
