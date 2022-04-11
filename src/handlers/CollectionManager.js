const Debugger = require("../utils/Debugger.js")
    , lodash = require("lodash")
    , {
        nanoid: nanoid
    } = require("nanoid")
    , fs = require("fs")
    , path = require("path");

function isJSON(e) {
    if ("object" == typeof e && null !== e) return !0;
    try {
        JSON.parse(e)
    } catch (e) {
        return !1
    }
    return !0
}

function filterNumber(e) {
    let r = e.toString()
        .split(".")
        .join(",")
        .split(",")[0].split("")
        .reverse()
        .join("")
        , t = "";
    for (let e = 0; e < r.length; e++) t += e % 3 == 0 && 0 !== e ? "," + r.charAt(e) : r.charAt(e);
    return e.toString()
        .split(".")
        .join(",")
        .split(",")[1] ? t.split("")
        .reverse()
        .join("") + "." + e.toString()
        .split(".")
        .join(",")
        .split(",")[1] : t.split("")
        .reverse()
        .join("")
}

function filterTime(e, r = !1) {
    return e = e.toString(), !0 === r ? ("00" === e && (e = "0"), "01" === e && (e = "1"), "02" === e && (e = "2"), "03" === e && (e = "3"), "04" === e && (e = "4"), "05" === e && (e = "5"), "06" === e && (e = "6"), "07" === e && (e = "7"), "08" === e && (e = "8"), "09" === e && (e = "9")) : ("0" === e && (e = "00"), "1" === e && (e = "01"), "2" === e && (e = "02"), "3" === e && (e = "03"), "4" === e && (e = "04"), "5" === e && (e = "05"), "6" === e && (e = "06"), "7" === e && (e = "07"), "8" === e && (e = "08"), "9" === e && (e = "09")), e
}
module.exports.document_based = {
    insert: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Insert(Data)");
        if (!1 === isJSON(t)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid params: Collection.Insert(Data)");
        let o = e.get()
            , l = t._id || nanoid(r.id_length || 32)
            , n = lodash.find(o, e => e._id === l)
            , i = {
                _id: l
                , _updated: !1
            };
        if (!n) return !0 === r.indicate_created_at && (i._created_at = new Date), !0 === r.indicate_created_timestamp && (i._created_timestamp = Date.now()), i = Object.assign(i, t), o.push(i), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mDocument inserted with ID '\x1b[35m" + l + "\x1b[32m'."), e.set(o), i;
        !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mDocument with this ID already exists: " + l)
    }
    , find: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Find(Params)");
        if ("function" != typeof t && !1 === isJSON(t)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid params: Collection.Find(Params)");
        let o = e.get()
            , l = lodash.find(o, t);
        if (l) return !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mDocument with ID '\x1b[35m" + l._id + "\x1b[32m' found."), l;
        !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mDocument not found.")
    }
    , filter: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Filter(Params)");
        if ("function" != typeof t && !1 === isJSON(t)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid params: Collection.Filter(Params)");
        let o = e.get()
            , l = lodash.filter(o, t);
        return 0 === l.length ? !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mDocuments not found.") : !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32m\x1b[35m" + filterNumber(l.length) + "\x1b[32m documents found."), l
    }
    , has: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Has(Params)");
        if ("function" != typeof t && !1 === isJSON(t)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid params: Collection.Has(Params)");
        let o = e.get();
        return lodash.find(o, t) ? (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[32mDocument found."), !0) : (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mDocument not found."), !1)
    }
    , update: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Update(Id, ...)");
        if (!o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Update(..., Data)");
        if (!1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid params: Collection.Update(..., Data)");
        let l = e.get()
            , n = lodash.find(l, e => e._id === t)
            , i = {
                _id: t
                , _updated: !0
            };
        if (n) return n._created_at && (i._created_at = n._created_at), n._created_timestamp && (i._created_timestamp = n._created_timestamp), !0 === r.indicate_updated_at && (i._updated_at = new Date), !0 === r.indicate_updated_timestamp && (i._updated_timestamp = Date.now()), i = Object.assign(i, o), l[l.indexOf(n)] = i, !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mDocument with ID '\x1b[35m" + t + "\x1b[32m' has been updated."), e.set(l), i;
        !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid document ID: " + t)
    }
    , delete: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Delete(Id)");
        let o = e.get()
            , l = lodash.find(o, e => e._id === t);
        if (l) return o.splice(o.indexOf(l), 1), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mDocument with ID '\x1b[35m" + t + "\x1b[32m' has been deleted."), e.set(o), !0;
        !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid document ID: " + t)
    }
}, module.exports.key_value_based = {
    set: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Set(Key, ...)");
        let l = e.get();
        lodash.set(l, t, o);
        let n = lodash.get(l, t);
        return !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been set."), e.set(l), n
    }
    , get: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Get(Key)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Get(Key)");
        let o = e.get()
            , l = lodash.get(o, t);
        if (void 0 !== l) return !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' found."), l;
        !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid value key: " + t)
    }
    , push: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Push(Key, ...)");
        let l = e.get()
            , n = lodash.get(l, t);
        if (n && !1 === Array.isArray(n)) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array."));
        let i = n || [];
        return i.push(o), lodash.set(l, t, i), n = lodash.get(l, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue pushed to key '\x1b[35m" + t + "\x1b[32m'."), e.set(l), n
    }
    , remove: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Remove(Key, ...)");
        let l = e.get()
            , n = lodash.get(l, t);
        if (n && !1 === Array.isArray(n)) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array."));
        let i = n || [];
        return i[i.indexOf(o)] ? (i.splice(i.indexOf(o), 1), lodash.set(l, t, i), n = lodash.get(l, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue in key '\x1b[35m" + t + "\x1b[32m' has been removed."), e.set(l), n) : (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue in key '\x1b[35m" + t + "\x1b[31m' not found."), i)
    }
    , has: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Has(Key, ...)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Has(Key, ...)");
        if (o) {
            let l = e.get()
                , n = lodash.get(l, t);
            if (n && !1 === Array.isArray(n)) return !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array."), !1;
            let i = n || [];
            return i[i.indexOf(o)] ? (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue in key '\x1b[35m" + t + "\x1b[32m' found."), !0) : (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue in key '\x1b[35m" + t + "\x1b[31m' not found."), !1)
        } {
            let o = e.get();
            return void 0 === lodash.get(o, t) ? (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid value key: " + t), !1) : (!0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' found."), !0)
        }
    }
    , increase: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Increase(Key, ...)");
        if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Increase(..., Value)");
        let l = e.get()
            , n = lodash.get(l, t);
        if (n && "number" != typeof n) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an number."));
        let i = n || 0;
        return i += o, lodash.set(l, t, i), n = lodash.get(l, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been increased."), e.set(l), n
    }
    , reduce: (e, r, t, o) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Reduce(Key, ...)");
        if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Reduce(..., Value)");
        let l = e.get()
            , n = lodash.get(l, t);
        if (n && "number" != typeof n) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an number."));
        let i = n || 0;
        return i -= o, lodash.set(l, t, i), n = lodash.get(l, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been reduced."), e.set(l), n
    }
    , delete: (e, r, t) => {
        if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Delete(Key)");
        let o = e.get();
        if (void 0 !== lodash.get(o, t)) return lodash.unset(o, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been deleted."), e.set(o), !0;
        !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid value key: " + t)
    }
}, module.exports.public = {
    backup: (e, r) => {
        fs.mkdirSync(path.join("./", "./peakdb/Backups/Collections"), {
            recursive: !0
        }, e => Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mError when backing up collection."));
        let t = r.name + "_" + (new Date)
            .getFullYear() + "-" + filterTime((new Date)
                .getMonth() + 1) + "-" + filterTime((new Date)
                .getDate()) + "_" + filterTime((new Date)
                .getHours()) + filterTime((new Date)
                .getMinutes()) + ".pea";
        return !1 !== fs.existsSync("./peakdb/Backups/Collections/" + t) ? Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mA backup has already been taken recently.") : (e.backup("./peakdb/Backups/Collections/" + t)
            .then(() => {
                Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mCollection has been backed up with name '\x1b[35m" + t + "\x1b[32m'.")
            })
            .catch(e => Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mError when backing up collection.")), !0)
    }
    , destroy: (e, r) => (Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mCollection has been destroyed."), "DOCUMENT_BASED" === r.type ? e.set([]) : "KEY_VALUE_BASED" === r.type && e.set({}), !0)
};
