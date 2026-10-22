import { test, expect } from '../src/fixtures/apiFixtures';
import Ajv from 'ajv';

let TOKEN = process.env.api_Token;
// Fixed string interpolation with backticks ``
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let user_id: string;

// SETUP AJV
let ajv = new Ajv();

// Define JSON schema
let userschema = {
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "name": { "type": "string" },
        "email": { "type": "string" },
        "gender": { "type": "string" },
        "status": { "type": "string" }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

test('POST & Validate Schema - Create a user', async ({ apihelper }) => {

    // 1. Prepare request payload dynamically
    let userdataschema = {
        name: 'schema data',
        email: `auto_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    // 2. Send POST request
    let createresponse = await apihelper.post("/public/v2/users", userdataschema, AUTH_HEADER);

    let userid = createresponse.body.id;

    //get - get a user
    let getuserresponse = await apihelper.get('/public/v2/users/${userid}', AUTH_HEADER);
    expect(getuserresponse.status).toBe(200);

    //schema validate code 
    let validatevariable = ajv.compile(userdataschema);//this is so important code, we are compiling it
    let isSchemavalid = validatevariable(getuserresponse.body);// we validating it the body response json and we took the output of get and storing
    if (!isSchemavalid) {
        console.log("schema errors", validatevariable.errors);
        //"If the API response data does NOT match the required schema, print out the exact errors in the console so I can see what went wrong."
    }

    expect(isSchemavalid).toBeTruthy();
});