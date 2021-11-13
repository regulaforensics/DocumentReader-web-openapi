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


## Updating clients according to the current spec

To update clients, use `update clients` GitHub action. Specify title PR and press run. For each client **PR** with changes will be created.

:warning: NOTE: Static typed clients, such as Java or C#, require adding all new **enums** to `update-models.sh` ENUM_MAPPINGS section.

:warning: NOTE: For some clients generator produces not-valid client code. See `update-models.sh` for ad-hocks fixing generator issues.   

:warning: NOTE: Do **not edit** generated code. Create wrappers, decorators, etc in ext folder.

:bulb: All clients have RawResultItem container that is used for deserialization for undescribed types. This container is a simple map/dict. 


##  Spec validation
```
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli validate --recommend -i /local/index.yml 
```

## Building Redoc single page html documentation

Edit **rt.yml** - remove **components.schemas.ResultItem.discriminator** node

Edit **rt-authenticity.yml** - remove **components.schemas.AuthenticityCheckResultItem.discriminator**

Then run next command:
```
npx redoc-cli bundle "$PWD/index.yml" --output document-reader-static-doc.html \
--options.maxDisplayedEnumValues=5 --options.theme.logo.gutter="20px" \
--options.theme.colors.primary.main="#8a53cb" --options.expandResponses="all" \
--options.expandSingleSchemaField --options.hideDownloadButton --options.jsonSampleExpandLevel="6"
```

## Bundle scheme to single .json file
```bash
npx openapi-generator-cli generate -i index.yml  -g openapi  --skip-validate-spec
```