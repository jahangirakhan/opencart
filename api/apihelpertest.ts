//import apirequestcontext
//export class
//private readonly request api context and base url
//create constructors
//get
//post
//put
//delete

import { APIRequestContext } from "playwright";


export class apihelpertest {

    private readonly request: APIRequestContext;
    private readonly baseurl: string;

    constructor(request: APIRequestContext, baseurl: string) {
        this.request = request;
        this.baseurl = baseurl;
    }

    async get(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseurl}${endpoint}`, {
            headers: headers
        });
        return {
            //this will give when someone uses this method
            status: response.status(),
            body: await response.json(),
        }
    }

    async post(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post('${this.baseurl}${endpoint}',
            {
                data: data,
                headers: headers
            }
        );
        return {
            status: response.status(),
            body: response.json(),
        }
    }

    async put(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put('${this.baseurl}${endpoint}', {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: response.json()
        }

    }
    //DELETE
    async delete(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseurl}${endpoint}`, {
            headers: headers,

        });
        return {
            //object - value and pair we will get
            status: response.status()

        }
    }

}
