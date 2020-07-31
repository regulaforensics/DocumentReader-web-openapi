# Regula Document Reader OpenAPI definitions

## Clients

* [JavaScript](https://github.com/regulaforensics/DocumentReader-web-js-client)
* [Java](https://github.com/regulaforensics/DocumentReader-web-java-client)
* [Python](https://github.com/regulaforensics/DocumentReader-web-python-client)

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
