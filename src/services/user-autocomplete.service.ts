import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic4-auto-complete';
import {UserService} from './user.service';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class UserAutocompleteService implements AutoCompleteService {

    labelAttribute = 'username';
    formValueAttribute = 'username';

    constructor(
        private userService: UserService
    ) {
    }

    getResults(keyword: string) {
        if (!keyword) {
            return false;
        }

        return this.userService.searchByUsername(keyword).pipe(map(
        (result: any[]) => {
            return result.filter(
                (item) => {
                    return item.username;
                }
                );
            }
        ));
    }
}