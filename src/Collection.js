const DocumentBasedCollection = require("./structures/DocumentBasedCollection.js")
    , KeyValueBasedCollection = require("./structures/KeyValueBasedCollection.js")
    , DataManager = require("./managers/DataManager.js")
    , {
        rebuildCollectionName: rebuildCollectionName
        , zeroBeforeNumber: zeroBeforeNumber
    } = require("./util/Functions.js")
    , Debugger = require("./util/Debugger.js")
    , sqlite3 = require("better-sqlite3")
    , bson = require("bson")
    , fs = require("fs")
    , find_remove = require("find-remove")
    , path = require("path");
class Collection {
    constructor(e) {
        if (!e || !e.name || "" === rebuildCollectionName(e.name)) return Debugger.error("Not specified: CollectionCollectionOptions.Name");
        if (!e.type) return Debugger.error("Not specified: CollectionCollectionOptions.Type");
        if (e.name && "string" != typeof e.name) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Name");
        if (e.type && "string" != typeof e.type) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Type");
        if ("DOCUMENT_BASED" === e.type) {
            if (e.id_length && "number" != typeof e.id_length) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Id_Length");
            if (e.indicate_created_at && "boolean" != typeof e.indicate_created_at) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Created_At");
            if (e.indicate_created_timestamp && "boolean" != typeof e.indicate_created_timestamp) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Created_Timestamp");
            if (e.indicate_updated_at && "boolean" != typeof e.indicate_updated_at) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Updated_At");
            if (e.indicate_updated_timestamp && "boolean" != typeof e.indicate_updated_timestamp) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Updated_Timestamp");
            if (e.indicate_archived_at && "boolean" != typeof e.indicate_archived_at) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Archived_At");
            if (e.indicate_archived_timestamp && "boolean" != typeof e.indicate_archived_timestamp) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Archived_Timestamp");
            if (e.indicate_unarchived_at && "boolean" != typeof e.indicate_unarchived_at) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Unarchived_At");
            if (e.indicate_unarchived_timestamp && "boolean" != typeof e.indicate_unarchived_timestamp) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Indicate_Unarchived_Timestamp")
        }
        if (e.save_timeout && "number" != typeof e.save_timeout) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Save_Timeout");
        if (e.save_directly_after && "number" != typeof e.save_directly_after) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Save_Directly_After");
        if (e.cache_retention_time && "number" != typeof e.cache_retention_time) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Cache_Retention_Time");
        if (e.backup_retention_time && "number" != typeof e.backup_retention_time) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Backup_Retention_Time");
        if (e.caching && "boolean" != typeof e.caching) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Caching");
        if (e.auto_backup && "boolean" != typeof e.auto_backup) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Auto_Backup");
        if (e.debugging_logs && "boolean" != typeof e.debugging_logs) return Debugger.error("Incorrect option type: CollectionCollectionOptions.Debugging_Logs");
        if (e.type && "DOCUMENT_BASED" !== e.type && "KEY_VALUE_BASED" !== e.type) return Debugger.error('Valid option value: CollectionCollectionOptions.Type === "DOCUMENT_BASED" || "KEY_VALUE_BASED"');
        if ("DOCUMENT_BASED" === e.type) {
            if (e.id_length && e.id_length < 4) return Debugger.error("Valid option value: CollectionCollectionOptions.Id_Length >= 4");
            if (e.id_length && e.id_length > 256) return Debugger.error("Valid option value: CollectionCollectionOptions.Id_Length <= 256")
        }
        return e.save_timeout && e.save_timeout < 1 ? Debugger.error("Valid option value: CollectionCollectionOptions.Save_Timeout >= 1") : e.save_timeout && e.save_timeout > 25 ? Debugger.error("Valid option value: CollectionCollectionOptions.Save_Timeout <= 25") : e.save_directly_after && e.save_directly_after < 1 ? Debugger.error("Valid option value: CollectionCollectionOptions.Save_Directly_After >= 1") : e.save_directly_after && e.save_directly_after > 500 ? Debugger.error("Valid option value: CollectionCollectionOptions.Save_Directly_After <= 500") : e.cache_retention_time && e.cache_retention_time < -1 ? Debugger.error("Valid option value: CollectionCollectionOptions.Cache_Retention_Time >= -1") : e.cache_retention_time && e.cache_retention_time > 20160 ? Debugger.error("Valid option value: CollectionCollectionOptions.Cache_Retention_Time <= 20160") : e.backup_retention_time && e.backup_retention_time < -1 ? Debugger.error("Valid option value: CollectionCollectionOptions.Backup_Retention_Time >= -1") : e.backup_retention_time && e.backup_retention_time > 365 ? Debugger.error("Valid option value: CollectionCollectionOptions.Backup_Retention_Time <= 365") : (e.name = rebuildCollectionName(e.name), Debugger.log("Starting collection '\x1b[35m" + e.name + "\x1b[32m'..."), fs.mkdirSync(path.join("./", "./peakdb/Collections"), {
                recursive: !0
            }, t => Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mError creating folders.")), this._CollectionManager = new sqlite3("./peakdb/Collections/" + e.name + ".pea"), this._CollectionManager.prepare("CREATE TABLE IF NOT EXISTS peakdb (data)")
            .run(), "DOCUMENT_BASED" === e.type && this._CollectionManager.prepare("SELECT data FROM peakdb")
            .all()[0] && !1 === Array.isArray(bson.deserialize(this._CollectionManager.prepare("SELECT * FROM peakdb")
                    .all()[0].data)
                .data) || "KEY_VALUE_BASED" === e.type && this._CollectionManager.prepare("SELECT data FROM peakdb")
            .all()[0] && !0 === Array.isArray(bson.deserialize(this._CollectionManager.prepare("SELECT * FROM peakdb")
                    .all()[0].data)
                .data) ? Debugger.error("Collection type cannot be changed.") : ("DOCUMENT_BASED" !== e.type || this._CollectionManager.prepare("SELECT data FROM peakdb")
                .all()[0] || this._CollectionManager.prepare("INSERT INTO peakdb (data) VALUES (?)")
                .run(bson.serialize({
                    data: []
                })), "KEY_VALUE_BASED" !== e.type || this._CollectionManager.prepare("SELECT data FROM peakdb")
                .all()[0] || this._CollectionManager.prepare("INSERT INTO peakdb (data) VALUES (?)")
                .run(bson.serialize({
                    data: {}
                })), this._DataManager = new DataManager.Manager(this._CollectionManager, e), Debugger.log("Collection '\x1b[35m" + e.name + "\x1b[32m' has been started."), !0 === e.caching && Debugger.log("\x1b[31mWARNING! \x1b[32mCaching is active, data are kept in cache. For these large collections, it means more RAM loss."), "DOCUMENT_BASED" === e.type ? (this._DocumentBasedCollection = new DocumentBasedCollection.Collection(this._DataManager, e), this.insert = (e => this._DocumentBasedCollection.insert(e)), this.find = ((e, t) => this._DocumentBasedCollection.find(e, t)), this.filter = ((e, t) => this._DocumentBasedCollection.filter(e, t)), this.has = ((e, t) => this._DocumentBasedCollection.has(e, t)), this.update = ((e, t) => this._DocumentBasedCollection.update(e, t)), this.archive = (e => this._DocumentBasedCollection.archive(e)), this.unarchive = (e => this._DocumentBasedCollection.unarchive(e)), this.delete = (e => this._DocumentBasedCollection.delete(e))) : "KEY_VALUE_BASED" === e.type && (this._KeyValueBasedCollection = new KeyValueBasedCollection.Collection(this._DataManager, e), this.set = ((e, t) => this._KeyValueBasedCollection.set(e, t)), this.get = (e => this._KeyValueBasedCollection.get(e)), this.push = ((e, t) => this._KeyValueBasedCollection.push(e, t)), this.remove = ((e, t) => this._KeyValueBasedCollection.remove(e, t)), this.find = ((e, t) => this._KeyValueBasedCollection.find(e, t)), this.filter = ((e, t) => this._KeyValueBasedCollection.filter(e, t)), this.has = ((e, t) => this._KeyValueBasedCollection.has(e, t)), this.increase = ((e, t) => this._KeyValueBasedCollection.increase(e, t)), this.reduce = ((e, t) => this._KeyValueBasedCollection.reduce(e, t)), this.delete = (e => this._KeyValueBasedCollection.delete(e))), this.createBackup = (() => {
                    fs.mkdirSync(path.join("./", "./peakdb/Backups/Collections"), {
                        recursive: !0
                    }, t => (Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mAn error occurred while creating the backup."), !1));
                    let t = e.name + "_" + (new Date)
                        .getFullYear() + "-" + zeroBeforeNumber((new Date)
                            .getMonth() + 1) + "-" + zeroBeforeNumber((new Date)
                            .getDate()) + "_" + zeroBeforeNumber((new Date)
                            .getHours()) + zeroBeforeNumber((new Date)
                            .getMinutes()) + ".pea";
                    return !1 !== fs.existsSync("./peakdb/Backups/Collections/" + t) ? (Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mA backup has already been created recently."), !1) : (this._CollectionManager.backup("./peakdb/Backups/Collections/" + t)
                        .then(() => {
                            Debugger.log("\x1b[35m(Collection#" + e.name + "): \x1b[32mCollection backup was created with filename '\x1b[35m" + t + "\x1b[32m'.")
                        })
                        .catch(t => (Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mAn error occurred while creating the backup."), !1)), t)
                }), this.loadBackup = (t => t ? "string" != typeof t ? (Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mIncorrect parameter type: Collection.LoadBackup(Filename)"), !1) : (t.endsWith(".pea") || (t += ".pea"), !1 === fs.existsSync("./peakdb/Backups/Collections/" + t) ? (Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mBackup with filename '\x1b[35m" + t + "\x1b[31m' not found."), !1) : (this._BackupCollectionManager = new sqlite3("./peakdb/Backups/Collections/" + t), "DOCUMENT_BASED" === e.type && this._BackupCollectionManager.prepare("SELECT data FROM peakdb")
                    .all()[0] && !1 === Array.isArray(bson.deserialize(this._BackupCollectionManager.prepare("SELECT * FROM peakdb")
                            .all()[0].data)
                        .data) || "KEY_VALUE_BASED" === e.type && this._BackupCollectionManager.prepare("SELECT data FROM peakdb")
                    .all()[0] && !0 === Array.isArray(bson.deserialize(this._BackupCollectionManager.prepare("SELECT * FROM peakdb")
                            .all()[0].data)
                        .data) ? Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mThe type of this backup does not match the type of this collection.") : (this._BackupData = bson.deserialize(this._BackupCollectionManager.prepare("SELECT * FROM peakdb")
                            .all()[0].data)
                        .data, Debugger.log("\x1b[35m(Collection#" + e.name + "): \x1b[32mCollection successfully loaded from file with name '\x1b[35m" + t + "\x1b[32m'."), this._DataManager.set(this._BackupData), !0))) : (Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mNot specified: Collection.LoadBackup(Filename)"), !1)), !0 === e.activate_destroy_function && (this.destroy = (() => (Debugger.log("\x1b[35m(Collection#" + e.name + "): \x1b[32mCollection has been destroyed."), "DOCUMENT_BASED" === e.type ? this._DataManager.set([]) : "KEY_VALUE_BASED" === e.type && this._DataManager.set({}), !0))), void(!0 === e.auto_backup && setInterval(() => {
                    fs.mkdirSync(path.join("./", "./peakdb/Backups/Collections"), {
                        recursive: !0
                    }, t => Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mAn error occurred while creating the backup.")), (e.backup_retention_time || 3) > -1 && find_remove("./peakdb/Backups/Collections", {
                        age: {
                            seconds: 86400 * (e.backup_retention_time || 3)
                        }
                        , extensions: [".pea"]
                    });
                    let t = e.name + "_" + (new Date)
                        .getFullYear() + "-" + zeroBeforeNumber((new Date)
                            .getMonth() + 1) + "-" + zeroBeforeNumber((new Date)
                            .getDate()) + "_AUTO.pea";
                    !0 !== fs.existsSync("./peakdb/Backups/Collections/" + t) && this._CollectionManager.backup("./peakdb/Backups/Collections/" + t)
                        .then(() => {
                            Debugger.log("\x1b[35m(Collection#" + e.name + "): \x1b[32mCollection backup was created with filename '\x1b[35m" + t + "\x1b[32m'.")
                        })
                        .catch(t => {
                            Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mAn error occurred while creating the backup.")
                        })
                }, 6e4))))
    }
}
module.exports = Collection;