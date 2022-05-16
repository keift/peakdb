# Change Log

## v2.2.1 → v2.3.0

  * Updates for System:
    * **`<Collection>.Backup()` changed.** This function will now be used as `createBackup()`.
    * **`<Collection>.LoadBackup()` added.** With this function, you can easily restore backups.
    * **`<Collection>.CreateBackup()` returns changed.** Now this function, if successful, will return the filename of the backed up collection on its return.
    * **`<CollectionOptions>.Auto_Backup` changed.** This option will now be used as `auto_create_backup`.
  * Updates for Key-Value Based Collections:
    * **`<Collection>.Reduce()` changed.** This function will now be used as `decrease()`.

## v2.1.0 → v2.2.0

  * Updates for System:
    * **Bugs fixed.** Fixed some bugs in the system.
    * **`<CollectionOptions>.Indicate_Archived_At` added.** If this is enabled, will be automatically specified date when documents are archived.
    * **`<CollectionOptions>.Indicate_Archived_Timestamp` added.** If this is enabled, will be automatically specified timestamp when documents are archived.
    * **`<CollectionOptions>.Indicate_Unarchived_At` added.** If this is enabled, will be automatically specified date when documents are unarchived.
    * **`<CollectionOptions>.Indicate_Unarchived_Timestamp` added.** If this is enabled, will be automatically specified timestamp when documents are unarchived.
  * Updates for Document Based Collections:
    * **`<Collection>.Archive()` added.** By archiving a document, you can have it ignored by the system.
    * **`<Collection>.Unarchive()` added.** You can extract the archived document from the archive.
    * **`<Collection>.Find(..., options)` added.** You can customize it with options to find.
    * **`<Collection>.Filter(..., options)` added.** You can customize it with options to filter.
    * **`<Collection>.Has(..., options)` added.** You can customize it with options to check.
    * **`<FindOptions>.Archived` added.** With this option you can specify whether to find archived documents or not.
    * **`<FilterOptions>.Archived` added.** With this option you can specify whether to filter archived documents or not.
    * **`<HasOptions>.Archived` added.** With this option you can specify whether to check archived documents or not.
  * Updates for Key-Value Based Collections:
    * **`<Collection>.Find()` added.** You can find the data in the array.
    * **`<Collection>.Filter()` added.** You can filter the data in the array.

## v2.0.2 → v2.1.0

  * Updates for All Collections:
    * **`<Collection>.Has()` added.** You can check if a data exists.
## v1.3.1 → v2.0.0
  * Updates for System:
    * **Added new collection type.** You can now use your data on key-value based. Thanks to the newly added key-value based collection type, you do not have to keep your data in a document based format.
    * **Added find and filter with JSON.** In your collection, you can also use JSON for find and filter operations instead of functions.
    * **Data read and write optimized.** Your data has been rendered faster and unnecessary RAM loss has been prevented.
    * **`<CollectionOptions>.Type` added.** This allows you to specify type of your collection. Valid values: `DOCUMENT_BASED` and `KEY_VALUE_BASED`
    * **`<CollectionOptions>.Activate_Destroy_Function` added.** If this is enabled, the `<Collection>.Destroy()` function becomes operable. This command serves to destroy your collection completely. It is a dangerous command.
  * Updates for Key-Value Based Collections:
    * **`<Collection>.Set()` added.** This allows you to set a data to your collection.
    * **`<Collection>.Get()` added.** This allows you to get a data into your collection.
    * **`<Collection>.Push()` added.** This allows you to push a data to Array in your collection.
    * **`<Collection>.Remove()` added.** This allows you to remove a data from Array in your collection.
    * **`<Collection>.Increase()` added.** This allows you to increase number in your collection.
    * **`<Collection>.Reduce()` added.** This allows you to reduce number in your collection.
    * **`<Collection>.Destroy()` added.** This serves to completely destroy the data in your collection. You need to activate it with the `activate_destroy_function` option.

## v1.2.2 → v1.3.0

  * Updates for Document Based Collections:
    * **`<Collection>.Delete()` changed.** This function will now be used as `remove()`.

## v1.1.6 → v1.2.0

  * Updates for System:
    * **`<CollectionOptions>.No_Save_Timeout_After` changed.** This option will now be used as `save_directly_after`.
    * **`<CollectionOptions>.Caching_Time` changed.** This option will now be used as `cache_retention_time`.
    * **`<CollectionOptions>.Delete_Backups_Before` changed.** This option will now be used as `backup_retention_time`.
## v1.1.2 → v1.1.3
  * Updates for System:
    * **`<CollectionOptions>.No_Save_Timeout_After` added.** This specifies that after how many documents have been inserted, the collection will be saved without the save timeout. So that the data does not stand without saving for a long time.

## v1.0.6 → v1.1.0

  * Updates for System:
    * **`<CollectionOptions>.Save_Timeout` added.** This specifies how many seconds after a document is inserted, the collection will be saved. This way it limits the successive saving of the collection when many data are inserted in succession, so the system is not slowed down. Data loss may occur if the system is turned off after repeatedly entering data. When the document is added 5 times in a row, the collection is saved so that the data does not remain unsaved for a long time. This can be edited with the `no_save_timeout_after` option.
    * **`<CollectionOptions>.Caching_Time` added.** This determines how long the cache will be kept if caching is enabled. The cache is cleared if there is no activity in the collection, this avoids unnecessary RAM loss.
    * **`<CollectionOptions>.Detailed_Debugger_Logs` added.** It will print more events in the collection to the console.
    * **`<CollectionOptions>.Delete_Backups_Before_This_Day` changed.** This option will now be used as `delete_backups_before`.

## v1.0.2 → v1.0.3

  * Updates for System:
    * **`<CollectionOptions>.Caching` added.** The data is kept in the cache. In this case, the data is processed quickly, but the size of the collection is the loss of RAM. Is not preferred for large collections.
