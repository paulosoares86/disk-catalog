System.register(['angular2/core', '../services/disk', '../models/disk', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, disk_1, disk_2, router_1;
    var EditDiskComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (disk_1_1) {
                disk_1 = disk_1_1;
            },
            function (disk_2_1) {
                disk_2 = disk_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            EditDiskComponent = (function () {
                function EditDiskComponent(_diskService, _routeParams) {
                    this._diskService = _diskService;
                    this._routeParams = _routeParams;
                    this.disk = new disk_2.Disk;
                    this.isEditing = false;
                }
                EditDiskComponent.prototype.startEditing = function () {
                    // saves an old copy to rollback
                    this.oldDisk = JSON.parse(JSON.stringify(this.disk));
                    this.isEditing = true;
                };
                EditDiskComponent.prototype.cancelEditing = function () {
                    this.disk = this.oldDisk;
                    this.isEditing = false;
                };
                EditDiskComponent.prototype.save = function () {
                    var _this = this;
                    this._diskService.update(this.disk).subscribe(function (res) {
                        console.log("Disk updated to " + JSON.stringify(_this.disk));
                        _this.isEditing = false;
                    }, function (res) {
                        console.error(res);
                        _this.isEditing = false;
                    });
                };
                EditDiskComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._diskService.show(this._routeParams.get('id'))
                        .subscribe(function (res) { return _this.disk = res.json(); });
                };
                EditDiskComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-disk',
                        template: "\n      <h2>\n        Disk Details <span class=\"right\">\n          <a *ngIf=\"!isEditing\" class=\"btn-floating btn-large waves-effect waves-light teal darken-4\" (click)=\"startEditing()\">\n            <i class=\"material-icons\">mode_edit</i>\n          </a>\n\n          <a *ngIf=\"isEditing\" class=\"btn-floating btn-large waves-effect waves-light red darken-4 center\" (click)=\"cancelEditing()\">\n            <span class=\"remove-icon\">&times;</span>\n          </a>\n\n          <a *ngIf=\"isEditing\" class=\"btn-floating btn-large waves-effect waves-light blue darken-4 center\" (click)=\"save()\">\n            <i class=\"material-icons\">done</i>\n          </a>\n        </span>\n      </h2>\n\n      <br>\n      <br>\n      <img src=\"{{disk.image}}\" alt=\"disk image\">\n      <br>\n      <br>\n      <h5>\n        <span *ngIf=\"!isEditing\">\n          <b>Name: </b> {{disk.name}}\n        </span>\n        <span *ngIf=\"isEditing\">\n          <b>Name: </b>\n          <div class=\"row\">\n            <div class=\"col s8\">\n              <input type=\"text\" [(ngModel)]=\"disk.name\"/>\n            </div>\n          </div>\n        </span>\n      </h5>\n      <br>\n      <h5>\n        <span *ngIf=\"!isEditing\">\n          <b>Author: </b> {{disk.author}}\n        </span>\n        <span *ngIf=\"isEditing\">\n          <b>Author: </b>\n          <div class=\"row\">\n            <div class=\"col s8\">\n              <input type=\"text\" [(ngModel)]=\"disk.author\"/>\n            </div>\n          </div>\n        </span>\n      </h5>\n      <br>\n      <h5>\n        <span *ngIf=\"!isEditing\">\n          <b>Description: </b> {{disk.description}}\n        </span>\n        <span *ngIf=\"isEditing\">\n          <b>Description: </b>\n          <div class=\"row\">\n            <div class=\"col s8\">\n              <textarea type=\"text\" [(ngModel)]=\"disk.description\" class=\"materialize-textarea\">\n              </textarea>\n            </div>\n          </div>\n        </span>\n      </h5>\n    ",
                        providers: [disk_1.DiskService]
                    }), 
                    __metadata('design:paramtypes', [disk_1.DiskService, router_1.RouteParams])
                ], EditDiskComponent);
                return EditDiskComponent;
            }());
            exports_1("EditDiskComponent", EditDiskComponent);
        }
    }
});
//# sourceMappingURL=edit-disk.js.map