import {Input, Component} from 'angular2/core';
import {DiskService} from '../../services/disk';
import {Disk} from '../../models/disk';
import {CreateDiskComponent} from './create';
import {EditDiskComponent} from './edit';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'disk-item',
    templateUrl: 'app/templates/disks/item.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, DiskService]
})
export class DiskItemComponent {
    @Input() disk: Disk;
    @Input() collection: Disk[];

    public canRemove: Boolean = true;
    public remove(disk: Disk) {
        this.canRemove = false;
        this._diskService.remove(disk).subscribe(
            success => {
              var index = this.collection.indexOf(disk);
              this.collection.splice(index, 1);
            },
            err => console.log(err)
          );
    }

    public editBtnClick(disk) {
        this._router.navigate(['Disk-Edit', { id: disk._id }])
            .then(x => window.location.reload());
    }

    constructor(private _router: Router, private _diskService: DiskService) { }

}
