import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFileService} from "../../Service/upload-file.service";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../Service/alert.service";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  //members
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  fileUploaded = false;

  //constructor
  constructor(private uploadService: UploadFileService,
              private alertService: AlertService,
              private translate: TranslateService) {
  }

  //methods
  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.fileUploaded = false;
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
              console.log(this.message);
              this.alertService.success(this.translate.instant("FileSuccessfullyUploaded"));
              this.fileUploaded = true;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
              console.log(this.errorMsg);
            } else {
              console.log('Error occurred while uploading a file!');
              this.alertService.error(this.translate.instant("ErrorOccurDuringUploadingFile"));
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

}
