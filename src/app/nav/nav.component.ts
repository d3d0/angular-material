import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StoreService } from '../services/store.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  dashItems = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: 'dashboard',
    }
  ];
  prodItems =  [
    {
      title: 'Vista Panel / Grid',
      icon: 'view_stream',
      route: 'prodotti',
    },
    {
      title: 'Vista Tabella',
      icon: 'view_list',
      route: 'tabella',
    }

  ];

  storeName: String;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private storeService: StoreService) {
      this.storeService.readStore().subscribe(response => {
        this.storeName = response['name'];
        console.log(response['name']);
      });
  }
  
}
