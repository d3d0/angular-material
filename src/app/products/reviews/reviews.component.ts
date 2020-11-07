import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalf as farStarHalf } from '@fortawesome/free-regular-svg-icons';

const reviews = [
  {
    "user":"Utente 1",
    "title": "Titolo Recensione 1",
    "ratingFull": Array(2),
    "ratingEmpty": Array(3),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  },
  {
    "user":"Utente 2",
    "title": "Titolo Recensione 2",
    "ratingFull": Array(5),
    "ratingEmpty": Array(0),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  },
  {
    "user":"Utente 3",
    "title": "Titolo Recensione 3",
    "ratingFull": Array(1),
    "ratingEmpty": Array(4),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  },
  {
    "user":"Utente 4",
    "title": "Titolo Recensione 4",
    "ratingFull": Array(3),
    "ratingEmpty": Array(2),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  },
  {
    "user":"Utente 5",
    "title": "Titolo Recensione 5",
    "ratingFull": Array(4),
    "ratingEmpty": Array(1),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  }
]

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  
  id: number;
  prodotto: any;
  reviews = reviews;
  recensioni = [];
  messaggio: boolean;
  isLoading: boolean;
  faStar = faStar;
  farStar = farStar;
  faStarHalf = faStarHalf;
  farStarHalf = farStarHalf;
  private sub: any;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor( 
    private router : Router, 
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService) { 
      this.currentUrl = this.router.url;
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log('prev:', event.url);
          this.previousUrl = event.url;
        };
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      this.loadProd(this.id);
    });
    console.log(this.messaggio);
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
