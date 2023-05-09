import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { filter, map, toArray } from 'rxjs/operators'
import { Router, NavigationExtras } from '@angular/router';
import { from, of } from 'rxjs';


@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.scss']
})
export class ProductlistingComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any = new Set(['all']);
  isFiltered: boolean = false;
  sortBy: any[] = ['none', 'name', 'price', 'availability']

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get("assets/products.json").subscribe((data: any) => {
      this.products = data

      data.map((prod: any) => {
        this.categories.add(prod.category)
      });
    })
  }

  onButtonClick(productDetails: Object) {
    const navigationExtras: NavigationExtras = {
      state: { data: productDetails }
    };
    this.router.navigate(['/productdetail'], navigationExtras);
  }


  onSortSelect(event: any) {
    const sortBy = event.value;
    of(this.products).pipe(
      map(productsArray => {
        if (sortBy === 'price')
          productsArray.sort((a, b) => a.price - b.price);
        else if (sortBy === 'name')
          productsArray.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortBy === 'availability')
          productsArray.sort((a, b) => a.rating.count - b.rating.count);
        else
          this.getProducts();
      })
    ).subscribe(sortedProducts => { });
  }


  onCategorySelect(event: any) {
    this.filterItems(event.value);
  }

  filterItems(match: string) {
    if (match !== 'all') {
      this.isFiltered = true;
      const filteredData$ = from(this.products).pipe(
        filter((item: any) => item.category === match)
      );

      const filteredDataArray: any[] = [];
      filteredData$.subscribe(
        (item) => filteredDataArray.push(item),
        (error) => console.error(error)
      );
      this.filteredProducts = filteredDataArray;
    } else {
      this.filteredProducts = []
      this.isFiltered = false;
    }
  }

}
