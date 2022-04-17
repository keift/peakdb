<div align="center">
  <img src="https://i.ibb.co/mbJC8yX/unknown.png" width="512px"/>
  <br/>
  <img src="https://badgen.net/npm/v/peak.db"/>
  <img src="https://badgen.net/npm/license/peak.db"/>
  <img src="https://badgen.net/npm/node/peak.db"/>
  <img src="https://badgen.net/npm/dt/peak.db"/>
</div>

## Contents

  * [About](#about)
  * [Features](#features)
  * [Latest Updates](#latest-updates)
  * [Installation](#installation)
  * [Documentation](#documentation)

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

>  * Updates for Key-Value Based Collections:
>    * **`<Collection>.Find()` added.** You can find the data in the array.
>    * **`<Collection>.Filter()` added.** You can filter the data in the array.

[*... see all*](CHANGELOG.md#change-log)

## Installation

> ```sh-session
> npm install peak.db
> ```

## Documentation

### Constructor

`new Collection(options)`
> | Parameter | Default | Description |
> | --- | --- | --- |
> | options | | [Object]<br/>Collection options. |
> | options.name | | [String]<br/>Name of collection. |
> | options.type | | [String]<br/>[IMPORTANT] Type of the collection, which cannot be changed again later.<br/><br/>Valid values: `DOCUMENT_BASED`, `KEY_VALUE_BASED` |
> | options.id_length | `32` | [Number] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>This determines the length of unique identities given to documents. |
> | options.indicate_created_at | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the creation date of documents. |
> | options.indicate_created_timestamp | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the creation timestamp of documents. |
> | options.indicate_edited_at | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the edited date of documents. |
> | options.indicate_edited_timestamp | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the edited timestamp of documents. |
> | options.save_timeout | `1` | [Number] (optional)<br/>This specifies how many seconds after a document is inserted, the collection will be saved. This way it limits the successive saving of the collection when many data are inserted in succession, so the system is not slowed down. Data loss may occur if the system is turned off after repeatedly entering data. When the document is added 5 times in a row, the collection is saved so that the data does not remain unsaved for a long time. This can be edited with the 'save_directly_after' option. |
> | options.save_directly_after | `5` | [Number] (optional)<br/>This specifies that after how many documents have been inserted, the collection will be saved without the save timeout. |
> | options.cache_retention_time | `10` | [Number] (optional)<br/>[If this value is `-1`, the cache is kept indefinitely] This indicates how much the cache will be held if the caching is enabled. If there is no activity in the collection, the cache is deleted, this prevents the loss of unnecessary RAM. |
> | options.backup_retention_time | `3` | [Number] (optional)<br/>[If this value is `-1`, backups will never be deleted] This determines after how many days the backups will be deleted. |
> | options.caching | `false` | [Boolean] (optional)<br/>[IMPORTANT] If this is active, the data is kept in the cache. In this case, the data is processed quickly, but the size of the collection is the loss of RAM. Is not preferred for large collections. |
> | options.auto_backup | `false` | [Boolean] (optional)<br/>If this is active, this collection will receive automatic backups. |
> | options.detailed_debugger_logs | `false` | [Boolean] (optional)<br/>If this is active, it will print more events in the collection to the console. |
> | options.activate_destroy_function | `false` | [Boolean] (optional)<br/>[IMPORTANT] If this is active, the `<Collection>.Destroy()` function becomes operable. This command serves to destroy your collection completely. It is a dangerous command. |

### Methods

**For Document Based Collections**

`insert(data)` 
> | Parameter | Description |
> | --- | --- |
> | data | [Object]<br/>The data to be written to the collection. |

<br/>
<br/>

`find(params)`
> | Parameter | Description |
> | --- | --- |
> | params | [Function] | [Object]<br/>The parameters you will use to find the data.

## License

[MIT](LICENSE.md)

[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
