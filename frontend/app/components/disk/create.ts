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
    constructor(private _diskService: DiskService) { }

    onSubmit() {
      this._diskService.post(this.model).subscribe(
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

    goBack() {
      window.history.back();
    }
}
