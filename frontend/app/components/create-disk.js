System.register(['angular2/core', '../services/disk', '../models/disk'], function(exports_1, context_1) {
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
    var core_1, disk_1, disk_2;
    var CreateDiskComponent;
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
            }],
        execute: function() {
            CreateDiskComponent = (function () {
                function CreateDiskComponent(_diskService) {
                    this._diskService = _diskService;
                    this.model = new disk_2.Disk;
                    this.validationErrors = [];
                }
                CreateDiskComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._diskService.post(this.model).subscribe(function (res) { return window.location.replace('/'); }, function (res) {
                        if (res.status == 400) {
                            _this.validationErrors = JSON.parse(res._body).validationErrors;
                            console.log(JSON.parse(res._body));
                        }
                        else {
                            console.error(res);
                        }
                    });
                    console.log(this.model);
                };
                CreateDiskComponent.prototype.goBack = function () {
                    window.history.back();
                };
                CreateDiskComponent = __decorate([
                    core_1.Component({
                        selector: 'create-disk',
                        template: "\n      <h2>Create a Disk</h2>\n      <br>\n      <p *ngFor=\"#error of validationErrors\" class=\"red-text\"><strong>{{error}}</strong></p>\n      <br>\n      <form class=\"col s12\" (ngSubmit)=\"onSubmit()\" #diskForm=\"ngForm\">\n        <div class=\"row\">\n          <div class=\"input-field col s6\">\n            <input required=\"required\" id=\"name\" type=\"text\" class=\"validate\" [(ngModel)]=\"model.name\">\n            <label data-error=\"Name is required\" data-success=\"ok\" for=\"name\">Name</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s6\">\n            <input required=\"required\" id=\"author\" type=\"text\" class=\"validate\" [(ngModel)]=\"model.author\">\n            <label data-error=\"Author is required\" data-success=\"ok\" for=\"author\">Author</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s6\">\n            <input required=\"required\" id=\"price\" type=\"text\" class=\"validate\" [(ngModel)]=\"model.price\">\n            <label data-error=\"Price is required\" data-success=\"ok\" for=\"price\">Price</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"input-field col s6\">\n            <textarea required=\"required\" id=\"description\" type=\"text\" class=\"materialize-textarea\" [(ngModel)]=\"model.description\">\n            </textarea>\n            <label data-error=\"Description is required\" data-success=\"ok\" for=\"description\">Description</label>\n          </div>\n        </div>\n\n        <br>\n        <button type=\"submit\" class=\"btn blue darken-4\">Create</button>\n        <button class=\"btn red darken-4\" (click)=\"goBack()\">Cancel</button>\n      </form>\n    ",
                        providers: [disk_1.DiskService]
                    }), 
                    __metadata('design:paramtypes', [disk_1.DiskService])
                ], CreateDiskComponent);
                return CreateDiskComponent;
            }());
            exports_1("CreateDiskComponent", CreateDiskComponent);
        }
    }
});
//# sourceMappingURL=create-disk.js.map