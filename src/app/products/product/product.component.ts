import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: number;
  prodotto: any;
  sub: any;
  recensioni = [];
  messaggio: boolean;
  isLoading: boolean;

  constructor(
    private router : Router, 
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      this.loadProd(this.id);
    });
  }

  /**
   * Go back
   */
  public getPreviousUrl(){
    this.location.back();
  }

  /**
   * Load a product
   */
  loadProd (id) {
    this.isLoading = true;
    this.productService.readProduct(id).subscribe((data) => {
      
      if(data) {
        this.isLoading = false;
        
        console.log('********************');
        console.log('prodotto', data);
        console.log('********************');
        console.log('recensioni', data['reviews']);
        console.log('********************');

        this.prodotto = data;
        if(data['reviews']) {
          // OK RECENSIONI
          this.recensioni = data['reviews'];
          this.messaggio = false;
        }
        else {
          // NO RECENSIONI
          this.messaggio = true;
        }
        
        Object.keys(data).forEach(key => {
          if (key == 'reviews') {
            console.log('product key > ', key);
            console.log('product data key 0 user > ', data[key][0].user);
          }
        });
      }
    },
    error => {
      console.log('errore',error.statusText);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
