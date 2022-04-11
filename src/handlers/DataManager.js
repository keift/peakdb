const Debugger = require("../utils/Debugger.js")
    , bson = require("bson");
class Manager {
    constructor(e, t) {
        this._set_count = 0, this._cache_timeout_function = (() => {
            clearTimeout(this._cache_timeout), this._cache_timeout = setTimeout(() => {
                delete this._cache, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCache is cleared because there is no activity for a long time.")
            }, 6e4 * (t.cache_retention_time || 10))
        }), !0 === t.caching && (this._cache = bson.deserialize(e.prepare("SELECT * FROM peakdb")
                .all()[0].data)
            .data, t.cache_retention_time && t.cache_retention_time > -1 && this._cache_timeout_function()), this.get = (() => (t.cache_retention_time && t.cache_retention_time > -1 && this._cache_timeout_function(), !0 !== t.caching || this._cache || (this._cache = bson.deserialize(e.prepare("SELECT * FROM peakdb")
                    .all()[0].data)
                .data, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCache started to be kept again."), t.cache_retention_time && t.cache_retention_time > -1 && this._cache_timeout_function()), this._cache || this._temporary_cache || bson.deserialize(e.prepare("SELECT * FROM peakdb")
                .all()[0].data)
            .data)), this.set = (a => (!0 === t.caching && (this._cache = a, !0 !== t.detailed_debugger_logs || this._cache || Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCache started to be kept again."), t.cache_retention_time && t.cache_retention_time > -1 && this._cache_timeout_function()), this._temporary_cache = a, this._set_count++, clearTimeout(this._save_timeout), this._set_count === (t.save_directly_after || 5) ? (e.prepare("UPDATE peakdb SET data = (?)")
            .run(bson.serialize({
                data: this._temporary_cache
            })), delete this._temporary_cache, this._set_count = 0, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCollection has been saved.")) : this._save_timeout = setTimeout(() => {
            e.prepare("UPDATE peakdb SET data = (?)")
                .run(bson.serialize({
                    data: this._temporary_cache
                })), delete this._temporary_cache, this._set_count = 0, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCollection has been saved.")
        }, 1e3 * (t.save_timeout || 1)), !0))
    }
}
module.exports = Manager;
