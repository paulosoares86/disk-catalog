import {Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';
import {OnInit} from 'angular2/core';
import {DiskItemComponent} from './item';
import {PaginationComponent} from '../pagination.component';
import {Router, RouteParams, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'disks',
    templateUrl: 'app/templates/disks/index.html',
    directives: [ROUTER_DIRECTIVES, DiskItemComponent, PaginationComponent],
    providers: [ROUTER_PROVIDERS, DiskService]
})
export class ListDisksComponent implements OnInit {
    public title: String = 'My Disk Collection';
    public disks: Disk[] = [];
    public currentPage: number = 1;
    public totalPages: number = 1;
    public baseUrl: string = '/disk-list';

    constructor(
      private _diskService: DiskService,
      private _routeParams: RouteParams) { }

    ngOnInit() {
        var page = this._routeParams.get('page') || 1;
        this._diskService.get(page).subscribe(res => {
          var jsonResponse = res.json();
          this.currentPage = jsonResponse.page;
          this.totalPages = jsonResponse.pages;
          this.disks = jsonResponse.disks;
        });
    }
}
