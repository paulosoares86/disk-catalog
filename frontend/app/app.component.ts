import {Component} from 'angular2/core';
import {DiskService} from './services/disk';
import {Disk} from './models/disk';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
      <h1>{{title}}</h1>
      <ul class="disks">

      <div class="row">
        <div *ngFor="#disk of disks" class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <a href="{{disk.url}}"><img src="images/sample-1.jpg"></a>
            </div>
            <div class="card-content">
              <p><b>Name: </b>{{disk.name}}</p>
              <p><b>Author: </b>{{disk.author}}</p>
              <p><b>Description: </b>{{disk.description}}</p>
            </div>
            <div class="card-action">
              <a href="{{disk.url}}">Only \${{disk.price}}</a>
            </div>
          </div>
        </div>
      </div>
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
