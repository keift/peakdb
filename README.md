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
  * **`<KeyValueBasedCollection>.Find()` added.** You can find the data in array in key-value based collections.
  * **`<KeyValueBasedCollection>.Filter()` added.** You can filter data in array in key-value based collections.
### v2.0.2 → v2.1.0
  * **`<Collection>.Has()` added.** You can check if a data exists. It can be used in both types of collections.
### v1.3.1 → v2.0.0
  * **Added new collection type.** You can now use your data on key-value based. Thanks to the newly added key-value based collection type, you do not have to keep your data in a document based format.
  * **Added find and filter with JSON.** In your document based collection, you can also use JSON for find and filter operations instead of functions. You can find more information in document based collection examples.
  * **Data read and write optimized.** Your data has been rendered faster and unnecessary RAM loss has been prevented.
  * **`CollectionOptions.Type` added.** This allows you to specify type of your collection. Valid values: `DOCUMENT_BASED` and `KEY_VALUE_BASED`
  * **`CollectionOptions.Activate_Destroy_Function` added.** If this is active, the `<Collection>.Destroy()` function becomes operable. This command serves to destroy your collection completely. It is a dangerous command.
  * **`<Collection>.Set()` added.** This allows you to set a data to your key-value based collection.
  * **`<Collection>.Get()` added.** This allows you to get a data into your key-value based collection.
  * **`<Collection>.Push()` added.** This allows you to push a data to Array in your key-value based collection.
  * **`<Collection>.Remove()` added.** This allows you to remove a data from Array in your key-value based collection.
  * **`<Collection>.Increase()` added.** This allows you to increase number in your key-value based collection.
  * **`<Collection>.Reduce()` added.** This allows you to reduce number in your key-value based collection.
  * **`<Collection>.Destroy()` added.** This serves to completely destroy the data in your collection. You need to activate it with the `activate_destroy_function` option.

