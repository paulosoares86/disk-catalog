System.register(['angular2/http', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1;
    var DiskService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DiskService = (function () {
                function DiskService(_http) {
                    this._http = _http;
                    this._headers = new http_1.Headers();
                    this._headers.append('Content-Type', 'application/json');
                }
                DiskService.prototype.get = function () {
                    return this._http.get('http://localhost:3000/disks');
                };
                DiskService.prototype.remove = function (disk) {
                    return this._http.delete("http://localhost:3000/disks/" + disk._id);
                };
                DiskService.prototype.show = function (id) {
                    return this._http.get("http://localhost:3000/disks/" + id);
                };
                DiskService.prototype.update = function (disk) {
                    var payload = JSON.stringify({ disk: disk });
                    return this._http.patch("http://localhost:3000/disks/" + disk._id, payload, {
                        headers: this._headers
                    });
                };
                DiskService.prototype.post = function (disk) {
                    var payload = JSON.stringify({ disk: disk });
                    return this._http.post('http://localhost:3000/disks/', payload, {
                        headers: this._headers
                    });
                };
                DiskService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DiskService);
                return DiskService;
            }());
            exports_1("DiskService", DiskService);
        }
    }
});
//# sourceMappingURL=disk.js.map