import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FinancialInfo } from 'src/interfacesAndClass/DBInterfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  baseurl = environment.serverUrl;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.token.subscribe((token) => {
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    });
  }

  needDeclare(): Promise<any> {
    console.log(this.httpHeaders);
    return this.http.get(this.baseurl + 'financialInformation/validateDeclaration', { headers: this.httpHeaders }).toPromise();
  }

  statementDate(): Promise<any> {
    return this.http.get(this.baseurl + 'statementDate', { headers: this.httpHeaders }).toPromise();
  }

  getFinancialInfo(): Promise<any> {
    return this.http.get(this.baseurl + 'financialInformation/', { headers: this.httpHeaders }).toPromise();
  }

  createFinancialInfo(financialInfo: FinancialInfo): Promise<any> {
    return this.http.post(this.baseurl + 'financialInformation/create/',  financialInfo , { headers: this.httpHeaders }).toPromise();
  }

  updateFinancialInfo(financialInfo: FinancialInfo): Promise<any> {
    console.log(financialInfo);
    return this.http.put(this.baseurl + 'financialInformation/update/',  financialInfo , { headers: this.httpHeaders }).toPromise();
  }

}
