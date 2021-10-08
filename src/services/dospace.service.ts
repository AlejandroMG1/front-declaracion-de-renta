import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DOSpaceService {

  bucket: S3;
  bucketName= 'stament';

  constructor() {
    this.bucket = new S3(
      {
        endpoint: 'sfo3.digitaloceanspaces.com',
        accessKeyId: '7AUQ35UIMPZBTHK4A6GO',
        secretAccessKey: 'z7u4HTXgVKUqAmjO3TzTf+RrL5QfFEVKKHeG3sYvpsw',
      }
    );
  }

  uploadFile(file, id) {
    const contentType = file.type;
    const params = {
      Bucket: this.bucketName,
      Key: id + '/' +new Date().toISOString()+ file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    this.bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
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

}
