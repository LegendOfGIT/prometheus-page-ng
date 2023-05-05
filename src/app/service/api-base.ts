import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

export type ReplacementType = { [key: string]: string };

export abstract class ApiBase {

    private static cache: Map<string, Observable<any>> = new Map();

    constructor(protected apiBasePath: string) { }

    /**
     * Returns the modified URL
     */
    protected get(endpoint: string, pathReplacements?: { [key: string]: string }): string {
        const path = this.apiBasePath;
        let end = endpoint;
        if (!!pathReplacements && Object.keys(pathReplacements).length > 0) {
            Object.keys(pathReplacements).forEach(key => {
                const value = pathReplacements[key] || '';
                end = end.replace(new RegExp(`{${key}}`, 'g'), value);
            });
        }

        return `${path}${end}`.split(/[^?=&]+=[&|$]/).join('');
    }

    protected getDefaultContentType() {
        return {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    protected checkCache<T>(url: string, data: Observable<T>): Observable<T> | undefined {

        if (!ApiBase.cache.has(url)) {
            ApiBase.cache.set(url, data.pipe(shareReplay(1)));
        }

        return ApiBase.cache.get(url);

    }

    protected removeCache(url: string) {
        if (ApiBase.cache.has(url)) {
            ApiBase.cache.delete(url);
        }
    }
}
