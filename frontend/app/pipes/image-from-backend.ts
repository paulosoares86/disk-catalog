import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'imageFromBackend'})
export class ImageFromBackendPipe implements PipeTransform {
  transform(value:String) : String {
    return `http://localhost:3000/${value}`;
  }
}
