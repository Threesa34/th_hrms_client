import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../../../services/masters.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

const deleteConfirm = {
  title: 'Are you sure?',
  text: 'Want to deacivate selected Users/users',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, proceed!',
  cancelButtonText: 'No, keep it'
}

var alertPopup = {
  title: undefined,
  text: undefined,
  type: undefined,
}

@Component({
  selector: 'attendance-report',
  templateUrl: './sub_modules/attendance-report.html',
  styleUrls: ['./employee-list.component.scss']
})
export class attendanceReport implements OnInit{
  
  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  attendanceList:any;
  selectedMonth:String;
attendancedetails:any = {};
yearsRange:any;
_month:String;
_year:any;
monthNames:object = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  ngOnInit(): void {
    const d = new Date();
    this.selectedMonth = this.monthNames[d.getMonth()]+'-'+d.getFullYear();


    this._month = this.monthNames[d.getMonth()];
    this._year = d.getFullYear();

    this.getYearsRange();

    this.getAttendanceReport(this.selectedMonth);
    this.getAttendanceList(this.selectedMonth);
  }

  getYearsRange() {
    const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
this.yearsRange = range(currentYear, currentYear - 10, -1); 
}
 
   getAttendanceReport(selectedMonth)
  {
    var loadout = {employee_id: this.data[0].id, date: selectedMonth};
    this._MastersService.getAttendanceReport(loadout).subscribe((res: any) => {
      this.attendancedetails = res[0];
    });
  } 
  getAttendanceList(selectedMonth)
  {
    var loadout = {employee_id: this.data[0].id, date: selectedMonth};
    this._MastersService.getEmployeesAttendanceList(loadout).subscribe((res: any) => {
      this.attendanceList = res;
    });
  } 


  getReportOnMonth(_month, _year)
  {
    this.selectedMonth = _month+'-'+_year;
    this.getAttendanceReport(this.selectedMonth);
    this.getAttendanceList(this.selectedMonth);
  }

  formatFullName(text)
  {
    var formatedtext = '';
    formatedtext = formatedtext + text;
    if(formatedtext.trim().charAt(formatedtext.length -1) == '.')
      return formatedtext;
      else
      return formatedtext+'.';
  }

}

@Component({
  selector: 'shift-assignment',
  templateUrl: './sub_modules/shift-assignment.html',
  styleUrls: ['./employee-list.component.scss']
})
export class shiftAssignment implements OnInit{
  
  shift_assignment_details:any = {};

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  employeesList:any;

  ngOnInit(): void {
    this.getWorkingShiftList();
    this.employeesList = this.data;
  }

  shiftList:any;
  getWorkingShiftList()
 {
   this._MastersService.getWorkingShiftList().subscribe((res:any)=>{
     if(!res.status)
   {
     this.shiftList = res;
 
   }
   });
 }

 RemoveEmployeeFromList(i)
{
   if(i != undefined)
   {
    this.employeesList.splice(i, 1);
   }
}
   saveshiftAssignmentDetails()
  {
   
    var userids = '';
   this.employeesList.map(function(value)
   {
     userids = userids+value.id+',';
   });

   userids = userids.substr(0, userids.length - 1);

    this._MastersService.saveshiftAssignmentDetails({uerids:userids, shiftid:this.shift_assignment_details.shiftdetails.id }).subscribe((res: any) => {
      var resAlert ={
        title: res.title,
        text: res.message,
        type: res.type,
      }
       Swal.fire(resAlert).then((result) => {
        if (res.status === 1) {
          
        } else {
        }
      }); 
    });
  } 


}

@Component({
  selector: 'apprisal-history',
  templateUrl: './sub_modules/apprisal-history.html',
  styleUrls: ['./employee-list.component.scss']
})
export class apprisalHistory implements OnInit{
  
  shift_assignment_details:any = {};

  constructor(private _MastersService : MastersService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  approsalsList:any;
  employeeDetails:any ={};
  ngOnInit(): void {
    this.getApprisalList();
    this.employeeDetails = this.data;
  }

  getApprisalList()
 {
   this._MastersService.getApprisalList(this.data[0].id).subscribe((res:any)=>{
     if(!res.status)
   {
     this.approsalsList = res;
 
   }
   });
 }

 formatFullName(text)
  {
    var formatedtext = '';
    formatedtext = formatedtext + text;
    if(formatedtext.trim().charAt(formatedtext.length -1) == '.')
      return formatedtext;
      else
      return formatedtext+'.';
  }

}



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  gridApi;
  gridColumnApi;
  paginationPageSize = 10;
  columnDefs;
  defaultColDef;
  columnTypes;
  rowModelType;
  rowData:any = [];
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  selectedRows:any=[];
  userid:number;

