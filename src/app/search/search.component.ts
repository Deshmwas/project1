import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../landing-page/product';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
clear() {
this.query = '';
    this.products = undefined;
}
  query: string = '';
  products: Product[] | undefined;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private searchService: SearchService, private route: ActivatedRoute,) {
    this.search();
  }

    ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.search();
    });
  }
  
  search() {
    this.searchService.search(this.query).subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log(data);
       this.message = null;
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.products = undefined; // clear products array
      }
    );}
}

