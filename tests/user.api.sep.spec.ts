import { describe } from 'node:test';
import { apihelper } from '../api/ApiHelper';
import { test, expect } from '../src/fixtures/apiFixtures';

const TOKEN = process.env.api_Token!;
let AUTH_HEADER = { Authorization: 'Bearer ${TOKEN}' };
let userid: number;
test.describe.serial('running e2e go rest crud apis test', () => {


    test('Get API ----get all usersS', async ({ apihelper }) => {
        let response = await apihelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(10);

    });

    test('POST API ---- Create a user', async ({ apihelper }) => {

        let user_data = {
            name: 'naveen auto',
            email: 'automation_$(Date.now()}@open.com',
            geneder: 'male',
            status: 'active',
        }
        let response = await apihelper.post('/public/v2/users', user_data, AUTH_HEADER);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(user_data.name);
    });

    test('PUT API ----- Update the user ', async ({ apihelper }) => {
        let updated_data = {
            name: 'naven api updated',
            status: 'inactive'

        };
        let response = await apihelper.put('/public/v2/users/${userid}', updated_data, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updated_data.name);
        expect(response.body.status).toBe(updated_data.status);



    })
});