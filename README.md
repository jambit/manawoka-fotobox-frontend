# ManawokaFotoboxFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Deployment

 - build the latest version of the project without the `--prod` flag !!!
 - run `docker build -t fotobox:latest .`
 - run `docker build buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t fotobox:latest .`
 - save dockerimage as .tar file `docker save -o ./fotobox.tar fotobox:latest`
 - copy the file `fotobox.tar` on the RaspberryPi
 
#### on the RaspberryPi: 
 
 - load the docker image from the tar file: ` docker load -i <path to image tar file>`
 - run the docker container: `docker run -p 80:80 -v /media/pi/382E1C5B2E1C150A/pictures:/www/data fotobox:latest`
