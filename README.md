# Regula Document Reader OpenAPI definitions

[![documentation](https://img.shields.io/badge/docs-en-f6858d?style=flat-square)](https://support.regulaforensics.com/hc/en-us/articles/115000916306-Documentation)
[![release](https://img.shields.io/github/v/release/regulaforensics/DocumentReader-web-openapi?style=flat-square)](https://github.com/regulaforensics/DocumentReader-web-openapi/releases)

## Main GitHub repository

* [https://github.com/regulaforensics/DocumentReader-web-openapi](https://github.com/regulaforensics/DocumentReader-web-openapi)

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

## Updating clients according to the current spec

When changes are added, the `update clients` action is automatically triggered. For each client **PR** with changes will be created.

:warning: NOTE: Before working with a client, read `dev.md` which is available in each client repository.

:warning: NOTE: Do **not edit** generated code. Create wrappers, decorators, etc. in ext folder.

:bulb: All clients have RawResultItem and AuthenticityCheckResultItem containers that are used for deserialization oneOf schemas. These containers are a simple map/dict. 


##  Spec validation

```bash
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli validate --recommend -i /local/index.yml
```

## Building Redoc single page html documentation

```bash
npx @redocly/cli build-docs index.yml -o=document-reader-static-doc.html
```

## Bundle scheme to single .json file

```bash
npx @openapitools/openapi-generator-cli generate -i index.yml -g openapi --skip-validate-spec
```
