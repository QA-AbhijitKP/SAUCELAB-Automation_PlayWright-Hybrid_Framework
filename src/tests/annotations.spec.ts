import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const URL = process.env.URL!;

// test.describe-

test.describe('Test Describe annotation Validation', () => {

    test('Test 1', async ({ page }) => {

    });

    test('Test 2', async ({ page }) => {

    });

    test('Test 3', async ({ page }) => {

    });

});

//-----------------------------------------------------------------------------------------------------------------------------

// test-only

test.only('Test 4',  () => {

});

test('Test 5', () => {
   // test.only();

});


test.describe.only('Test Describe annotation Validation - only', () => {

    test('Test 1', async () => {
        console.log('Login Page Title and URL are verified successfully');
        
    });

    test('Test 2', async () => {
        console.log('Login Page Title and URL are verified successfully');
        
    });

    test('Test 3', async () => {
        console.log('Login Page Title and URL are verified successfully');
        
    });

});

//-----------------------------------------------------------------------------------------------------------------------------

// Test- Skip annotation- Skip test
test.skip('login page Validation', async ({ page }) => {
  
});

test('login page Validation2', async ({ page }) => {
    test.skip();
   
});

//-----------------------------------------------------------------------------------------------------------------------------
// test.fixme annotation- Known issue, don't run
test.fixme('login Test with valid Credentials', async () => {
    
});

test('login Test with valid Credentials2', async () => {
    test.fixme();
    
});


//-----------------------------------------------------------------------------------------------------------------------------

//test.setTimeout annotation-
test('login Test with invalid Credentials', async ({ page }) => {
    test.setTimeout(3000);    
});


//-----------------------------------------------------------------------------------------------------------------------------

// test.fail annotation- Expected to fail
test.fail('login Test with invalid Username', async ({ page }) => {
        
});

test('login Test with invalid Username2', async ({ page }) => {
    test.fail();        
});

//-----------------------------------------------------------------------------------------------------------------------------

// test.slow Annotations- Triple timeout

// Single test as slow-
test('login Test with invalid Password', async ({ page }) => {
    test.slow();        
});

// Conditional slow-
test('mobile test', async ({ page, browserName }) => {
  test.slow(browserName === 'webkit', 'WebKit is slower');
});

// callback slow-
test.describe('Report Generation', () => {
        test.slow();

        test('generate report', async ({ page }) => {
            // ...
        });

        test('download report', async ({ page }) => {
            // ...
        });
});



//-----------------------------------------------------------------------------------------------------------------------------

