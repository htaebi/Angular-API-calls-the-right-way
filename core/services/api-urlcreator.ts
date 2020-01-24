// Application Constants
import { UrlBuilder } from '../../shared/classes/url-builder';
import { Constants } from '../../config/constants';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';

export class ApiUrlCreator {

    constructor(
        // Application Constants
        private constants: Constants
    ) { }

    /* #region URL CREATOR */
    // URL
    protected createUrl(action: string, isMockAPI: boolean = false): string {
        const urlBuilder: UrlBuilder = new UrlBuilder(
            isMockAPI ? this.constants.API_MOCK_ENDPOINT : this.constants.API_ENDPOINT,
            action
        );
        return urlBuilder.toString();
    }

    // URL WITH QUERY PARAMS
    protected createUrlWithQueryParameters(action: string, queryStringHandler?: (queryStringParameters: QueryStringParameters) => void): string {
        const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
        // Push extra query string params
        if (queryStringHandler) {
            queryStringHandler(urlBuilder.queryString);
        }
        return urlBuilder.toString();
    }

    // URL WITH PATH VARIABLES
    protected createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
        let encodedPathVariablesUrl: string = '';
        // Push extra path variables
        for (const pathVariable of pathVariables) {
            if (pathVariable !== null) {
                encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
            }
        }
        const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, `${action}${encodedPathVariablesUrl}`);
        return urlBuilder.toString();
    }
    /* #endregion */
}