import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class DiskService {
    private _headers: Headers;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
    }

    get(page) {
        return this._http.get(`http://localhost:3000/disks?page=${page}`);
    }

    remove(disk) {
        return this._http.delete(`http://localhost:3000/disks/${disk._id}`);
    }

    show(id) {
        return this._http.get(`http://localhost:3000/disks/${id}`);
    }

    update(disk) {
        var payload = JSON.stringify({ disk: disk });
        return this._http.patch(`http://localhost:3000/disks/${disk._id}`, payload, {
            headers: this._headers
        });
    }

    post(disk) {
        var payload = JSON.stringify({ disk: disk });
        return this._http.post('http://localhost:3000/disks/', payload, {
            headers: this._headers
        });
    }

    search(page, params) {
        var payload = JSON.stringify(params);
        return this._http.post(`http://localhost:3000/disks/search?page=${page}`, payload, {
            headers: this._headers
        });
    }
}
