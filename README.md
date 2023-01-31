# CURSO DE ANGULAR 05: ANGULAR FORMS

[LINK DEL CURSO](https://platzi.com/clases/2897-angular-unit-testing-servicios/47472-jest-vs-jasmine-entornos-de-testing-para-angular/)

# LINK TO GITHUB PROJECT

[LINK TO GITHUG PROJECT](https://github.com/platzi/curso-angular-unit-testing-servicios/)

# LINK TO APP IN PRODUCTION NETLIFY

[LINK TO APP IN PRODUCTION NETLIFY]()

## CREATED BY

Juan Manuel Luna Blanco
[Instagram: gotth3way](https://www.instagram.com/gotth3way.apis/)
[Instagram: Kryptonite](https://www.instagram.com/kryptonite.original/)

[Linkedin](https://www.linkedin.com/in/juan-manuel-luna-blanco-180a1570/)

[Youtube: desarrolladorhoy](https://www.youtube.com/channel/UCSEwIRkDJxLkbvKHOAcw_Xw)
[Youtube: Kryptonite](https://www.youtube.com/channel/UCSEwIRkDJxLkbvKHOAcw_Xw)

[LINK GITHUB PROYECT]()

## INSTALACIONES

> node -v                 // v16.17.0
> npm -v                  // 8.15.0
> npm i -g @angular/cli
> ng version              // 16.17.0

## CREAR UN PROYECTO CON EL CLI DE ANGULAR

// WARNING Este proyecto está creado con la versión 10.07 de angular, copiado del repo de platzi rama init

> ng new my-store-app-api
> cd my-store-app-api
> ng serve
> ng test

visit (http://localhost:4200)

## SOME THINGS OF THIS CLI

### MyStoreWithAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Arrancar el servidor de desarrollo

> ng serve -o                 // servir el proyecto
> ng serve -o --port=3500     //  en el puerto especificado
> ng version

```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
```

Angular CLI: 15.0.4
Node: 16.17.0
Package Manager: npm 8.15.0
OS: win32 x64
Angular: 15.0.4

... animations, cli, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1500.4
@angular-devkit/build-angular   15.0.4
@angular-devkit/core            15.0.4
@angular-devkit/schematics      15.0.4
@schematics/angular             15.0.4
rxjs                            7.5.7
typescript                      4.8.4

## Archivos importantes de Configuración

### archivos de configuración de typescript y angular

tsconfig.json
tsconfig.app.json
tsconfig.spec.json


### browser listado de compatibilidades

.browserlistrc


### editor

.editorconfig


### angular

angular.json


### testing

karma.conf.json


### Node version manager

.nvmrc

### Extensiones de VSC

Angular language Service
editor config
eslint

## Linter para el proyecto

> npm install eslint --save-dev   // lo instala

## ESLINT EXTENSION

The extension uses the ESLint library installed in the opened workspace folder. If the folder doesn't provide one the extension looks for a global install version. If you haven't installed ESLint either locally or globally do so by running <b>npm install eslint</b> in the workspace folder for a local install or npm install -g eslint for a global install.

On new folders you might also need to create a .eslintrc configuration file. You can do this by either using the VS Code command Create ESLint configuration or by running the eslint command in a terminal. If you have installed ESLint globally (see above) then run

> eslint --init

in a terminal. If you have installed ESLint locally then run

> .\node_modules\.bin\eslint --init

under Windows and ./node_modules/.bin/eslint --init under Linux and Mac.

## Aplicar un Linter (buenas prácticas de angular)

> ng lint // comando para revisar el código, sino hay ningún linter, nos informa de los linters disponibles en angular

Instalaremos este

> ng add @angular-eslint/schematics

Y ahora si podemos ejecutar el comando anterior
> ng lint // ahora analizará el código en busca de errores

al ejecutarlo nos muestra los errores y malas practicas, hay algunos que no se pueden evitar, deberíamos poder deshabilitar el error o el warning de alguna manera

También puedes modificar e implementar tus propias reglas de codificación editando el archivo .eslintrc.json que fue creado en la raíz del proyecto.


## SOME PROBLEMS WITH TSCONFIG

If you receive this problem for the linter in some files:

  parsing error: Cannot read file 'tsconfig.json'

That is because, the linter cannot find this tsconfig.json

Do that:

 .eslintrc.json
```
        "project": [
          "tsconfig.json"
        ],

        cambia esa línea por la siguiente

        "project": [
          "**/tsconfig.json"
        ],
```

## SOME PROBLEMS WITH .eslintrc.json

if you recibe this problem in the .eslintrc.json:

  "No inputs where found in config file"

You can change that in this file:

 .eslintrc.json
```
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

 to

 .eslintrc.json
```
{
  "compilerOptions": {
    "moduleResolution": "node"
  },
  "include": [
    "./src/**/*.ts"
  ]
}
```


## GIT CONFIGURATIONS

git init
git config --local user.email "desarrolloaplicacionesweb.jmlb@gmail.com"
git config --local user.name "JUANLUNABLANCO"
git branch -M  main

	En este punto debes crear un repositorio nuevo en github vac铆o y enlazarlo

	> git remote add origin https://github.com/JUANLUNABLANCO/<tu-repo>.git -->

  
	> git remote add origin https://github.com/JUANLUNABLANCO/curso-angular-testing.git
	> git config --list
	> git add .
	> git commit -m "scaffolding project with webpack"
	> git push -u origin main

## PROBLEMAS CON EL EOL EN W10

> git config --global core.autocrlf true

pondrá todos los ficheros que tengan un salto de línea en \r\n, que es lo que necesita windows, en vez de
\n que es lo que necesita los sistemas unix

con eso, en el README.md podrás leerlo como se espera

tras esa configuración y para que surta efecto debes de hacer lo siguiente

> git add --renormalize .

> git commit -m "Renormalizing eofile eolines"

> git push origin main

// IMPORTANTE el codigo de los ficheros debe ser copiado directamente en el README.md entre 
``` comillas ``` para que se vea bien, porque por defecto un fichero de código borra los eol.



## Extensiones del navegador

	JSON Formatter
	Angular dev tools << DEPENDIENDO DEL TIPO DE TECNOLOGÍA HABRÁ UNA U OTRA >>

## Cliente APIS
	### apps externas
	
		Insomnia.rest << DEPENDIENDO DEL TIPO DE TECNOLOGÍA HABRÁ UNA U OTRA >>
		Postman

	### extension de VSC

		Thunder client << DEPENDIENDO DEL TIPO DE TECNOLOGÍA HABRÁ UNA U OTRA >>

## npm aditional installations

  // WARNING Este proyecto está creado con la versión 10.07 de angular, copiado del repo de platzi rama init

	> npm install --save date-fns
  > npm install --save @angular/fire
  > npm install --save @angular/material
  > npm install --save firebase
  > npm install --save flexboxgrid
  > npm install --save swiper

  > npm install --save-dev ts-node


## SOME STUFF PROBLEMS IN ANGULAR WITH EXTERNAL DEPENDENCIES

angular warning: files.service.ts depends on 'file-saver'. CommonJS or AMD dependencies can cause optimization bailouts.

SOLUTION:

angular.json
```
"projects": {
            ...
            "architect": {
                "build": {
                    "builder": "@angular-devkit/build-angular:browser",
                    "options": {
                        "outputPath": "dist",
                        "index": "src/index.html",
                        "main": "src/main.ts",
                        "polyfills": [
                            "zone.js"
                        ],
                        "tsConfig": "tsconfig.app.json",
                        "inlineStyleLanguage": "scss",
                        "assets": [
                            "src/favicon.ico",
                            "src/assets"
                        ],
                        "styles": [
                            "src/styles.scss"
                        ],
                        "scripts": [],
// ADDED 
                        "allowedCommonJsDependencies": ["file-saver"]
// ADDED 

```

listo wei, solucionado


## star course
