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
    var CreateDiskComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (disk_1_1) {
                disk_1 = disk_1_1;
            }],
        execute: function() {
            CreateDiskComponent = (function () {
                function CreateDiskComponent(_diskService) {
                    this._diskService = _diskService;
                }
                CreateDiskComponent.prototype.remove = function (disk) {
                    var _this = this;
                    this._diskService.remove(disk).subscribe(function (success) {
                        var index = _this.disks.indexOf(disk);
                        _this.disks.splice(index, 1);
                    }, function (err) { return console.log(err); });
                };
                CreateDiskComponent = __decorate([
                    core_1.Component({
                        selector: 'disks',
                        template: "\n      <h2>Create disk</h2>\n    ",
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
//# sourceMappingURL=create-disk0.js.map