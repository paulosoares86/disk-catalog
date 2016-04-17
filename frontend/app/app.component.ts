import { Component }       from 'angular2/core';
import { DiskService }     from './services/disk';
import { DisksComponent } from './components/disks';

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
              <li><a href="/">List</a></li>
              <li><a href="/create">Create</a></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <disks></disks>
    </div>
  `,
  directives: [DisksComponent],
  providers: [
    DiskService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
