import {Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';
import {FileUploader} from '../file-uploader';

@Component({
    selector: 'create-disk',
    templateUrl: 'app/templates/disks/form.html',
    providers: [DiskService]
})

export class CreateDiskComponent {
    public model = new Disk;
    public validationErrors: String[] = [];
    public fileUploader: FileUploader = new FileUploader();

    constructor(private _diskService: DiskService) { }

    handleError(res) {
        if (res.status == 400) {
            this.validationErrors = JSON.parse(res._body).validationErrors;
        } else {
            console.error(res);
        }
    }

    createDisk(filename) {
        this.model.image = filename;
        this._diskService.post(this.model).subscribe(
            res => window.location.replace('/'),
            res => this.handleError(res)
        );
    }

    onSubmit() {
        this.fileUploader.makeFileRequest().then(
            res => { if (res && res[0]) this.createDisk(res[0].filename) },
            res => { this.validationErrors = JSON.parse(res).validationErrors }
        );
    }

    goBack() {
        window.history.back();
    }
}
