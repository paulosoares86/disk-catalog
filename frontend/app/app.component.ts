
import {Component} from 'angular2/core';
import {DiskService} from './services/disk';
import {CreateDiskComponent} from './components/disk/create';
import {EditDiskComponent} from './components/disk/edit';
import {ListDisksComponent} from './components/disk/list';
import {SearchDiskComponent} from './components/disk/search';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@RouteConfig([
    { path: '/disk-list', name: 'Disk-List', component: ListDisksComponent, useAsDefault: true },
    { path: '/disk-create', name: 'Disk-Create', component: CreateDiskComponent },
    { path: '/disk-edit/:id', name: 'Disk-Edit', component: EditDiskComponent }
])
@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app/index.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        DiskService
    ]
})
export class AppComponent {
    public query: String;

    onSubmit() {
        if (!this.query) return;
        this._router.navigate(['Disk-List', { query: this.query }]);
    }

    constructor(private _router: Router) { }
}
