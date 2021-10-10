import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentsService } from './documents.service';
import { Document } from 'src/interfacesAndClass/DBInterfaces';

@Injectable({
  providedIn: 'root'
})
export class DOSpaceService {

  bucket: S3;
  bucketName = 'stament';

  constructor(private docService: DocumentsService) {
    this.bucket = new S3(
      {
        endpoint: 'sfo3.digitaloceanspaces.com',
        accessKeyId: environment.doAccessKey,
        secretAccessKey: environment.doSecretKey,
      }
    );
  }

  async uploadFile(file, id: string, name: string) {
    const contentType = file.type;
    const key = id + '/' + name;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    await this.bucket.upload(params, async (err, data) => {
      if (err) {
        return false;
      }
      const doc: Document = { name, url: environment.doSpaceUrl + key };
      await this.docService.postFile(doc);
      this.docService.getFiles();
      return true;
    });

    //for upload progress
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
              console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
              if (err) {
                  console.log('There was an error uploading your file: ', err);
                  return false;
              }
              console.log('Successfully uploaded file.', data);
              return true;
          });*/
  }

  deleteFile(doc: Document) {
    const key = doc.url.substring(environment.doSpaceUrl.length);
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };
    this.bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        this.docService.deleteFile(doc.id);
      }
    });
  }
}
