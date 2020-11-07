import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductService } from '../services/product.service';
import { AddProdComponent } from './add-prod/add-prod.component';
import { ErrorsComponent } from '../errors/errors.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteProdComponent } from './delete-prod/delete-prod.component';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalf as farStarHalf } from '@fortawesome/free-regular-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';


export interface Card {
  id: string;
  data: {
    title: string;
    category: string;
    price: string;
    employee: string;
    description: string;
  }
}

const products: Card[] = [
  {
    "id": "2e0ZKjLwk77942XdtYDg",
    "data": {
      "employee": "Aldo",
      "category": "pasticceria",
      "title": "Bombolone alla crema",
      "price": "1",
      "description": "Bombolone ripieno alla crema"
    }
  },
  {
    "id": "EZrK6XjuHrnUteoFb6Aq",
    "data": {
      "title": "Bombolone al cioccolato",
      "price": "1",
      "category": "pasticceria",
      "employee": "Giacomo",
      "description": "Bombolone ripieno di cioccolato"
    }
  },
  {
    "id": "W8NxISebSxVTNXOXNzBi",
    "data": {
      "employee": "Giovanni",
      "category": "pasticceria",
      "title": "Cornetto",
      "description": "Cornetto alla crema",
      "price": "2"
    }
  },
]

const reviews = [
  {
    "name":"Utente 1",
    "reviewSummary": "Titolo 1.",
    "rating": 2.5,
    "reviewMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  },
  {
    "name":"Utente 2",
    "reviewSummary": "Titolo 2.",
    "rating": 3.45,
    "reviewMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus."
  }
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  faStar = faStar;
  farStar = farStar;
  faStarHalf = faStarHalf;
  farStarHalf = farStarHalf;
  reviews = reviews;
  columns: Number = 1;
  panelGrid: boolean = false;
  panelOpenState = false;
  showTitle = false;
  isLoading: boolean;
  products: any;
  recensioni = [];
  dataSource: any = new MatTableDataSource();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private productsService: ProductsService,
    private productService: ProductService,
    public dialog: MatDialog,
  ) { 
    console.log(this.router.url);
    if(this.router.url === '/prodotti'){
      this.showTitle=true;
    } else {
      this.showTitle=false;
    }
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();

    // DEV
    // this.dataSource.data = products; // TEST
    // this.dataSource.paginator = this.paginator; // TEST
    // this.products = this.dataSource.connect(); // TEST

    // PROD
    this.loadProducts();
  }

  /**
   * Switch panel / grid
   */
  switchPanelGrid() {
    console.log('panel / grid')
    if(this.panelGrid) {
      this.panelGrid = false;
    }
    else {
      this.panelGrid = true;
    }
  }

  /**
   * Dialog DELETE product
   */
  dialogDeleteProd(id, name) {

    const dialogRef = this.dialog.open(DeleteProdComponent, {
      width: '300px',
      data: {
        prodId: id,
        prodName: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('The dialog was closed');
      if (result) {
        this.productService.deleteProduct(result).subscribe(response => 
        {
          console.log(response);
          this.loadProducts();
        });
      }
    });

  }

  /**
   * Dialog ADD product
   */
  dialogAddProd() {

    const dialogRef = this.dialog.open(AddProdComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result title: ${result.title}`);
      // console.log(`Dialog result cat: ${result.cat}`);
      // console.log(`Dialog result price: ${result.price}`);
      // console.log(`Dialog result employee: ${result.employee}`);
      // console.log(`Dialog result desc: ${result.desc}`);
      
      console.log('Result stringify',JSON.stringify(result));
      console.log('The dialog was closed');
      
      if (result) {
        this.productService.createProduct(JSON.stringify(result)).subscribe((response) => {
          if (response) {
            console.log('********************');
            console.log(response);
            console.log('********************');
            this.loadProducts();
          }
        },
        error => {
          console.log('errore',error.statusText);
        });
      }
    });

  }
  
  /**
   * Delete a product
   */
  deleteProd (id) {
    this.productService.deleteProduct(id).subscribe((data) => {
      if(data) {
        console.log('********************');
        console.log(data);
        console.log('********************');
      }
    },
    error => {
      console.log('errore',error.statusText);
    });
  }

  /**
   * Load all products
   */
  loadProducts () {
    this.isLoading = true;
    
    this.productsService.readProducts().subscribe((data) => {
      if(data) {
        console.log('********************');
        console.log('prodotti',data);
        console.log('********************');

        this.isLoading = false;

        // PROD
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.products = this.dataSource.connect();

        Object.keys(data).forEach(key => {
          if (data[key]['data'].reviews) {
            console.log('product key reviews > ', data[key]['data'].reviews);
            this.recensioni = data[key]['data'].reviews;
          }
        });
        
        // DEV
        // this.products = data;
        
      }
    },
    error => {
      console.log('errore',error.statusText);
      this.isLoading = false;
      console.log('dialog prod',this.dialog.openDialogs);
      if (this.dialog.openDialogs.length > 0) return;
      this.dialog.open(ErrorsComponent, {
        width: '300px',
        data: {
          error: error
        }
      });
    });

    // PROMISE
    // this.productsService.readProducts().toPromise().then((data) => {
    // },
    // .catch(err=> { 
    //   console.log('errore',err.statusText);
    //   this.isLoading = false;
    //   console.log('dialog prod',this.dialog.openDialogs);
    //   if (this.dialog.openDialogs.length > 0) return;
    //   this.dialog.open(ErrorsComponent, {
    //     width: '300px',
    //     data: {
    //       error: err
    //     }
    //   });
    // });
  }

}
