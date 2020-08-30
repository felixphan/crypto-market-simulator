import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  data;
  displayedColumns: string[] = ['size', 'bid'];
  displayedAskColumns: string[] = ['ask', 'size'];
  subscription: Subscription;
  pageSizes = [{ value: 10, viewValue: 10 }, { value: 20, viewValue: 20 }, { value: 30, viewValue: 30 }];
  markets = [{ value: 'bitfinex', viewValue: 'Bitfinex' }, { value: 'binance', viewValue: 'Binance' }];

  selectedPageSize;
  selectedMarket;
  @ViewChild('bidTable', { static: true }) bidTable: MatTable<any>;
  @ViewChild('askTable', { static: true }) askTable: MatTable<any>;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.selectedPageSize = 10;
    this.selectedMarket = 'binance';
    this.fetchData();
    const source = interval(30000);
    this.subscription = source.subscribe(() => this.fetchData());
  }

  // tslint:disable-next-line:typedef
  fetchData() {
    this.http.get(`http://localhost:3000/data?market=${this.selectedMarket}&pageSize=${this.selectedPageSize}`).subscribe(res => {
      this.data = res;
      this.bidTable.renderRows();
      this.askTable.renderRows();
    });
  }

}
