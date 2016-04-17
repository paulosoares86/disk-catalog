System.register(['angular2/core', './services/disk', './components/create-disk', './components/edit-disk', './components/list-disks', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, disk_1, create_disk_1, edit_disk_1, list_disks_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (disk_1_1) {
                disk_1 = disk_1_1;
            },
            function (create_disk_1_1) {
                create_disk_1 = create_disk_1_1;
            },
            function (edit_disk_1_1) {
                edit_disk_1 = edit_disk_1_1;
            },
            function (list_disks_1_1) {
                list_disks_1 = list_disks_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    router_1.RouteConfig([
                        { path: '/disk-list', name: 'Disk-List', component: list_disks_1.ListDisksComponent, useAsDefault: true },
                        { path: '/disk-create', name: 'Disk-Create', component: create_disk_1.CreateDiskComponent },
                        { path: '/disk-edit/:id', name: 'Disk-Edit', component: edit_disk_1.EditDiskComponent }
                    ]),
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <nav>\n      <div class=\"nav-wrapper blue darken-4\">\n        <div class=\"container\">\n        <a href=\"/\" class=\"brand-logo\">DiskCollection</a>\n        <div class=\"row right\">\n          <div class=\"col s8\">\n            <form>\n              <div class=\"input-field\">\n                <input id=\"search\" type=\"search\" />\n                <label for=\"search\"><i class=\"material-icons\">search</i></label>\n              </div>\n            </form>\n          </div>\n          <div class=\"col s4\">\n            <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n              <li><a [routerLink]=\"['Disk-List']\">List</a></li>\n              <li><a [routerLink]=\"['Disk-Create']\">Create</a></li>\n            </ul>\n          </div>\n        </div>\n        </div>\n      </div>\n    </nav>\n    <div class=\"container\">\n      <router-outlet></router-outlet>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            disk_1.DiskService
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map