import {Component} from 'angular2/core';
import {DiskService} from './services/disk';
import {Disk} from './models/disk';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
      <h1>{{title}}</h1>
      <ul class="disks">
        <li *ngFor="#disk of disks">
          <div><label>name: </label>{{disk.name}}</div>
          <div><label>author: </label>{{disk.author}}</div>
          <div><label>price: </label>{{disk.price}}</div>
          <div><label>description: </label>{{disk.description}}</div>
          <br>
        </li>
      </ul>
    `,
    providers: [DiskService]
})
export class AppComponent implements OnInit {
    title = 'My Disk Collection';
    public disks: Disk[];

    constructor(private _diskService: DiskService) { }

    ngOnInit() {
      this._diskService.get().subscribe(disks => this.disks = disks.json());
    }
}