[*... see all*](CHANGELOG.md#change-log)

## Installation
```
npm install peak.db
```

## Usage
### Creating a Collection
```js
const PeakDB = require("peak.db");
const example_collection = new PeakDB.Collection({
  /*
    == CollectionOptions
  */
  
  "name": "EXAMPLE_COLLECTION", // Name of collection (required)
  "type": "DOCUMENT_BASED or KEY_VALUE_BASED", // IMPORTANT: Type of the collection, which cannot be changed again later. (required)
  
  /*
    For document based collections
  */
  "id_length": 32, // This determines the length of unique identities given to documents. (no required, default: 32)
  "indicate_created_at": false, // If this is active, will be automatically specified date when documents are created. (no required, default: false)
  "indicate_created_timestamp": false, // If this is active, will be automatically specified timestamp when documents are created. (no required, default: false)
  "indicate_updated_at": false, // If this is active, will be automatically specified date when documents are updated. (no required, default: false)
  "indicate_updated_timestamp": false, // If this is active, will be automatically specified timestamp when documents are updated. (no required, default: false)
  
  /*
    Can be used on all collection types
  */
  "save_timeout": 1, // (SECONDS) This specifies how many seconds after a document is inserted, the collection will be saved. This way it limits the successive saving of the collection when many data are inserted in succession, so the system is not slowed down. Data loss may occur if the system is turned off after repeatedly entering data. When the document is added 5 times in a row, the collection is saved so that the data does not remain unsaved for a long time. This can be edited with the 'save_directly_after' option. (no required, default: 1)
  "save_directly_after": 5, // (INSERT COUNT) This specifies that after how many documents have been inserted, the collection will be saved without the save timeout. (no required, default: 5)
  "cache_retention_time": 10, // (MINUTES) [If this value is -1, the cache is kept indefinitely] This indicates how much the cache will be held if the caching is enabled. If there is no activity in the collection, the cache is deleted, this prevents the loss of unnecessary RAM. (no required, default: 10)
  "backup_retention_time": 3, // (DAYS) [If this value is -1, backups will never be deleted] This determines after how many days the backups will be deleted. (no required, default: 3)
  "caching": false, // IMPORTANT: If this is active, the data is kept in the cache. In this case, the data is processed quickly, but the size of the collection is the loss of RAM. Is not preferred for large collections. (no required, default: false)
  "auto_backup": false, // If this is active, this collection will receive automatic backups. (no required, default: false)
  "detailed_debugger_logs": false, // If this is active, it will print more events in the collection to the console. (no required, default: false)
  "activate_destroy_function": false // IMPORTANT: If this is active, the '<Collection>.Destroy()' function becomes operable. This command serves to destroy your collection completely. It is a dangerous command. (no required, default: false)
});
```

### Examples for Document Based Collections
Insert a Document
```js

accounts.insert({"email": "fir4tozden@gmail.com", "username": "fir4tozden", "password": "12345678", "region": "Muğla"});
/*
  {
    "_id": "RMmXZVDfQrVLQwFlquMPb98XNUCxQ6MM",
    "_updated": false,
    "_created_at": 2022-03-20T00:00:00.000Z,
    "_created_timestamp": 1647745200000,
    "email": "fir4tozden@gmail.com",
    "username": "fir4tozden",
    "password": "12345678",
    "region": "Muğla"
  }
*/
```
Find a Document
```js
accounts.find(document => document.email === "fir4tozden@gmail.com");
// or
accounts.find({"email": "fir4tozden@gmail.com"});
/*
  {
    "_id": "RMmXZVDfQrVLQwFlquMPb98XNUCxQ6MM",
    "_updated": false,
    "_created_at": 2022-03-20T00:00:00.000Z,
    "_created_timestamp": 1647745200000,
    "email": "fir4tozden@gmail.com",
    "username": "fir4tozden",
    "password": "12345678",
    "region": "Muğla"
  }
*/
```
Filter Documents
```js
accounts.filter(document => document.region === "Muğla");
// or
accounts.filter({"region": "Muğla"});
/*
  [
    {
      "_id": "RMmXZVDfQrVLQwFlquMPb98XNUCxQ6MM",
      "_updated": false,
      "_created_at": 2022-03-20T00:00:00.000Z,
      "_created_timestamp": 1647745200000,
      "email": "fir4tozden@gmail.com",
      "username": "fir4tozden",
      "password": "12345678",
      "region": "Muğla"
    },
    {
      "_id": "23ERK9fHqiH_n83fhzU7eOYtzz6tUl7S",
      "_updated": false,
      "_created_at": 2022-03-20T00:05:00.000Z,
      "_created_timestamp": 1647734700000,
      "email": "nehir@gmail.com",
      "username": "nehir",
      "password": "12345678",
      "region": "Muğla"
    }
  ]
*/
```
Check if Document Exists
```js
accounts.has(document => document.email === "fir4tozden@gmail.com");
// or
accounts.has({"email": "fir4tozden@gmail.com"});
// true
```
Update a Document
```js
let document = accounts.find(document => document.email === "fir4tozden@gmail.com");
accounts.update(document._id, {"email": "fir4tozden@gmail.com", "username": "hey_im_fir4tozden", "password": "87654321", "region": "İstanbul"});
/*
  {
    "_id: "23ERK9fHqiH_n83fhzU7eOYtzz6tUl7S",
    "_updated": true,
    "_created_at": 2022-03-20T00:00:00.000Z,
    "_created_timestamp": 1647745200000,
    "_updated_at": 2022-03-20T00:10:00.000Z,
    "_updated_timestamp": 1647735000000,
    "email": "fir4tozden@gmail.com",
    "username": "hey_im_fir4tozden",
    "password": "87654321",
    "region": "İstanbul"
  }
*/
```
Delete a Document
```js
let document = accounts.find(document => document.email === "fir4tozden@gmail.com");
accounts.delete(document._id);
// true
```

### Examples for Key-Value Based Collections
Set a Data
```js
user_settings.set("USER_1", {
  "friends": [{"id": "USER_2", "name": "Nehir", "region": "Muğla"}, {"id": "USER_3", "name": "Deniz", "region": "Muğla"}],
  "friend_requests": true
});
/*
  {
    "friends": [
      {
        "id": "USER_2",
        "name": "Nehir",
        "region": "Muğla"
      },
      {
        "id": "USER_3",
        "name": "Deniz",
        "region": "Muğla"
      }
    ],
    "friend_requests": true
  }
*/
user_settings.set("USER_1.direct_messages", false);
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false
  }
*/
```
Get a Data
```js
user_settings.get("USER_1");
/*
  {
    "friends": [
      {
        "id": "USER_2",
        "name": "Nehir",
        "region": "Muğla"
      },
      {
        "id": "USER_3",
        "name": "Deniz",
        "region": "Muğla"
      }
    ],
    "friend_requests": true,
    "direct_messages": false
  }
*/
user_settings.get("USER_1.direct_messages"); // -> false
```
Push a Data to Array
```js
user_settings.push("USER_1.hobbies", "Watching TV");
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false,
    "hobbies": [
      "Watching TV"
    ]
  }
*/
user_settings.push("USER_1.hobbies", "Reading Book");
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false,
    "hobbies": [
      "Watching TV",
      "Reading Book"
    ]
  }
*/
```
Remove a Data from Array
```js
user_settings.remove("USER_1.hobbies", "Watching TV");
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false,
    "hobbies": [
      "Reading Book"
    ]
  }
*/
```
Find Data from Array
```js
user_settings.find("USER_1.friends", value => value.name === "Nehir"); // -> {"id": "USER_2", "name": "Nehir", "region": "Muğla"}
// or
user_settings.find("USER_1.friends", {"name": "Nehir"}); // -> {"id": "USER_2", "name": "Nehir", "region": "Muğla"}
```
Filter Data from Array
```js
user_settings.filter("USER_1.friends", value => value.region === "Muğla");
// or
user_settings.filter("USER_1.friends", {"region": "Muğla"});
/*
  [
    {
      "id": "USER_2",
      "name": "Nehir",
      "region": "Muğla"
    },
    {
      "id": "USER_3",
      "name": "Deniz",
      "region": "Muğla"
    }
  ]
*/
```
Check if Data Exists
```js
user_settings.has("USER_1.hobbies"); // -> true
user_settings.has("USER_1.hobbies", "Watching TV"); // -> false
```
Increase Number
```js
user_settings.increase("USER_1.age", 15);
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false,
    "hobbies": [
      "Reading Book"
    ],
    "age": 15
  }
*/
user_settings.increase("USER_1.age", 1);
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false,
    "hobbies": [ ... ],
    "age": 16
  }
*/
```
Reduce Number
```js
user_settings.reduce("USER_1.age", 5);
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "direct_messages": false,
    "hobbies": [ ... ],
    "age": 11
  }
*/
```
Delete a Data
```js
user_settings.delete("USER_1.direct_messages");
/*
  {
    "friends": [ ... ],
    "friend_requests": true,
    "hobbies": [ ... ],
    "age": 11
  }
*/
```

### Backup Collection
```js
<Collection>.backup();
// true
```

### Destroy Collection ⚠ DANGEROUS ⚠
```js
<Collection>.destroy();
// true
```

## License
[MIT](LICENSE.md)
