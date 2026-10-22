import { test as baseTest, expect } from '@playwright/test';
import { apihelper } from '../../api/ApiHelper';

type apiFixtures = {
    apihelper: apihelper;
};

export let test = baseTest.extend<apiFixtures>({
    apihelper: async ({ request }, use) => {
        const apiHelper = new apihelper(
            request,
            process.env.api_BaseUrl!,
        );

        await use(apiHelper);
    },
});
export { expect } from '@playwright/test';