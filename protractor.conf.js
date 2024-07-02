exports.config = {
    specs: [
      './e2e/src/app.e2e-spec.ts'
    ],
    capabilities: {
      browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu']
        },
        chromeDriver: './node_modules/.bin/chromedriver.exe'
    },
    baseUrl: 'http://localhost:8100/', 

    SELENIUM_PROMISE_MANAGER: false,
    onPrepare: function () {
    }
  };
  