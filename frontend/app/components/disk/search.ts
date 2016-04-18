import {Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';
import {OnInit} from 'angular2/core';
import {DiskItemComponent} from './item';
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'disks',
    templateUrl: 'app/templates/disks/index.html',
    directives: [ROUTER_DIRECTIVES, DiskItemComponent],
    providers: [ROUTER_PROVIDERS, DiskService]
})
export class SearchDiskComponent implements OnInit {
    public title = 'Search Disks';
    public disks: Disk[];

    constructor(
        private _diskService: DiskService,
        private _routeParams: RouteParams) { }

    ngOnInit() {
        var query = this._routeParams.get('query');
        this._diskService.search({query: query}).subscribe(
          res => this.disks = res.json().disks,
          err => console.error(err)
        );
    }
}
