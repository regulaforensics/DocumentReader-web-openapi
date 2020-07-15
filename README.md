# Regula Document Reader OPENAPI definitions

## Clients

## Structure

* **index.yml** - definition entry point
* **common.yml** - small enums and popular models
* **e - \*.yml** - files with huge enum definitions
* **rt - \*.yml** - files describing results types

##  Scheme validation
```
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli validate --recommend -i /local/index.yml 
```