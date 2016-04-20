import {Input, Component} from 'angular2/core';

@Component({
    selector: 'pagination',
    styles: [`
      .pagination-nav {
        padding-top: 2em;
        text-align: center;
      }
    `],
    template: `
      <nav class="pagination-nav">
        <ul class="pagination">

          <li class="page-item" [class.disabled]="currentPage == 1">
            <a class="page-link" href="{{pageIndexToLink(1)}}" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>

          <li *ngFor="#index of indexesBeforeCurrent()" class="page-item" [class.disabled]="isPageDisabled(index)">
            <a class="page-link" href="{{pageIndexToLink(index)}}">{{index}}</a>
          </li>

          <li class="page-item active">
            <a class="page-link" href="{{pageIndexToLink(currentPage)}}">
              {{currentPage}} <span class="sr-only">(current)</span>
            </a>
          </li>

          <li *ngFor="#index of indexesAfterCurrent()" class="page-item" [class.disabled]="isPageDisabled(index)">
            <a class="page-link" href="{{pageIndexToLink(index)}}">{{index}}</a>
          </li>

          <li class="page-item" [class.disabled]="currentPage == totalPages">
            <a class="page-link" href="{{pageIndexToLink(totalPages)}}" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>

        </ul>
      </nav>
    `
})

export class PaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;

  public indexesBeforeCurrent(): Array<Object> {
    if (this.currentPage > 3) {
      return [1,2, '...'];
    }
    var ret = [];
    for (var i=1; i<+this.currentPage; i++) ret.push(i);
    return ret;
  }

  public indexesAfterCurrent(): Array<Object> {
    if (+this.totalPages -this.currentPage >= 3) {
      return ['...', +this.totalPages -1 , +this.totalPages ];
    }
    var ret = [];
    for (var i= +this.currentPage+1; i<= +this.totalPages; i++) ret.push(i);
    return ret;
  }

  public pageIndexToLink(index: Object) {
    if (index == '...') return '#';
    var search = window.location.search;
    if (search.indexOf('page=') >= 0) {
      var searchParams = search.split('&');
      var pageParamIndex = searchParams.indexOf('page=');
      searchParams[pageParamIndex] = 'page=' + index;
      search = searchParams.join('&');
    } else if (search) {
      search += '&page=' + index;
    } else {
      search += '?page=' + index;
    }
    return `${window.location.pathname}${search}`;
  }

  public isPageDisabled(index: Object) {
    return index == '...';
  }
}
