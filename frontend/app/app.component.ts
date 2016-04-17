import {Component} from 'angular2/core';
import {DiskService} from './services/disk';
import {CreateDiskComponent} from './components/create-disk';
import {EditDiskComponent} from './components/edit-disk';
import {ListDisksComponent} from './components/list-disks';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@RouteConfig([
  {path: '/disk-list',     name: 'Disk-List',    component: ListDisksComponent, useAsDefault: true},
  {path: '/disk-create',   name: 'Disk-Create',  component: CreateDiskComponent },
  {path: '/disk-edit/:id', name: 'Disk-Edit',    component: EditDiskComponent }
])
@Component({
    selector: 'my-app',
    template: `
    <nav>
      <div class="nav-wrapper blue darken-4">
        <div class="container">
        <a href="/" class="brand-logo">DiskCollection</a>
        <div class="row right">
          <div class="col s8">
            <form>
              <div class="input-field">
                <input id="search" type="search" />
                <label for="search"><i class="material-icons">search</i></label>
              </div>
            </form>
          </div>
          <div class="col s4">
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a [routerLink]="['Disk-List']">List</a></li>
              <li><a [routerLink]="['Disk-Create']">Create</a></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,

    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        DiskService
    ]
})
export class AppComponent {
    title = 'Tour of Heroes';
}
