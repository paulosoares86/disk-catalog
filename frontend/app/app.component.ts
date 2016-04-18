import {Component} from 'angular2/core';
import {DiskService} from './services/disk';
import {CreateDiskComponent} from './components/create-disk';
import {EditDiskComponent} from './components/edit-disk';
import {ListDisksComponent} from './components/list-disks';
import {SearchDiskComponent} from './components/search-disks';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@RouteConfig([
    { path: '/disk-list', name: 'Disk-List', component: ListDisksComponent, useAsDefault: true },
    { path: '/disk-create', name: 'Disk-Create', component: CreateDiskComponent },
    { path: '/disk-search', name: 'Disk-Search', component: SearchDiskComponent },
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
        this._router.navigate(['Disk-Search', { query: this.query }])
            .then(res => window.location.reload())
            .catch(res => console.log(res));
    }

    constructor(private _router: Router) { }
}
