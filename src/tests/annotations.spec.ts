import { test } from '@playwright/test';


//-----------------------------------------------------------------------------------------------------------------------------
// test.describe
test.describe('Test Describe annotation Validation', () => {
  test('Test 1', async ({  }) => {
    // your test logic here
  });

  test('Test 2', async ({  }) => {
    // your test logic here
  });

  test('Test 3', async ({  }) => {
    // your test logic here
  });
});

//-----------------------------------------------------------------------------------------------------------------------------
// test.only
test.only('Test 4', async ({  }) => {
  // runs only this test
});

test('Test 5', async ({  }) => {
  // normal test
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
// test.skip
test.skip('login page Validation', async ({  }) => {
  // skipped test
});

test.skip('login page Validation2', async ({  }) => {
  // skipped test
});

//-----------------------------------------------------------------------------------------------------------------------------
// test.fixme
test.fixme('login Test with valid Credentials', async () => {
  // marked as fixme, won’t run
});

test.fixme('login Test with valid Credentials2', async () => {
  // marked as fixme, won’t run
});

//-----------------------------------------------------------------------------------------------------------------------------
// test.setTimeout
test('login Test with invalid Credentials', async () => {
  test.setTimeout(3000);
  // test logic
});

//-----------------------------------------------------------------------------------------------------------------------------
// test.fail
test.fail('login Test with invalid Username', async () => {
  // expected to fail
});

test('login Test with invalid Username2', async () => {
  test.fail();
  // expected to fail
});

//-----------------------------------------------------------------------------------------------------------------------------
// test.slow
test('login Test with invalid Password', async () => {
  test.slow();
  // test logic
});

test('mobile test', async ({ browserName }: { browserName: string }) => {
  test.slow(browserName === 'webkit', 'WebKit is slower');
  // test logic
});

test.describe('Report Generation', () => {
  test.slow();
  test('generate report', async () => {
    // ...
  });

  test('download report', async () => {
    // ...
  });
});
