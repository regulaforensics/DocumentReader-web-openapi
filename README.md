# Regula Document Reader OpenAPI definitions

[![documentation](https://img.shields.io/badge/docs-en-f6858d?style=flat-square)](https://support.regulaforensics.com/hc/en-us/articles/115000916306-Documentation)
[![release](https://img.shields.io/github/v/release/regulaforensics/DocumentReader-web-openapi?style=flat-square)](https://github.com/regulaforensics/DocumentReader-web-openapi/releases)


## Clients

* [JavaScript](https://github.com/regulaforensics/DocumentReader-web-js-client) client for the browser and node.js based on axios
* [Java](https://github.com/regulaforensics/DocumentReader-web-java-client) client compatible with jvm and android
* [Python](https://github.com/regulaforensics/DocumentReader-web-python-client) 3.5+ client
* [C#](https://github.com/regulaforensics/DocumentReader-web-csharp-client) client for .NET & .NET Core

## Structure

* **index.yml** - definition entry point
* **common.yml** - small enums and popular models
* **rt.yml** - definitions import of all possible results types
* **e - \*.yml** - files with huge enum definitions
* **rt - \*.yml** - files describing results types
* **p - \*.yml** - files describing endpoints

##  Scheme validation
```
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli validate --recommend -i /local/index.yml 
```

## Building Redoc single page html documentation
```
npx redoc-cli bundle index.yml --output document-reader-static-doc.html --options.maxDisplayedEnumValues=5 --options.theme.logo.gutter="20px" --options.theme.colors.primary.main="#8a53cb" --options.expandResponses="all" --options.expandSingleSchemaField --options.hideDownloadButton --options.jsonSampleExpandLevel="6"
```