import { apihelper } from "../api/ApiHelper";
import { test, expect } from '../src/fixtures/apiFixtures';

const TOKEN = process.env.api_Token;
let AUTH_HEADER = { Authorization: 'Bearer{TOKEN}' };

async function createuser(apihelper: any) {
    let userdata = {
        name: 'Naveen API',
        email: 'automation_${Date.now()}@open.com',
        gender: 'male',
        status: 'active'

    };
    let response = await apihelper.post('/public/v2/users', userdata, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test 1: Create a user test + Verify AAA
//POST ---> USERID ---> GET /USERID --- VERIFY
test('Post --- Create a user', async ({ apihelper }) => {
    //create a user
    let userresponse = await createuser(apihelper);

    //GET THE USER
    let response = await apihelper.get('/public/v2/users/${userresponse.id}', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body).toBe("Naveen API");

})


//TEST 2 : Update the data
test('PUT --- Update a user', async ({ apihelper }) => {
    //create a user
    let userresponse = await createuser(apihelper);
    let userupdateddata = {
        name: 'Naveen API Updated',
        status: 'inactive'
    }
    //Update THE USER
    let response = await apihelper.put('/public/v2/users/${userresponse.id}', userupdateddata, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body).toBe(userupdateddata.name);

    //GET THE USER
    let getresponse = await apihelper.get('/public/v2/users/${userresponse.id}', AUTH_HEADER);
    expect(getresponse.status).toBe(200);
    expect(getresponse.body).toBe(userupdateddata.name);


})