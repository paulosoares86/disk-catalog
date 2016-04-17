System.register(['angular2/core', '../services/disk', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, disk_1, router_1;
    var ListDisksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (disk_1_1) {
                disk_1 = disk_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ListDisksComponent = (function () {
                function ListDisksComponent(_router, _diskService) {
                    this._router = _router;
                    this._diskService = _diskService;
                    this.title = 'My Disk Collection';
                }
                ListDisksComponent.prototype.remove = function (disk) {
                    var _this = this;
                    this._diskService.remove(disk).subscribe(function (success) {
                        var index = _this.disks.indexOf(disk);
                        _this.disks.splice(index, 1);
                    }, function (err) { return console.log(err); });
                };
                ListDisksComponent.prototype.editBtnClick = function (disk) {
                    this._router.navigate(['Disk-Edit', { id: disk._id }])
                        .then(function (x) { return window.location.reload(); });
                };
                ListDisksComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._diskService.get().subscribe(function (disks) { return _this.disks = disks.json(); });
                };
                ListDisksComponent = __decorate([
                    core_1.Component({
                        selector: 'disks',
                        template: "\n      <div class=\"row\">\n        <div *ngFor=\"#disk of disks\" class=\"col s12 m4\">\n          <div class=\"card\">\n            <div class=\"card-image\">\n              <a href=\"{{disk.url}}\"><img src=\"{{disk.image}}\" alt=\"disk image\"></a>\n            </div>\n            <div class=\"card-content\">\n              <p><b>Name: </b>{{disk.name}}</p>\n              <p><b>Author: </b>{{disk.author}}</p>\n            </div>\n            <div class=\"card-action\">\n            <button class=\"btn\" (click)=\"editBtnClick(disk)\">\n              <i class=\"large material-icons\">mode_edit</i>\n            </button>\n            <button class=\"btn red darken-4 center\" (click)=\"remove(disk)\">\n              <span class=\"remove-icon\">&times;</span>\n            </button>\n          </div>\n        </div>\n      </div>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            disk_1.DiskService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, disk_1.DiskService])
                ], ListDisksComponent);
                return ListDisksComponent;
            }());
            exports_1("ListDisksComponent", ListDisksComponent);
        }
    }
});
//# sourceMappingURL=list-disks.js.map