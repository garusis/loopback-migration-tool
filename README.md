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
In your project root.
```
lb-migration migrate [options] 
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

## Settings

### .lb-migrationrc.*

You can use a `.lb-migrationrc.json` or `.lb-migrationrc.js` to save your common migration settings.




