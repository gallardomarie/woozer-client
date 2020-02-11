import { Component, OnInit } from '@angular/core';
import {AutoCompleteService} from "ionic4-auto-complete";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit, AutoCompleteService {

  constructor(
      private userService: UserService
  ) { }

  ngOnInit() {
    this.labelAttribute = 'username';
  }

  formValueAttribute: any;
  labelAttribute: string;

  getItemLabel(item: any): any {
  }

  //https://www.npmjs.com/package/ionic4-auto-complete

  getResults(term: any): any {
    if(!term) {
      return false;
    }
    /*return this.http.get('https://restcountries.eu/rest/v2/name/' + keyword).pipe(map(
        (result: any[]) => {
          return result.filter(
              (item) => {
                return item.name.toLowerCase().startsWith(
                    keyword.toLowerCase()
                );
              }
          );
        }
    ));*/
  }

}
