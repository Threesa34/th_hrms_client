import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';  
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  constructor(private httpClient: HttpClient, private socket: Socket) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getStatusOptions()
  {
    return [
      {id:1, title:'Active'},
      {id:0, title:'Deactive'},
      ];
  }
  getCountriesList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getCountryList').pipe(map(data => {
      return data;
    }));
  }

  getStatesOnCountry(countryid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getStateListOnCountry/'+countryid).pipe(map(data => {
      return data;
    }));
  }

  getCityListOnState(stateid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getCityListOnState/'+stateid).pipe(map(data => {
      return data;
    }));
  }

  getCompanyDetails(companyid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getCompanyDetails/'+companyid).pipe(map(data => {
      return data;
    }));
  }

  getCompaniesList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getCompaniesList/').pipe(map(data => {
      return data;
    }));
  }

  saveCompanydetails(companyDetails): Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveCompanyDetails/',companyDetails).pipe(map(data => {
							return data;
					}));
  }

  deleteCompanies(companyIds): Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/deleteCompanies/',companyIds).pipe(map(data => {
							return data;
					}));
  }


  getUserDetails(userid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getUserDetails/'+userid).pipe(map(data => {
      return data;
    }));
  }

  getUsersList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getUsersList/').pipe(map(data => {
      return data;
    }));
  }

  getRestUsersList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getRestUsersList/').pipe(map(data => {
      return data;
    }));
  }

  getUserRoles():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getUserRoles/').pipe(map(data => {
      return data;
    }));
  }

  saveUserDetails(userDetails): Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveUserDetails/',userDetails).pipe(map(data => {
							return data;
					}));
  }

  deleteUsers(userIds): Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/disableEmployee/',userIds).pipe(map(data => {
							return data;
					}));
  }

  saveshiftAssignmentDetails(shiftAssignmentDetails): Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveshiftAssignmentDetails/',shiftAssignmentDetails).pipe(map(data => {
							return data;
					}));
  }

  SignOut():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/SignOut/').pipe(map(data => {
      return data;
    }));
  }

  // WORKING SHIFT MANAGEMENT
  getWorkingShiftList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getWorkingShiftList').pipe(map(data => {
      return data;
    }));
  }

  getshiftDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getshiftDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeShiftsList = new EventEmitter();    
  subsShiftsList: Subscription;  

  EmitShiftsList(){
    this.invokeShiftsList.emit();
  }

  saveShiftDetails(shiftDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveShiftDetails/',shiftDetails).pipe(map(data => {
      return data;
  }));
  }

  

  // WORKING SHIFT MANAGEMENT


  getPosition(): Promise<any>
  {
     return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {		

          resolve({longitude: resp.coords.longitude, latitude: resp.coords.latitude});
        },
        err => {
          reject(err);
        }, {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
    }); 

  }

  getAddress(coords): Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/getAddress/',coords).pipe(map(data => {
      return data;
    }));
  }

  setAttendance(attendanceDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/setAttendance/',attendanceDetails).pipe(map(data => {
      return data;
  }));
  }

  getAttendanceStatus():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getAttendanceStatus').pipe(map(data => {
      return data;
    }));
  }

  // SALARY MANAGEMENT
  
  getSalaryApprisalList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getSalaryApprisalList').pipe(map(data => {
      return data;
    }));
  }

  getEmployeesList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getEmployeesList').pipe(map(data => {
      return data;
    }));
  }

  getApprisalList(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getApprisalList/'+id).pipe(map(data => {
      return data;
    }));
  }

  getSalaryApprisalDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getSalaryApprisalDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeSalaryApprisal = new EventEmitter();    
  subsSalaryApprisal: Subscription;  

  EmitSalaryApprisal(){
    this.invokeSalaryApprisal.emit();
  }

  saveSalaryApprisalDetails(SalaryApprisalDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveSalaryApprisalDetails/',SalaryApprisalDetails).pipe(map(data => {
      return data;
  }));
  }

  getAttendanceReport(employeeDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/getAttendanceReport/',employeeDetails).pipe(map(data => {
      return data;
  }));
  }

  // SALARY MANAGEMENT

  // LOAN REQUEST
  getloanRequestList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getloanRequestList').pipe(map(data => {
      return data;
    }));
  }

  getloanRequestDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getloanRequestDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeloanRequestList = new EventEmitter();    
  subsloanRequestList: Subscription;  

  EmitloanRequestList(){
    this.invokeloanRequestList.emit();
  }

  deleteLoanRequest(id):Observable<any>
  {
    return this.httpClient.delete<any>(environment.endpoint_url+'/api/deleteLoanRequest/'+id).pipe(map(data => {
      return data;
    }));
  }
  
  saveLoanRequest(loanRequestDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveLoanRequest/',loanRequestDetails).pipe(map(data => {
      return data;
  }));
  }

  // LOAN REQUEST

  // LOAN RECIEPT
  getloanRecieptList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getloanRecieptList').pipe(map(data => {
      return data;
    }));
  }

  getLoanApplications():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getLoanApplications').pipe(map(data => {
      return data;
    }));
  }

  getloanRecieptDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getloanRecieptDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeloanRecieptList = new EventEmitter();    
  subsloanRecieptList: Subscription;  

  EmitloanRecieptList(){
    this.invokeloanRecieptList.emit();
  }

  getTotalPaidEmiAmount(loanRecieptDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/getTotalPaidEmiAmount/',loanRecieptDetails).pipe(map(data => {
      return data;
  }));
  }

  saveLoanReciet(loanRecieptDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveLoanReciet/',loanRecieptDetails).pipe(map(data => {
      return data;
  }));
  }

  // LOAN RECIEPT

  // LEAVES MANAGEMENT

  invokeLeavesList = new EventEmitter();    
  subsLeavesList: Subscription;  

  EmitLeavesList(){
    this.invokeLeavesList.emit();
  }
  
  getLeavesList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getLeavesList').pipe(map(data => {
      return data;
    }));
  }

  getleaveDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getleaveDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  deleteLeaveDetails(id):Observable<any>
  {
    return this.httpClient.delete<any>(environment.endpoint_url+'/api/deleteLeaveDetails/'+id).pipe(map(data => {
      return data;
    }));
  }
  
  saveLeaveDetails(leavesDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveLeaveDetails/',leavesDetails).pipe(map(data => {
      return data;
  }));
  }

  getAttendanceList(attendanceDate):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/getAttendanceList/',attendanceDate).pipe(map(data => {
      return data;
  }));
  }

  getEmployeesAttendanceList(emplyeeDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/getEmployeesAttendanceList/',emplyeeDetails).pipe(map(data => {
      return data;
  }));
  }

  getAbsenceList(attendanceDate):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/getAbsenceList/',attendanceDate).pipe(map(data => {
      return data;
  }));
  }

       
  // LEAVES MANAGEMENT

  // DASHBOARD
  getDashboardLoanData():Observable<any>
  {
    return this.httpClient.get(environment.endpoint_url+'/api/getDashboardLoanData/').pipe(map(data => {
      return data;
  }));
  }

  

  // Chat

  getChatLog(userid):Observable<any>
  {
    return this.httpClient.get(environment.endpoint_url+'/api/getChatLog/'+userid).pipe(map(data => {
      return data;
  }));
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
}

