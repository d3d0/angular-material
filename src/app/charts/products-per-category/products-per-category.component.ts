import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ErrorsComponent } from '../../errors/errors.component';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-products-per-category',
  templateUrl: './products-per-category.component.html',
  styleUrls: ['./products-per-category.component.css']
})
export class ProductsPerCategoryComponent implements OnInit {

  public polarAreaChartLabels: Label[] = [];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartColors: Array<any> = [
    {
      backgroundColor: [
        "rgba(255, 0, 0, 0.5)",
        "rgba(100, 255, 0, 0.5)",
        "rgba(200, 50, 255, 0.5)",
        "rgba(0, 100, 255, 0.5)",
        "rgba(50, 255, 255, 0.5)",
        "rgba(255, 255, 50, 0.5)",
      ],
    }
  ];
  isLoading: boolean;

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadStatsCat();
  }

  /**
   * Load all stats
   */
  loadStatsCat () {
    this.isLoading = true;
    this.productsService.readStatsCategories().toPromise().then((data) => {
      if(data) {
        console.log('********************');
        console.log(data);
        console.log('********************');
        
        this.isLoading = false;

        Object.keys(data).forEach(key => {
          // console.log(key);
          // console.log(data[key].category);
          // console.log(data[key].numberOfProducts);
          this.polarAreaChartLabels.push(data[key].category);
          this.polarAreaChartData.push(data[key].numberOfProducts);
        });
        
      }
    })
    .catch(err=> { 
      console.log('errore',err.statusText);
      this.isLoading = false;
      
      console.log('dialog chart',this.dialog.openDialogs);
      if (this.dialog.openDialogs.length > 0) return;
      this.dialog.open(ErrorsComponent, {
        width: '300px',
        data: {
          error: err
        }
      });
    });

  }

}
