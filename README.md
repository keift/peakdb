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
# Constructor
`new <PeakDB>.Collection(options)`
| Parameter | Default | Description |
| --- | --- | --- |
| name | | [String]

## License
[MIT](LICENSE.md)

[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
