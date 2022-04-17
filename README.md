<div align="center">
  <img src="https://i.ibb.co/mbJC8yX/unknown.png" width="512px"/>
  <br/>
  <img src="https://badgen.net/npm/v/peak.db"/>
  <img src="https://badgen.net/npm/license/peak.db"/>
  <img src="https://badgen.net/npm/node/peak.db"/>
  <img src="https://badgen.net/npm/dt/peak.db"/>
</div>

## About
Fast and advanced, document based and key-value based NoSQL database that able to work as it is installed.

## Features
  * NoSQL database
  * Can be run as it is installed
  * Can be used document based and key-value based
  * Customizable settings for collections
  * No need to use schema
  * Quick data reading and writing
  * Data can be kept in cache
  * Easy to find data
  * Automatically or manual backup

## Latest Updates
### v2.1.0 → v2.2.0
  * Updates for Key-Value Based Collections:
    * **`<Collection>.Find()` added.** You can find the data in the array.
    * **`<Collection>.Filter()` added.** You can filter the data in the array.

[*... see all*](CHANGELOG.md#change-log)

## Installation
```sh-session
npm install peak.db
```

## Documentation
### Constructor
`new <PeakDB>.Collection(options)`
| Parameter | Default | Description |
| --- | --- | --- |
| options | | [Object]<br/>Collection options.
| options.name | | [String]<br/>Name of collection.
| options.type | | [String]<br/>[IMPORTANT] Type of the collection, which cannot be changed again later.<br/><br/>Valid values: `DOCUMENT_BASED`, `KEY_VALUE_BASED`
| options.id_length | 32 | [Number] [DOCUMENT BASED COLLECTIONS]<br/>This determines the length of unique identities given to documents.
| options.indicate_created_at | false | [Boolean] [DOCUMENT BASED COLLECTIONS]<br/>Whether to specify the creation date of documents.
| options.indicate_created_timestamp | false | [Boolean] [DOCUMENT BASED COLLECTIONS]<br/>Whether to specify the creation timestamp of documents.
| options.indicate_edited_at | false | [Boolean] [DOCUMENT BASED COLLECTIONS]<br/>Whether to specify the edited date of documents.
| options.indicate_edited_timestamp | false | [Boolean] [DOCUMENT BASED COLLECTIONS]<br/>Whether to specify the edited timestamp of documents.

## License
[MIT](LICENSE.md)

[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
