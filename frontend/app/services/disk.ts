import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class DiskService {
    public baseUrl: string = `//${window.location.hostname}:3000`
    private _headers: Headers;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
    }

    get(page) {
        return this._http.get(`${this.baseUrl}/disks?page=${page}`);
    }

    remove(disk) {
        return this._http.delete(`${this.baseUrl}/disks/${disk._id}`);
    }

    show(id) {
        return this._http.get(`${this.baseUrl}/disks/${id}`);
    }

    update(disk) {
        var payload = JSON.stringify({ disk: disk });
        return this._http.patch(`${this.baseUrl}/disks/${disk._id}`, payload, {
            headers: this._headers
        });
    }

    post(disk) {
        var payload = JSON.stringify({ disk: disk });
        return this._http.post(`${this.baseUrl}/disks/`, payload, {
            headers: this._headers
        });
    }

    search(page, params) {
        params.page = page || 1;
        var payload = JSON.stringify(params);
        return this._http.post(`${this.baseUrl}/disks/search`, payload, {
            headers: this._headers
        });
    }
}
