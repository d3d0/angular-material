import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from '../services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteProdComponent } from '../products/delete-prod/delete-prod.component';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  // public dataSource: MatTableDataSource<Product>();
  showTitle = false;
  isLoading: boolean;
  appoggio: any = [];
  dataSource: any; 
  displayedColumns = ['title', 'category', 'price', 'review', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;  
  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatTable) table1: MatTable<any>;

  constructor(
    private router: Router,
    private productsService: ProductsService, 
    private productService: ProductService,
    public dialog: MatDialog,
    ) { 
    console.log(this.router.url);
    if(this.router.url === '/tabella'){
      this.showTitle=true;
    } else {
      this.showTitle=false;
    }
  }
  
  ngOnInit() {
    this.loadProducts();
  }

  /**
   * Load products in table
   */
  public loadProducts = () => { 
    this.isLoading = true;
    this.productsService.readProducts().subscribe(res => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data.length = 0;
      // this.dataSource.data = res;
      // console.log('1', this.dataSource.data);
      // var result = Object.keys(res).map(e=>res[e]);
      // console.log('2', result);
      Object.keys(res).forEach(key => {
        console.log('product data', res[key]['data']);
        res[key]['data'].id = res[key]['id'];
        this.appoggio.push(res[key]['data']);
      });
      console.log('appoggio',this.appoggio);
      this.dataSource.data = this.appoggio;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error => {
      console.log('errore',error.statusText);
      this.isLoading = false;
    });
  }

  /**
   * Delete a product
   */
  redirectToDelete (id, element: any) : void {
    this.productService.deleteProduct(id).subscribe((data) => {

      const index = this.dataSource.data.indexOf(element, 0);
      if (index > -1) {
        this.appoggio.splice(index, 1); // at the position 'index' remove 1 item
      }
      this.dataSource.data = this.appoggio;
      this.table1.renderRows();

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
   * Dialog DELETE product
   */
  dialogDeleteProd(id, name, element: any) {

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
          
          const index = this.dataSource.data.indexOf(element, 0);
          if (index > -1) {
            this.appoggio.splice(index, 1); // at the position 'index' remove 1 item
          }
          this.dataSource.data = this.appoggio;
          this.table1.renderRows();
          
        });
      }
    },
    error => {
      console.log('errore',error.statusText);
      this.isLoading = false;
    });

  }

}
