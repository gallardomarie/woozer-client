import { Injectable } from '@angular/core';
@Injectable()
export class CacheService {

    private emitChangeSource;

    getCache() {
        return this.emitChangeSource;
    }
    emitChange(change: any) {
        this.emitChangeSource = change;
    }
}