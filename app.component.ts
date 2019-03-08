import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'opticalProject';
  
  displayedColumns: string[] = ['Number','Date', 'Time', 'Deteced Object', 'Missing Object']
  dataSource:any;
  ListObject:Observable<any[]>;
  ELEMENT_DATA:ListForm[] = [];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: 'Series A'},
    {data: [], label: 'Series B'}
  ];

  constructor(private firebaseDB: AngularFireDatabase, private request: RequestService){
    
  }

  ngOnInit(): void {
    this.ListObject = this.request.getListObject();
    this.ListObject.subscribe(data=>{
      let count = 1;
      let obj = [];
      let miss = [];
      let time = [];
      this.barChartLabels = [];
      data.forEach(element =>{
        console.log(element);
        var e = {
          position: count,
          date: element.date,
          time: element.date,
          object: element.object,
          miss: element.miss
        }
        count++;
        time.push(count);
        obj.push(element.object);
        miss.push(element.miss);
        this.ELEMENT_DATA.push(e);
      })
      this.dataSource = this.ELEMENT_DATA;
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = obj;
      clone[1].data = miss;
      this.barChartData = clone;
      this.barChartLabels = time;
    }) 
  }

}

export interface ListForm{
  position: number
  date: any
  time: any
  object: string
  miss: string
}
