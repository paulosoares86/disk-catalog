import {Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';
import {OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ImageFromBackendPipe} from '../../pipes/image-from-backend';
import {FileUploader} from '../file-uploader';

@Component({
    selector: 'edit-disk',
    templateUrl: 'app/templates/disks/edit.html',
    providers: [DiskService],
    pipes: [ImageFromBackendPipe]
})

export class EditDiskComponent implements OnInit {
    public disk: Disk = new Disk;
    public oldDisk: Disk;
    public isEditing: Boolean = false;
    public fileUploader: FileUploader = new FileUploader();

    startEditing() {
        // saves an old copy to rollback
        this.oldDisk = JSON.parse(JSON.stringify(this.disk));
        this.isEditing = true;
    }

    cancelEditing() {
        this.disk = this.oldDisk;
        this.isEditing = false;
    }

    updateDisk(image) {
      this.disk.image = image;
      this._diskService.update(this.disk).subscribe(
          res => console.log('success'),
          res => console.error(res),
          () => this.isEditing = false
      );
    }

    save() {
      this.fileUploader.makeFileRequest().then(
          res => { if (res && res[0]) this.updateDisk(res[0].filename) },
          error => console.error(error)
      );
    }

    constructor(
        private _diskService: DiskService,
        private _routeParams: RouteParams) { }

    ngOnInit() {
        this._diskService.show(this._routeParams.get('id'))
            .subscribe(res => this.disk = res.json())
    }
}
