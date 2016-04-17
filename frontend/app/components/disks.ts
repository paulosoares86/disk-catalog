import {Component} from 'angular2/core';
import {DiskService} from '../services/disk';
import {Disk} from '../models/disk';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'disks',
    template: `
      <div class="row">
        <div *ngFor="#disk of disks" class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <a href="{{disk.url}}"><img src="images/sample-1.jpg"></a>
            </div>
            <div class="card-content">
              <p><b>Name: </b>{{disk.name}}</p>
              <p><b>Author: </b>{{disk.author}}</p>
            </div>
            <div class="card-action">
            <button class="btn"><i class="large material-icons">mode_edit</i></button>
            <button class="btn red darken-4 center" (click)="remove(disk)">
              <span class="remove-icon">&times;</span>
            </button>
          </div>
        </div>
      </div>
    `,
    providers: [DiskService]
})

export class DisksComponent implements OnInit {
    title = 'My Disk Collection';
    public disks: Disk[];

    public remove(disk: Disk) {
        this._diskService.remove(disk).subscribe(
            success => {
                var index = this.disks.indexOf(disk);
                this.disks.splice(index, 1);
            },
            err => console.log(err)
        );
    }

    constructor(private _diskService: DiskService) { }

    ngOnInit() {
        this._diskService.get().subscribe(disks => this.disks = disks.json());
    }
}
