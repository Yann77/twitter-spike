# YrTwitterApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.
Node version is v8.4.0, npm is 5.3.0 and angular cli 1.3.1 was installed globally with 'npm install -g @angular/cli'
First update /proxy/config.json config file with your twitter credentials
```
{
  "consumerKey": "Yours",
  "consumerSecret": "Yours",
  "accessToken": "",
  "accessTokenSecret": "",
  "port": "7890"
}
```
Then run 'npm start' to build, start proxy and serve with angular cli.
It is equivalent to run 'npm run serve-build' and then 'ng serve'.
Go to http://localhost:4200/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
