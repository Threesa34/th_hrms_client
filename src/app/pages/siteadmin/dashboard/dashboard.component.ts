import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ChartModule} from 'primeng/chart';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  _id:any;
  count:any = {
    products:4000,
    locations:26,
    product_units:12550,
    orders:767
  }

  constructor(private _router : Router, private _MastersService : MastersService, private cookieService: CookieService,) { }

  ngOnInit(): void {

    this._id = this.cookieService.get('_id');
    this._MastersService
      .getMessages()
      .subscribe((message: string) => {
        // this.messageList.push(message);
      });

    this.LoadChart();
    this.loadPieChart();
    this.loadPieChart();
    this.LoadLineChart();
    this.getUsersList();
  }


  LoadLineChart()
  {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Purchase',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
              label: 'Sell',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#565656'
          }
      ]
  }
  }
  messageService:any;
  selectData(event) {
    this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
}

barchart_data: any;
  LoadChart()
  {
    this.barchart_data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Stock Available',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Orders',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
              label: 'delivered Orders',
              backgroundColor: '#FF5470',
              borderColor: '#FF007C',
              data: [8, 18, 62, 49, 26, 41, 71]
          }
      ]
  }
  }

  pie_data:any;
  loadPieChart()
  {

    var loanData;
    this._MastersService.getDashboardLoanData().subscribe((res:any)=>{
      if(!res.status)
    {
      loanData = res;
      this.pie_data = {
        labels: ['Loan Requests','Loan Reciepts'],
        datasets: [
            {
                data: loanData,
                backgroundColor: [
                    "#FF355E",
                    "#87FF2A",
                ],
                hoverBackgroundColor: [
                    "#FF355E",
                    "#87FF2A",
                ]
            }]    
        };
    }
    });


    
  }

  usersList:any;

  getUsersList()
  {
    this._MastersService.getRestUsersList().subscribe((res:any)=>{
        this.usersList = res;
    });
  }

  showChatBox:boolean;
  selectedUser:any;
  chatLogDetails:any;
  getChat(data)
  {
      this.selectedUser = data;
      this.showChatBox = true;

      this._MastersService.getChatLog(data.id).subscribe((res:any)=>{
        this.chatLogDetails = res;
    });
  }


  showImage(imgfile)
  {

    var resAlert ={
      imageUrl: 'http://103.252.7.5:8895/uploads/employee/'+imgfile,
        imageWidth: 400,
        imageHeight: 400,
        animation: true,
      showCancelButton: false,
    showConfirmButton: false
    }
     Swal.fire(resAlert).then((result) => {
     
    });
  
  }
 
  chatDetails:any = {
    msg:''
  };

  sendMessage() {
    this.chatDetails.reciever = this.selectedUser.id;
    this.chatDetails.sender = this._id;
    this._MastersService.sendMessage(this.chatDetails);
    this.chatDetails.msg = '';
  }
  
}
