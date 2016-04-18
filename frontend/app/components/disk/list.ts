import {Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';
import {OnInit} from 'angular2/core';
import {DiskItemComponent} from './item';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'disks',
    templateUrl: 'app/templates/disks/index.html',
    directives: [ROUTER_DIRECTIVES, DiskItemComponent],
    providers: [ROUTER_PROVIDERS, DiskService]
})
export class ListDisksComponent implements OnInit {
    public title: String = 'My Disk Collection';
    public disks: Disk[] = [];

    constructor(private _diskService: DiskService) { }

    ngOnInit() {
        this._diskService.get().subscribe(disks => this.disks = disks.json());
    }
}
