import {Component} from 'angular2/core';
import {DiskService} from '../services/disk';
import {Disk} from '../models/disk';
import {OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'edit-disk',
    template: `
      <h2>Disk Details</h2>

      <br>
      <br>
      <img src="{{disk.image}}" alt="disk image">
      <br>
      <h5>
        <span *ngIf="!isEditing" (click)="startEditing()">
          <b>Name: </b> {{disk.name}} <i class="material-icons">mode_edit</i>
        </span>
        <span *ngIf="isEditing">
          <b>Name: </b>
          <div class="row">
            <div class="col s8">
              <input type="text" placeholder="{{disk.name}}"/>
            </div>
            <div class="col s4">
              <button class="btn small red darken-4 center" (click)="save()">
                <span>&times;</span>
              </button>
              <button class="btn small blue darken-4 center" (click)="cancelEditing()">
                <i class="material-icons">done</i>
              </button>
            </div>
          </div>
        </span>
      </h5>
      <h5>
        <b>Author: </b>{{disk.name}} <i *ngIf="!isEditing" class="material-icons">mode_edit</i>
      </h5>
      <p>
        <b>Description: </b>{{disk.description}} <i *ngIf="!isEditing" class="tiny material-icons">mode_edit</i>
      </p>
    `,
    providers: [DiskService]
})

export class EditDiskComponent implements OnInit {
    public disk: Disk = new Disk;
    public oldDisk: Disk;
    public isEditing: Boolean = false;

    startEditing() {
        this.oldDisk = this.disk;
        this.isEditing = true;
    }

    cancelEditing() {
        this.disk = this.oldDisk;
        this.isEditing = false;
    }

    constructor(
        private _diskService: DiskService,
        private _routeParams: RouteParams) { }

    ngOnInit() {
        this._diskService.show(this._routeParams.get('id'))
            .subscribe(res => this.disk = res.json())
    }
}
