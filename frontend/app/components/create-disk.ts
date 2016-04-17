import {Component} from 'angular2/core';
import {DiskService} from '../services/disk';
import {Disk} from '../models/disk';

@Component({
    selector: 'create-disk',
    template: `
      <h2>Create a Disk</h2>
      <br>
      <p *ngFor="#error of validationErrors" class="red-text"><strong>{{error}}</strong></p>
      <br>
      <form class="col s12" (ngSubmit)="onSubmit()" #diskForm="ngForm">
        <div class="row">
          <div class="input-field col s6">
            <input required="required" id="name" type="text" class="validate" [(ngModel)]="model.name">
            <label data-error="Name is required" data-success="ok" for="name">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input required="required" id="author" type="text" class="validate" [(ngModel)]="model.author">
            <label data-error="Author is required" data-success="ok" for="author">Author</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input required="required" id="price" type="text" class="validate" [(ngModel)]="model.price">
            <label data-error="Price is required" data-success="ok" for="price">Price</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <textarea required="required" id="description" type="text" class="materialize-textarea" [(ngModel)]="model.description">
            </textarea>
            <label data-error="Description is required" data-success="ok" for="description">Description</label>
          </div>
        </div>

        <br>
        <button type="submit" class="btn blue darken-4">Create</button>
        <button class="btn red darken-4" (click)="goBack()">Cancel</button>
      </form>
    `,
    providers: [DiskService]
})

export class CreateDiskComponent {
    public model = new Disk;
    public validationErrors: String[] = [];
    constructor(private _diskService: DiskService) { }

    onSubmit() {
      this._diskService.post(this.model).subscribe(
         res => window.location.replace('/'),
         res => {
           if (res.status == 400) {
             this.validationErrors = JSON.parse(res._body).validationErrors;
             console.log(JSON.parse(res._body))
           } else {
             console.error(res);
           }
         }
      );
      console.log(this.model);
    }

    goBack() {
      window.history.back();
    }
}
