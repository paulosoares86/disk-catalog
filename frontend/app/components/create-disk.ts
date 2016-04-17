import {Component} from 'angular2/core';
import {DiskService} from '../services/disk';
import {Disk} from '../models/disk';

@Component({
    selector: 'create-disk',
    template: `<h2>Create disk</h2>`,
    providers: [DiskService]
})

export class CreateDiskComponent {
    constructor(private _diskService: DiskService) { }
}
