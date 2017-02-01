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

### .lb-migrationrc.json

You can use a `.lb-migrationrc.json` to save your common migration settings.

### Global options

| Property 	|                  Description                  	|  Type  	| Values 	|        Default       	|           As argument                                         |
|:--------:	|:---------------------------------------------:	|:------:	|:------:	|:--------------------:	|:------------------------------------------------------------:	|
|    app   	| Path to your loopback application</br>main file. 	| String 	|        	| *./server/server.js* 	| -a </br> --app </br> --loopback-app 	|

### migrate

**Important:** Loopback's datasources uses two methods to migrate your models. 

- **Auto-migration:** Drop existing schema objects if they exist, and re-create them based on model definitions. Existing data will be lost.
- **Auto-update:** Detect the difference between schema objects and model definitions, and alter the database schema objects. Keep existing data.
 
 **Be careful what method must you use.**

| Property 	|                                                                                                       Description                                                                                                                     	|       Type            	|     Values        	| Default 	|               As argument     	|
|:--------:	|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|:---------------------:	|:-----------------:	|:-------:	|:-----------------------------:	|
|    ds    	|Datasources that will be migrated.</br>If empty or not present, all datasources will be migrates.                                                                                                                          	            | String, </br> [String] 	|                	    |    []   	| -d </br> --ds </br> --datasource 	|
|   model  	|Models in the selected datasources</br>that will be migrated. If empty or not present,</br>all models in all selected datasources will</br>be migrates. Selected Models not presents in</br>selected datasources will be not migrated. 	|     [String]          	|                     	|    []   	|        --mod </br> --model    	|
|  method  	|Loopback migration method to use.</br>Loopback uses automigrate and autoupdate methods</br>for migrations.                                                                                                                     	        |      String      	        | update </br> migrate 	| migrate 	|           -m </br> --method     	|


### seed

**Important:** `seed` command will destroy all existing data in selected models before start to seed them.  

| Property 	|            Description            	|       Type       	        | Values 	|      Default     	|     As argument    	            |
|:--------:	|:---------------------------------:	|:---------------------:	|:------:	|:----------------:	|:-----------------------------:	|
|    src   	| File globs to your seeders files. 	| String, </br> [String] 	|        	| ["./seeds/*.js"] 	| -s </br> --src </br> --sources 	|

## Seeder file

A seeder file is just a js module that exports a function where you 
fill your model's data.

The exported function receive a `loopback-app` instance as argument 
where you can find all the loopback app data, that includes the `app.models` object.

You can find a example [here](examples/seeder-file.js)

*./seeds/index.js*
```
module.exports = function (app, cb) {
    let Travel = app.models.Travel

    let promises = _.map(data, function (entry) {
        let passengers = entry.passengers
        delete entry.passengers

        return Travel.create(entry)
            .then((travel) => travel.passengers.create(passengers))
    })

    return Promise.all(promises) //Or you can use cb argument when all is done, but not both.
}
```
