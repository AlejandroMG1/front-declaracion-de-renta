import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Document } from 'src/interfacesAndClass/DBInterfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  baseurl = environment.serverUrl;
  public userDocs: Document[] = [];
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.token.subscribe((token) => {
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    });
  }

  async getFiles() {
    this.userDocs = await this.http.get<Document[]>(this.baseurl + 'documment', { headers: this.httpHeaders }).toPromise();
    console.log(this.userDocs);
  }

  postFile(doc: Document) {
    return this.http.post<Document[]>(this.baseurl + 'documment', doc, { headers: this.httpHeaders }).toPromise();
  }

  deleteFile(id: number) {
    this.http.delete(this.baseurl + 'documment/' + id, { headers: this.httpHeaders }).toPromise().then(
      () => { this.userDocs = this.userDocs.filter(d => d.id !== id); });
  }
}
