# Regula Document Reader OPENAPI definitions

## Clients

## Structure

* **index.yml** - definition entry point
* **common.yml** - small enums and popular models
* **rt.yml** - definitions import of all possible results types
* **e - \*.yml** - files with huge enum definitions
* **rt - \*.yml** - files describing results types

##  Scheme validation
```
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli validate --recommend -i /local/index.yml 
```