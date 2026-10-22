import { APIRequestContext } from '@playwright/test';

export class apihelper {
    private readonly request: APIRequestContext;
    private readonly baseurl: string;

    constructor(request: APIRequestContext, baseurl: string) {
        this.request = request;
        this.baseurl = baseurl;
    }

    // GET
    async get(endpoint: string, headers?: Record<string, string>) {
        const response = await this.request.get('${this.baseurl}${endpoint}'    , {
            headers: headers,
        });

        return {
            status: response.status(),
            body: await response.json(),
        };
    }

    // POST
    async post(
        endpoint: string,
        data: object,
        headers?: Record<string, string>
    ) {
        const response = await this.request.post(`${this.baseurl}${endpoint}`, {
            headers: headers,
            data: data,
        });

        return {
            status: response.status(),
            body: await response.json(),
        };
    }

    // PUT
    async put(
        endpoint: string,
        data: object,
        headers?: Record<string, string>
    ) {
        const response = await this.request.put(`${this.baseurl}${endpoint}`, {
            headers: headers,
            data: data,
        });

        return {
            status: response.status(),
            body: await response.json(),
        };
    }

    // DELETE
    async delete(endpoint: string, headers?: Record<string, string>) {
        const response = await this.request.delete(`${this.baseurl}${endpoint}`, {
            headers: headers,
        });

        return {
            status: response.status(),
        };
    }
}