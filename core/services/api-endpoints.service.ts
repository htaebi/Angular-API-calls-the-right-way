// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';
import { ApiUrlCreator } from './api-urlcreator';
import { Constants } from '../../config/constants';
@Injectable()
// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService extends ApiUrlCreator {
    constructor(constants: Constants) {
        super(constants);
     }    
    public getDataByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('data', [id]);

    public getDataByIdAndCodeEndpoint = (id: string, code: number): string => this.createUrlWithPathVariables('data', [id, code]);

    public getDataByIdCodeAndYearEndpoint(id: string, code: number, year: number): string {
        const queryString: QueryStringParameters = new QueryStringParameters();
        queryString.push('year', year);
        return `${this.createUrlWithPathVariables('data', [id, code])}?${queryString.toString()}`;
    }

    public getProductListByCountryCodeEndpoint(countryCode: string): string {
        return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => qs.push('countryCode', countryCode));
    }

    public getProductListByCountryAndPostalCodeEndpoint(countryCode: string, postalCode: string): string {
        return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => {
            qs.push('countryCode', countryCode);
            qs.push('postalCode', postalCode);
        });
    }

    public getNewsEndpoint = (): string => this.createUrl('41gRGwOaw', true);

    public invalidUrlEndpoint = (): string => this.createUrl('invalidurl', true);
}
