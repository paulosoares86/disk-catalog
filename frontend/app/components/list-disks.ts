import {Component} from 'angular2/core';
import {DiskService} from '../services/disk';
import {Disk} from '../models/disk';
import {OnInit} from 'angular2/core';
import {CreateDiskComponent} from './create-disk';
import {EditDiskComponent} from './edit-disk';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'disks',
    templateUrl: 'app/templates/disks/index.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        DiskService
    ]
})

export class ListDisksComponent implements OnInit {
    title = 'My Disk Collection';
    public disks: Disk[] = [];

    public remove(disk: Disk) {
        this._diskService.remove(disk).subscribe(
            success => {
                var index = this.disks.indexOf(disk);
                this.disks.splice(index, 1);
            },
            err => console.log(err)
        );
    }

    public editBtnClick(disk) {
        this._router.navigate(['Disk-Edit', { id: disk._id }])
                    .then(x => window.location.reload());
    }

    constructor(
        private _router: Router,
        private _diskService: DiskService) { }

    ngOnInit() {
        this._diskService.get().subscribe(disks => this.disks = disks.json());
    }
}