 constructor(private _router : Router, private _MastersService : MastersService, public dialog: MatDialog) { }

 ngOnInit(): void {
   this.initializeParameters();
 }

 initializeParameters()
 {
   this.columnDefs = [
     {
       headerName: "Name", 
       field: 'name',
       type: 'text',
       checkboxSelection: true,
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Mobile No(s)", 
       field: 'mobiles',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Email", 
       field: 'email',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Date of Birth", 
       field: 'birth_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Date of Joining", 
       field: 'joining_date',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },

     {
       headerName: "Role", 
       field: 'role_name',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Working Shift", 
       field: 'working_shift',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Company", 
       field: 'company_name',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     {
       headerName: "Status", 
       field: '_status',
       filterParams: {
         resetButton: true,
         suppressAndOrCondition: true,
       },
     },
     
   ];
   this.defaultColDef = {
     flex: 1,
     minWidth: 100,
     sortable: true,
     resizable: true,
     enableRowGroup: true,
     enablePivot: true,
     enableValue: true,
     filter: true,
     menuTabs: ['filterMenuTab'],
   };
   this.columnTypes = {
     text: { filter: 'agTextColumnFilter' },
     number: { filter: 'agNumberColumnFilter' },
     numberWithFilterReset: {
       filter: 'agNumberColumnFilter',
       filterParams: {
         resetButton: true,
         debounceMs: 1500,
       },
     },
   };
   
   this.rowSelection = "multiple";
   this.rowGroupPanelShow = "always";
   this.paginationPageSize = 10;
 }

 onGridReady(params) {
   this.gridApi = params.api;
   this.gridColumnApi = params.columnApi;
 
 this.getUsersList();
   
 }

 getUsersList()
 {
   this._MastersService.getUsersList().subscribe((res:any)=>{
     if(!res.status)
   {
     this.rowData = res;
     this.gridApi.setDomLayout("autoHeight");
   }
   });
 }



 onPageSizeChanged(newageSize) {
   var value = this.paginationPageSize;
   this.gridApi.paginationSetPageSize(Number(value));
 }
 
 
 onSelectionChanged(event) {
   this.selectedRows = this.gridApi.getSelectedRows();
   var selectedRowsString = "";
   this.selectedRows.forEach(function(selectedRow, index) {
     if (index !== 0) {
       selectedRowsString += ", ";
     }
     selectedRowsString += selectedRow.athlete;
   });
   this.userid = this.selectedRows[0].id;
 }


 openDialog(){  
  var dialogRef = this.dialog.open(shiftAssignment,{width: '50%',data:this.selectedRows});
  dialogRef.afterClosed().subscribe(result => {
  });
}

 openAttendanceReport(){  
  var dialogRef = this.dialog.open(attendanceReport,{width: '50%',data:this.selectedRows});
  dialogRef.afterClosed().subscribe(result => {
  });
}

 openApprisalHistory(){  
  var dialogRef = this.dialog.open(apprisalHistory,{width: '50%',data:this.selectedRows});
  dialogRef.afterClosed().subscribe(result => {
  });
}

 disableEmployee()
 {
   var userids = '';
   this.selectedRows.map(function(value)
   {
     userids = userids+value.id+',';
   });

   userids = userids.substr(0, userids.length - 1);
   
   Swal.fire(deleteConfirm).then((result) => {
     if (result.value) {
   this._MastersService.deleteUsers({userids:userids}).subscribe((res: any) => {
     alertPopup.text = res.message;
     alertPopup.title = res.title;
     alertPopup.type = res.type;

     Swal.fire(alertPopup).then((result) => {
       if (res.status === 0) {
 
       } else {
         this.getUsersList()
       }
     });
   });
 } else if (result.dismiss === Swal.DismissReason.cancel) {
   Swal.fire(
     'Cancelled',
     'Your imaginary file is safe :)',
     'error'
   )
 }
 });
 
 }

}
