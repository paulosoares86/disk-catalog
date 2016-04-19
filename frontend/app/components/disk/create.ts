import {Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';

@Component({
    selector: 'create-disk',
    templateUrl: 'app/templates/disks/form.html',
    providers: [DiskService]
})

export class CreateDiskComponent {
    public model = new Disk;
    public validationErrors: String[] = [];
    public filesToUpload: Array<File> = [];

    constructor(private _diskService: DiskService) { }

    createDisk(filename) {
      var modelObj = JSON.parse(JSON.stringify(this.model));
      modelObj.image = filename;
      this._diskService.post(modelObj).subscribe(
          res => window.location.replace('/'),
          res => {
              if (res.status == 400) {
                  this.validationErrors = JSON.parse(res._body).validationErrors;
              } else {
                  console.error(res);
              }
          }
      );
    }

    onSubmit() {
        this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then(
            res => { if (res && res[0]) this.createDisk(res[0].filename) },
            error => console.error(error)
            );
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    goBack() {
        window.history.back();
    }
}
