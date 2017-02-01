# loopback-migration-tool

loopback-migration-tool expose the `lb-migration` script that ables you easy
handle migrations and seeders for Loopback.io

## Usage

### Install Global

Install with Yarn
```
yarn global add loopback-migration-tool
```
or install with NPM
```
npm i -g loopback-migration-tool
```
Migrate all your models on all datasources.
```
lb-migration migrate
```
Migrate all your models on specific datasources.
```
lb-migration migrate --ds=datasource1 datasource2
```
Migrate specific models on specific datasources.
```
lb-migration migrate --ds=datasource1 datasource2 --model=model1 model2 model3
```
Migrate specific models using autoupdate method.
```
lb-migration migrate --model=model1 model2 model3 --method=update
```
Seed your models with files in `./seeds/*.js`.
```
lb-migration seed
```
Seed your models with files in multiple locations.
```
lb-migration seed --src=path/to/files1/*.js path/to/files2/*.js path/to/files3/*.js  
```

### Install as dev dependency

Install with Yarn
```
yarn add loopback-migration-tool --dev
```
or install with NPM
```
npm i loopback-migration-tool --save-dev
```
In your project root.
```
node_modules/.bin/lb-migration migrate [options] 
```

## options

### Global options

| Property 	|                  Description                  	|  Type  	| Values 	|        Default       	|           As argument                                         |
|:--------:	|:---------------------------------------------:	|:------:	|:------:	|:--------------------:	|:------------------------------------------------------------:	|
|    app   	| Path to your loopback application</br>main file. 	| String 	|        	| *./server/server.js* 	| --a=*value* </br> --app=*value* </br> --loopback-app=*value* 	|

### .lb-migrationrc.*

You can use a `.lb-migrationrc.json` or `.lb-migrationrc.js` to save your common migration settings.




