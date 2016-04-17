import {Component} from 'angular2/core';
import {DiskService} from '../services/disk';
import {Disk} from '../models/disk';
import {OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'edit-disk',
    template: `
      <h2>
        Disk Details <span class="right">
          <a *ngIf="!isEditing" class="btn-floating btn-large waves-effect waves-light teal darken-4" (click)="startEditing()">
            <i class="material-icons">mode_edit</i>
          </a>

          <a *ngIf="isEditing" class="btn-floating btn-large waves-effect waves-light red darken-4 center" (click)="cancelEditing()">
            <span class="remove-icon">&times;</span>
          </a>

          <a *ngIf="isEditing" class="btn-floating btn-large waves-effect waves-light blue darken-4 center" (click)="save()">
            <i class="material-icons">done</i>
          </a>
        </span>
      </h2>

      <br>
      <br>
      <img src="{{disk.image}}" alt="disk image">
      <br>
      <br>
      <h5>
        <span *ngIf="!isEditing">
          <b>Name: </b> {{disk.name}}
        </span>
        <span *ngIf="isEditing">
          <b>Name: </b>
          <div class="row">
            <div class="col s8">
              <input type="text" [(ngModel)]="disk.name"/>
            </div>
          </div>
        </span>
      </h5>
      <br>
      <h5>
        <span *ngIf="!isEditing">
          <b>Author: </b> {{disk.author}}
        </span>
        <span *ngIf="isEditing">
          <b>Author: </b>
          <div class="row">
            <div class="col s8">
              <input type="text" [(ngModel)]="disk.author"/>
            </div>
          </div>
        </span>
      </h5>
      <br>
      <h5>
        <span *ngIf="!isEditing">
          <b>Description: </b> {{disk.description}}
        </span>
        <span *ngIf="isEditing">
          <b>Description: </b>
          <div class="row">
            <div class="col s8">
              <textarea type="text" [(ngModel)]="disk.description" class="materialize-textarea">
              </textarea>
            </div>
          </div>
        </span>
      </h5>
    `,
    providers: [DiskService]
})

export class EditDiskComponent implements OnInit {
    public disk: Disk = new Disk;
    public oldDisk: Disk;
    public isEditing: Boolean = false;

    startEditing() {
        // saves an old copy to rollback
        this.oldDisk = JSON.parse(JSON.stringify(this.disk));
        this.isEditing = true;
    }

    cancelEditing() {
        this.disk = this.oldDisk;
        this.isEditing = false;
    }

    save() {
      this._diskService.update(this.disk).subscribe(
        res => {
          console.log(`Disk updated to ${JSON.stringify(this.disk)}`);
          this.isEditing = false;
        },
        res => {
          console.error(res);
          this.isEditing = false;
        }
      );
    }

    constructor(
        private _diskService: DiskService,
        private _routeParams: RouteParams) { }

    ngOnInit() {
        this._diskService.show(this._routeParams.get('id'))
            .subscribe(res => this.disk = res.json())
    }
}
