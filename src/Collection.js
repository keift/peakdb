const CollectionManager = require("./handlers/CollectionManager.js")
    , DataManager = require("./handlers/DataManager.js")
    , Debugger = require("./utils/Debugger.js")
    , sqlite3 = require("better-sqlite3")
    , bson = require("bson")
    , fs = require("fs")
    , find_remove = require("find-remove")
    , path = require("path");

function filterCollectionName(e) {
    let t = "";
    e = e.trim()
        .toUpperCase()
        .split(" ")
        .join("_");
    for (let r = 0; r < e.length; r++) {
        let a = e.charAt(r);
        "abcdefghijklmnoprstuvyzwxqABCDEFGHIJKLMNOPRSTUVYZWXQ1234567890_".includes(a) && (t += a)
    }
    return t.substr(0, 64)
}

function filterTime(e, t = !1) {
    return e = e.toString(), !0 === t ? ("00" === e && (e = "0"), "01" === e && (e = "1"), "02" === e && (e = "2"), "03" === e && (e = "3"), "04" === e && (e = "4"), "05" === e && (e = "5"), "06" === e && (e = "6"), "07" === e && (e = "7"), "08" === e && (e = "8"), "09" === e && (e = "9")) : ("0" === e && (e = "00"), "1" === e && (e = "01"), "2" === e && (e = "02"), "3" === e && (e = "03"), "4" === e && (e = "04"), "5" === e && (e = "05"), "6" === e && (e = "06"), "7" === e && (e = "07"), "8" === e && (e = "08"), "9" === e && (e = "09")), e
}
class Collection {
    constructor(e) {
        if (!e || !e.name || "" === filterCollectionName(e.name)) return Debugger.error("Not specified: CollectionOptions.Name");
        if (!e.type) return Debugger.error("Not specified: CollectionOptions.Type");
        if (e.name && "string" != typeof e.name) return Debugger.error("Incorrect option type: CollectionOptions.Name");
        if (e.type && "string" != typeof e.type) return Debugger.error("Incorrect option type: CollectionOptions.Type");
        if ("DOCUMENT_BASED" === e.type) {
            if (e.id_length && "number" != typeof e.id_length) return Debugger.error("Incorrect option type: CollectionOptions.Id_Length");
            if (e.indicate_created_at && "boolean" != typeof e.indicate_created_at) return Debugger.error("Incorrect option type: CollectionOptions.Indicate_Created_At");
            if (e.indicate_created_timestamp && "boolean" != typeof e.indicate_created_timestamp) return Debugger.error("Incorrect option type: CollectionOptions.Indicate_Created_Timestamp");
            if (e.indicate_updated_at && "boolean" != typeof e.indicate_updated_at) return Debugger.error("Incorrect option type: CollectionOptions.Indicate_Updated_At");
            if (e.indicate_updated_timestamp && "boolean" != typeof e.indicate_updated_timestamp) return Debugger.error("Incorrect option type: CollectionOptions.Indicate_Updated_Timestamp")
        }
        if (e.save_timeout && "number" != typeof e.save_timeout) return Debugger.error("Incorrect option type: CollectionOptions.Save_Timeout");
        if (e.save_directly_after && "number" != typeof e.save_directly_after) return Debugger.error("Incorrect option type: CollectionOptions.Save_Directly_After");
        if (e.cache_retention_time && "number" != typeof e.cache_retention_time) return Debugger.error("Incorrect option type: CollectionOptions.Cache_Retention_Time");
        if (e.backup_retention_time && "number" != typeof e.backup_retention_time) return Debugger.error("Incorrect option type: CollectionOptions.Backup_Retention_Time");
        if (e.caching && "boolean" != typeof e.caching) return Debugger.error("Incorrect option type: CollectionOptions.Caching");
        if (e.auto_backup && "boolean" != typeof e.auto_backup) return Debugger.error("Incorrect option type: CollectionOptions.Auto_Backup");
        if (e.debugging_logs && "boolean" != typeof e.debugging_logs) return Debugger.error("Incorrect option type: CollectionOptions.Debugging_Logs");
        if (e.type && "DOCUMENT_BASED" !== e.type && "KEY_VALUE_BASED" !== e.type) return Debugger.error('Valid option value: CollectionOptions.Type === "DOCUMENT_BASED" || "KEY_VALUE_BASED"');
        if ("DOCUMENT_BASED" === e.type) {
            if (e.id_length && e.id_length < 4) return Debugger.error("Valid option value: CollectionOptions.Id_Length >= 4");
            if (e.id_length && e.id_length > 256) return Debugger.error("Valid option value: CollectionOptions.Id_Length <= 256")
        }
        return e.save_timeout && e.save_timeout < 1 ? Debugger.error("Valid option value: CollectionOptions.Save_Timeout >= 1") : e.save_timeout && e.save_timeout > 25 ? Debugger.error("Valid option value: CollectionOptions.Save_Timeout <= 25") : e.save_directly_after && e.save_directly_after < 1 ? Debugger.error("Valid option value: CollectionOptions.Save_Directly_After >= 1") : e.save_directly_after && e.save_directly_after > 500 ? Debugger.error("Valid option value: CollectionOptions.Save_Directly_After <= 500") : e.cache_retention_time && e.cache_retention_time < -1 ? Debugger.error("Valid option value: CollectionOptions.Cache_Retention_Time >= -1") : e.cache_retention_time && e.cache_retention_time > 20160 ? Debugger.error("Valid option value: CollectionOptions.Cache_Retention_Time <= 20160") : e.backup_retention_time && e.backup_retention_time < -1 ? Debugger.error("Valid option value: CollectionOptions.Backup_Retention_Time >= -1") : e.backup_retention_time && e.backup_retention_time > 365 ? Debugger.error("Valid option value: CollectionOptions.Backup_Retention_Time <= 365") : (e.name = filterCollectionName(e.name), Debugger.log("Starting collection '\x1b[35m" + e.name + "\x1b[32m'..."), fs.mkdirSync(path.join("./", "./peakdb/Collections"), {
                recursive: !0
            }, t => Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mError creating folders.")), this._db = new sqlite3("./peakdb/Collections/" + e.name + ".pea"), this._db.prepare("CREATE TABLE IF NOT EXISTS peakdb (data)")
            .run(), "DOCUMENT_BASED" === e.type && this._db.prepare("SELECT data FROM peakdb")
            .all()[0] && !1 === Array.isArray(bson.deserialize(this._db.prepare("SELECT * FROM peakdb")
                    .all()[0].data)
                .data) ? Debugger.error("Collection type cannot be changed.") : "KEY_VALUE_BASED" === e.type && this._db.prepare("SELECT data FROM peakdb")
            .all()[0] && !0 === Array.isArray(bson.deserialize(this._db.prepare("SELECT * FROM peakdb")
                    .all()[0].data)
                .data) ? Debugger.error("Collection type cannot be changed.") : ("DOCUMENT_BASED" !== e.type || this._db.prepare("SELECT data FROM peakdb")
                .all()[0] || this._db.prepare("INSERT INTO peakdb (data) VALUES (?)")
                .run(bson.serialize({
                    data: []
                })), "KEY_VALUE_BASED" !== e.type || this._db.prepare("SELECT data FROM peakdb")
                .all()[0] || this._db.prepare("INSERT INTO peakdb (data) VALUES (?)")
                .run(bson.serialize({
                    data: {}
                })), this._DataHandler = new DataManager(this._db, e), Debugger.log("Collection '\x1b[35m" + e.name + "\x1b[32m' has been started."), !0 === e.caching && Debugger.log("\x1b[31mWARNING! \x1b[32mCaching is active, data are kept in cache. For these large collections, it means more RAM loss."), "DOCUMENT_BASED" === e.type ? (this.insert = (t => CollectionManager.document_based.insert(this._DataHandler, e, t)), this.find = (t => CollectionManager.document_based.find(this._DataHandler, e, t)), this.filter = (t => CollectionManager.document_based.filter(this._DataHandler, e, t)), this.has = (t => CollectionManager.document_based.has(this._DataHandler, e, t)), this.update = ((t, r) => CollectionManager.document_based.update(this._DataHandler, e, t, r)), this.delete = (t => CollectionManager.document_based.delete(this._DataHandler, e, t))) : "KEY_VALUE_BASED" === e.type && (this.set = ((t, r) => CollectionManager.key_value_based.set(this._DataHandler, e, t, r)), this.get = (t => CollectionManager.key_value_based.get(this._DataHandler, e, t)), this.push = ((t, r) => CollectionManager.key_value_based.push(this._DataHandler, e, t, r)), this.remove = ((t, r) => CollectionManager.key_value_based.remove(this._DataHandler, e, t, r)), this.has = ((t, r) => CollectionManager.key_value_based.has(this._DataHandler, e, t, r)), this.increase = ((t, r) => CollectionManager.key_value_based.increase(this._DataHandler, e, t, r)), this.reduce = ((t, r) => CollectionManager.key_value_based.reduce(this._DataHandler, e, t, r)), this.delete = (t => CollectionManager.key_value_based.delete(this._DataHandler, e, t))), this.backup = (() => CollectionManager.public.backup(this._db, e)), !0 === e.activate_destroy_function && (this.destroy = (() => CollectionManager.public.destroy(this._DataHandler, e))), void(!0 === e.auto_backup && setInterval(() => {
                    fs.mkdirSync(path.join("./", "./peakdb/Backups/Collections"), {
                        recursive: !0
                    }, t => Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mError when backing up collection.")), (e.backup_retention_time || 3) > -1 && find_remove("./peakdb/Backups/Collections", {
                        age: {
                            seconds: 86400 * (e.backup_retention_time || 3)
                        }
                        , extensions: [".pea"]
                    });
                    let t = e.name + "_" + (new Date)
                        .getFullYear() + "-" + filterTime((new Date)
                            .getMonth() + 1) + "-" + filterTime((new Date)
                            .getDate()) + "_AUTO.pea";
                    !1 === fs.existsSync("./peakdb/Backups/Collections/" + t) && this._db.backup("./peakdb/Backups/Collections/" + t)
                        .then(() => {
                            Debugger.log("\x1b[35m(Collection#" + e.name + "): \x1b[32mCollection has been backed up with name '\x1b[35m" + t + "\x1b[32m'.")
                        })
                        .catch(t => {
                            Debugger.error("\x1b[35m(Collection#" + e.name + "): \x1b[31mError when backing up collection.")
                        })
                }, 6e4))))
    }
}
module.exports = Collection;
