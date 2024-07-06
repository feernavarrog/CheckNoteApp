exports.config = {
  directConnect: true,
  specs: [
    'e2e/src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu']
    },
  },
  chromeDriver: './e2e/chromedriver.exe',
  framework: 'jasmine',
  baseUrl: 'http://localhost:8100/', 
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: function () {
    browser.waitForAngularEnabled(true); 
    
    require('ts-node').register({
      project: 'tsconfig.e2e.json'
    });
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  }
};
