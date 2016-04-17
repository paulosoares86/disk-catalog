System.register(['angular2/core', '../services/disk'], function(exports_1, context_1) {
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
    var core_1, disk_1;
    var DisksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (disk_1_1) {
                disk_1 = disk_1_1;
            }],
        execute: function() {
            DisksComponent = (function () {
                function DisksComponent(_diskService) {
                    this._diskService = _diskService;
                    this.title = 'My Disk Collection';
                }
                DisksComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._diskService.get().subscribe(function (disks) { return _this.disks = disks.json(); });
                };
                DisksComponent = __decorate([
                    core_1.Component({
                        selector: 'disk',
                        template: "\n      <h1>{{title}}</h1>\n      <ul class=\"disks\">\n\n      <div class=\"row\">\n        <div *ngFor=\"#disk of disks\" class=\"col s12 m4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <a href=\"{{disk.url}}\"><img src=\"images/sample-1.jpg\"></a>\n            </div>\n            <div class=\"card-content\">\n              <p><b>Name: </b>{{disk.name}}</p>\n              <p><b>Author: </b>{{disk.author}}</p>\n              <p><b>Description: </b>{{disk.description}}</p>\n            </div>\n            <div class=\"card-action\">\n              <a href=\"{{disk.url}}\">Only ${{disk.price}}</a>\n            </div>\n          </div>\n        </div>\n      </div>\n    ",
                        providers: [disk_1.DiskService]
                    }), 
                    __metadata('design:paramtypes', [disk_1.DiskService])
                ], DisksComponent);
                return DisksComponent;
            }());
            exports_1("DisksComponent", DisksComponent);
        }
    }
});
//# sourceMappingURL=disk.js.map