import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class DiskService {
  constructor(private _http: Http) {}

  get() {
    return this._http.get('http://localhost:3000/disks');
  }
}
