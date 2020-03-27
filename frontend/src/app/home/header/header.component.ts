import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result/search-result.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private resultService: SearchResultService) { }

  ngOnInit() {
    
  }

}
