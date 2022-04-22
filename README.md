[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

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
    * [Constructor](#constructor)
    * [Methods](#methods)

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

### v2.2.1 → v2.3.0

  * Updates for System:
    * **`<Collection>.Backup()` changed.** This function will now be used as `createBackup()`.
    * **`<Collection>.LoadBackup()` added.** With this function, you can easily restore backups.
    * **`<Collection>.CreateBackup()` returns changed.** Now this function, if successful, will return the filename of the backed up collection on its return.
    * **`<CollectionOptions>.Auto_Backup` changed.** This option will now be used as `auto_create_backup`.
  * Updates for Key-Value Based Collections:
    * **`<Collection>.Reduce()` changed.** This function will now be used as `decrease()`.

### v2.1.0 → v2.2.0

  * Updates for System:
    * **Bugs fixed.** Fixed some bugs in the system.
    * **`<CollectionOptions>.Indicate_Archived_At<[Boolean]>` added.** If this is enabled, will be automatically specified date when documents are archived.
    * **`<CollectionOptions>.Indicate_Archived_Timestamp<[Boolean]>` added.** If this is enabled, will be automatically specified timestamp when documents are archived.
    * **`<CollectionOptions>.Indicate_Unarchived_At<[Boolean]>` added.** If this is enabled, will be automatically specified date when documents are unarchived.
    * **`<CollectionOptions>.Indicate_Unarchived_Timestamp<[Boolean]>` added.** If this is enabled, will be automatically specified timestamp when documents are unarchived.
  * Updates for Document Based Collections:
    * **`<Collection>.Archive()` added.** By archiving a document, you can have it ignored by the system.
    * **`<Collection>.Unarchive()` added.** You can extract the archived document from the archive.
    * **`<Collection>.Find(..., options)` added.** You can customize it with options to find.
    * **`<Collection>.Filter(..., options)` added.** You can customize it with options to filter.
    * **`<Collection>.Has(..., options)` added.** You can customize it with options to check.
    * **`<FindOptions>.Archived<[Boolean]>` added.** With this option you can specify whether to find archived documents or not.
    * **`<FilterOptions>.Archived<[Boolean]>` added.** With this option you can specify whether to filter archived documents or not.
    * **`<HasOptions>.Archived<[Boolean]>` added.** With this option you can specify whether to check archived documents or not.
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

`new Collection(options)`

Create a collection where you can manage and store your data.

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
> | options.indicate_archived_at | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the archived at of documents. |
> | options.indicate_archived_timestamp | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the archived timestamp of documents. |
> | options.indicate_unarchived_at | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the unarchived at of documents. |
> | options.indicate_unarchived_timestamp | `false` | [Boolean] (optional) **[DOCUMENT BASED COLLECTIONS]**<br/>Whether to specify the unarchived timestamp of documents. |
> | options.save_timeout | `1` | [Number] (optional)<br/>This specifies how many seconds after a document is inserted, the collection will be saved. This way it limits the successive saving of the collection when many data are inserted in succession, so the system is not slowed down. Data loss may occur if the system is turned off after repeatedly entering data. When the document is added 5 times in a row, the collection is saved so that the data does not remain unsaved for a long time. This can be edited with the 'save_directly_after' option. |
> | options.save_directly_after | `5` | [Number] (optional)<br/>This specifies that after how many documents have been inserted, the collection will be saved without the save timeout. |
> | options.cache_retention_time | `10` | [Number] (optional)<br/>[If this value is `-1`, the cache is kept indefinitely] This specifies how many minutes the cache will be retained if caching is enabled. If there is no activity in the collection, the cache is cleared, thus preventing RAM loss. |
> | options.backup_retention_time | `3` | [Number] (optional)<br/>[If this value is `-1`, backups will never be deleted] This determines after how many days the backups will be deleted. |
> | options.caching | `false` | [Boolean] (optional)<br/>[IMPORTANT] If this is enabled, the data is kept in the cache. In this case, the data is processed quickly, but the size of the collection is the loss of RAM. Is not preferred for large collections. |
> | options.auto_create_backup | `false` | [Boolean] (optional)<br/>If this is enabled, this collection will create automatic backups. |
> | options.detailed_debugger_logs | `false` | [Boolean] (optional)<br/>If this is enabled, it will print more events in the collection to the console. |
> | options.activate_destroy_function | `false` | [Boolean] (optional)<br/>[IMPORTANT] If this is enabled, the `<Collection>.Destroy()` function becomes operable. This command serves to destroy your collection completely. It is a dangerous command. |
> 
> Example:
> ```js
> const example_collection = new PeakDB.Collection({
>   "name": "EXAMPLE_COLLECTION",
>   "type": "DOCUMENT_BASED",
>   
>   /*
>     For document based collections
>   */
>   "id_length": 32,
>   "indicate_created_at": false,
>   "indicate_created_timestamp": true,
>   "indicate_updated_at": false,
>   "indicate_updated_timestamp": true,
>   "indicate_archived_at": false,
>   "indicate_archived_timestamp": true,
>   "indicate_unarchived_at": false,
>   "indicate_unarchived_timestamp": true,
>   
>   /*
>     Can be used on all collection types
>   */
>   "save_timeout": 1,
>   "save_directly_after": 5,
>   "cache_retention_time": 10,
>   "backup_retention_time": 3,
>   "caching": true,
>   "auto_create_backup": true,
>   "detailed_debugger_logs": true,
>   "activate_destroy_function": false
> });
> ```

### Methods

`insert(document)` *(document based)*

Insert a document.

> | Parameter | Description |
> | --- | --- |
> | document | [Object]<br/>The document to be written to the collection. |
> 
> returns [Object]
> 
> Example:
> ```js
> accounts.insert({"email": "fir4tozden@gmail.com", "username": "fir4tozden", "password": "12345678", "region": "Muğla"});
> /*
>   {
>     "_id": "RMmXZVDfQrVLQwFlquMPb98XNUCxQ6MM",
>     "_updated": false,
>     "_archived": false,
>     "_created_at": 2022-03-20T00:00:00.000Z,
>     "_created_timestamp": 1647745200000,
>     "email": "fir4tozden@gmail.com",
>     "username": "fir4tozden",
>     "password": "12345678",
>     "region": "Muğla"
>   }
> */
> ```

<br/>

`find(params, options)` *(document based)*

Find a document.

> | Parameter | Description |
> | --- | --- |
> | params | [Function] \| [Object]<br/>The parameters you will use to find the data. |
> | options | [Object] (optional)<br/>Find options. |
> | options.archived | [Boolean] (optional)<br/>Whether to find archived documents. |
> 
> returns [Object]
> 
> Example:
> ```js
> accounts.find(document => document.email === "fir4tozden@gmail.com", {"archived": true});
> // or
> accounts.find({"email": "fir4tozden@gmail.com"}, {"archived": true});
> /*
>   {
>     "_id": "RMmXZVDfQrVLQwFlquMPb98XNUCxQ6MM",
>     "_updated": false,
>     "_archived": false,
>     "_created_at": 2022-03-20T00:00:00.000Z,
>     "_created_timestamp": 1647745200000,
>     "email": "fir4tozden@gmail.com",
>     "username": "fir4tozden",
>     "password": "12345678",
>     "region": "Muğla"
>   }
> */
> ```

<br/>

`filter(params, options)` *(document based)*

Filter documents.

> | Parameter | Description |
> | --- | --- |
> | params | [Function] \| [Object]<br/>The parameters you will use to filter the data. |
> | options | [Object] (optional)<br/>Filter options. |
> | options.archived | [Boolean] (optional)<br/>Whether to filter archived documents. |
> 
> returns [Array]<[Object]>
> 
> Example:
> ```js
> accounts.filter(document => document.region === "Muğla", {"archived": true});
> // or
> accounts.filter({"region": "Muğla"}, {"archived": true});
> /*
>   [
>     {
>       "_id": "RMmXZVDfQrVLQwFlquMPb98XNUCxQ6MM",
>       "_updated": false,
>       "_archived": false,
>       "_created_at": 2022-03-20T00:00:00.000Z,
>       "_created_timestamp": 1647745200000,
>       "email": "fir4tozden@gmail.com",
>       "username": "fir4tozden",
>       "password": "12345678",
>       "region": "Muğla"
>     },
>     {
>       "_id": "23ERK9fHqiH_n83fhzU7eOYtzz6tUl7S",
>       "_updated": false,
>       "_archived": false,
>       "_created_at": 2022-03-20T00:05:00.000Z,
>       "_created_timestamp": 1647734700000,
>       "email": "nehir@gmail.com",
>       "username": "nehir",
>       "password": "12345678",
>       "region": "Muğla"
>     }
>   ]
> */
> ```

<br/>

`has(params, options)` *(document based)*

Check if they have document.

> | Parameter | Description |
> | --- | --- |
> | params | [Function] \| [Object]<br/>The parameters you will use to check the data. |
> | options | [Object] (optional)<br/>Find options. |
> | options.archived | [Boolean] (optional)<br/>Whether to has archived documents. |
> 
> returns [Boolean]
> 
> Example:
> ```js
> accounts.has(document => document.region === "Muğla"); // -> true
> accounts.has({"region": "Muğla"}); // -> true
> ```

<br/>

`update(document_id, document)` *(document based)*

Update a document.

> | Parameter | Description |
> | --- | --- |
> | document_id | [String]<br/>The ID of the document to be updated. |
> | document | [Object]<br/>The document to be updated in the collection. |
> 
> returns [Object]
> 
> Example:
> ```js
> let document = accounts.find(document => document.email === "fir4tozden@gmail.com");
> accounts.update(document._id, {"email": "fir4tozden@gmail.com", "username": "hey_im_fir4tozden", "password": "87654321", "region": "İstanbul"});
> /*
>   {
>     "_id: "23ERK9fHqiH_n83fhzU7eOYtzz6tUl7S",
>     "_updated": true,
>     "_archived": false,
>     "_created_at": 2022-03-20T00:00:00.000Z,
>     "_created_timestamp": 1647745200000,
>     "_updated_at": 2022-03-20T00:10:00.000Z,
>     "_updated_timestamp": 1647735000000,
>     "email": "fir4tozden@gmail.com",
>     "username": "hey_im_fir4tozden",
>     "password": "87654321",
>     "region": "İstanbul"
>   }
> */
> ```

<br/>

`archive(document_id)` *(document based)*

Archive a document.

> | Parameter | Description |
> | --- | --- |
> | document_id | [String]<br/>The ID of the document to be archived. |
> 
> returns [Boolean]
> 
> Example:
> ```js
> let document = accounts.find(document => document.email === "fir4tozden@gmail.com");
> accounts.archive(document._id); // -> true
> ```

<br/>

`unarchive(document_id)` *(document based)*

Unarchive a document.

> | Parameter | Description |
> | --- | --- |
> | document_id | [String]<br/>The ID of the document to be unarchived. |
> 
> returns [Boolean]
> 
> Example:
> ```js
> let document = accounts.find(document => document.email === "fir4tozden@gmail.com", {"archived": true});
> accounts.unarchive(document._id); // -> true
> ```

<br/>

`delete(document_id)` *(document based)*

Delete a document.

> | Parameter | Description |
> | --- | --- |
> | document_id | [String]<br/>The ID of the document to be deleted. |
> 
> returns [Boolean]
> 
> Example:
> ```js
> let document = accounts.find(document => document.email === "fir4tozden@gmail.com");
> accounts.delete(document._id); // -> true
> ```

<br/>

`set(key, value)` *(key-value based)*

Set a value.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | value | [String] \| [Number] \| [Object] \| [Array]<br/>Your data to set. |
> 
> returns [String] | [Number] | [Object] | [Array]
> 
> Example:
> ```js
> user_settings.set("USER_1", {"friend_requests": true});
> /*
>   {
>     "friend_requests": true
>   }
> */
> ```

<br/>

`get(key)` *(key-value based)*

Get a value.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> 
> returns [String] | [Number] | [Object] | [Array]
> 
> Example:
> ```js
> user_settings.get("USER_1.friend_requests"); // -> true
> ```

<br/>

`push(key, data)` *(key-value based)*

Push a data to array.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | data | [String] \| [Number] \| [Object] \| [Array]<br/>Data to be push to the array. |
> 
> returns [Array]
> 
> Example:
> ```js
> user_settings.push("USER_1.friends", "USER_2");
> /*
>   [
>     "USER_2"
>   ]
> */
> ```

<br/>

`remove(key, data)` *(key-value based)*

Remove a data from array.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | data | [String] \| [Number] \| [Object] \| [Array]<br/>Data to be remove from the array. |
> 
> returns [Array]
> 
> Example:
> ```js
> user_settings.remove("USER_1.friends", "USER_2");
> /*
>   []
> */
> ```

<br/>

`find(key, params)` *(key-value based)*

Find a data from array.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | params | [Function] \| [Object]<br/>The parameters you will use to find the data. |
> 
> returns [Object]
> 
> Example:
> ```js
> user_settings.find("USER_1.social_media_addresses", data => data.platform === "Instagram");
> // or
> user_settings.find("USER_1.social_media_addresses", {"platform": "Instagram"});
> /*
>   {
>     "platform": "Instagram",
>     "username": "fir4tozden"
>   }
> */
> ```

<br/>

`filter(key, params)` *(key-value based)*

Filter data from array.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | params | [Function] \| [Object]<br/>The parameters you will use to filter the data. |
> 
> returns [Array]
> 
> Example:
> ```js
> user_settings.filter("USER_1.social_media_addresses", data => data.username === "fir4tozden");
> // or
> user_settings.filter("USER_1.social_media_addresses", {"username": "fir4tozden"});
> /*
>   [
>     {
>       "platform": "Instagram",
>       "username": "fir4tozden"
>     },
>     {
>       "platform": "Twitter",
>       "username": "fir4tozden"
>     }
>   ]
> */
> ```

<br/>

`has(key, params)` *(key-value based)*

Check if they have key or data.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | params | [Function] \| [Object] \| [String] \| [Number] (optional)<br/>The parameters you will use to check the data. |
> 
> returns [Boolean]
> 
> Example:
> ```js
> user_settings.has("USER_1.hobbies"); // -> true
> user_settings.has("USER_1.hobbies", data => data === "Watching TV"); // -> false
> user_settings.has("USER_1.hobbies", "Watching TV"); // -> false
> user_settings.has("USER_1.social_media_addresses", {"platform": "Instagram"}); // -> true
> ```

<br/>

`increase(key, value)` *(key-value based)*

Increase the number in the value.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | value | [Number]<br/>The number to be incremented. |
> 
> returns [Number]
> 
> Example:
> ```js
> user_settings.increase("USER_1.age", 15); // -> 15
> user_settings.increase("USER_1.age", 1); // -> 16
> ```

<br/>

`decrease(key, value)` *(key-value based)*

Decrease the number in the value.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> | value | [Number]<br/>The number to be decremented. |
> 
> returns [Number]
> 
> Example:
> ```js
> user_settings.decrease("USER_1.age", 5); // -> 11
> ```

<br/>

`delete(key)` *(key-value based)*

Reduce the number in the value.

> | Parameter | Description |
> | --- | --- |
> | key | [String] \| [Number]<br/>Key to value. |
> 
> returns [Number]
> 
> Example:
> ```js
> user_settings.delete("USER_1.age"); // -> true
> ```

<br/>

`createBackup()`

Create a backup of the collection.

> returns [String]<[BackupFilename]> | [Boolean]
> 
> Example:
> ```js
> example_collection.createBackup(); // -> EXAMPLE_COLLECTION_2022-03-20_AUTO.pea
> ```

<br/>

`loadBackup(filename)`

Load a backup to the collection.

> | Parameter | Description |
> | --- | --- |
> | filename | [String]<br/>The filename of the backup. |
> 
> returns [Boolean]
> 
> Example:
> ```js
> example_collection.loadBackup("EXAMPLE_COLLECTION_2022-03-20_AUTO.pea"); // -> true
> ```

<br/>

`destroy()`

Destroy the collection.

> returns [Boolean]
> 
> Example:
> ```js
> example_collection.destroy(); // -> true
> ```

## License

[MIT](LICENSE.md)