public getMessages = () => {
  return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
  });
}
  
  // DASHBOARD

  // CAMPAIGN

  getnewsLettersList():Observable<any>
  {
    return this.httpClient.get(environment.endpoint_url+'/api/getnewsLettersList/').pipe(map(data => {
      return data;
  }));
  }

  getnewsLetterDetails(id):Observable<any>
  {
    return this.httpClient.get(environment.endpoint_url+'/api/getnewsLetterDetails/'+id).pipe(map(data => {
      return data;
  }));
  }

  getnewsLetterJsonTemplate(id):Observable<any>
  {
    return this.httpClient.get(environment.endpoint_url+'/api/getnewsLetterJsonTemplate/'+id).pipe(map(data => {
      return data;
  }));
  }

  getnewsLetterHtmlTemplate(id):Observable<any>
  {
    return this.httpClient.get(environment.endpoint_url+'/api/getnewsLetterHtmlTemplate/'+id).pipe(map(data => {
      return data;
  }));
  }
 
  

  
  saveNewsLetter(templateDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveNewsLetter/',templateDetails).pipe(map(data => {
      return data;
  }));
  }

  shareOnMessage(shredDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/shareOnMessage/',shredDetails).pipe(map(data => {
      return data;
  }));
  }

  shareOnEmail(shredDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/shareOnEmail/',shredDetails).pipe(map(data => {
      return data;
  }));
  }

  

  // CAMPAIGN
}
