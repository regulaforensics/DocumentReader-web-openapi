Reference client - https://github.com/regulaforensics/DocumentReader-web-js-client/tree/master

- [ ] [code] generate initial client version using default **openapi-generator**
- [ ] [code] add initial example, to check client can execute request and parse response(but with an ugly interface)
- [ ] [code] generate simple types instead of enums (int, str etc)
- [ ] [code] add addition methods and fields to Text, TextField, Images, ImageField models. [see commits](https://github.com/regulaforensics/DocumentReader-web-java-client/tree/master/client/src/main/java/com/regula/documentreader/webclient/model)
- [ ] [code] add unknown result type model(get raw json for non-described model in a client) [see](https://github.com/regulaforensics/DocumentReader-web-java-client/blob/master/client/src/main/java/com/regula/documentreader/webclient/RawResultItem.java)
- [ ] [code] all files and images should be passed/retrieved to/from lib as bytes 
- [ ] [code] modify example to be exactly as reference client example (all fields and methods name should be matched)
- [ ] [ci] run example on every commit to master and PR
- [ ] [ci] auto-publish package on releases 
- [ ] [doc] a main README.md file
- [ ] [doc] a example README.md file
- [ ] [doc][code] run example using regula SaaS