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
    let t = e.toString()
        .split(".")
        .join(",")
        .split(",")[0].split("")
        .reverse()
        .join("")
        , r = "";
    for (let e = 0; e < t.length; e++) r += e % 3 == 0 && 0 !== e ? "," + t.charAt(e) : t.charAt(e);
    return e.toString()
        .split(".")
        .join(",")
        .split(",")[1] ? r.split("")
        .reverse()
        .join("") + "." + e.toString()
        .split(".")
        .join(",")
        .split(",")[1] : r.split("")
        .reverse()
        .join("")
}

function filterTime(e, t = !1) {
    return e = e.toString(), !0 === t ? ("00" === e && (e = "0"), "01" === e && (e = "1"), "02" === e && (e = "2"), "03" === e && (e = "3"), "04" === e && (e = "4"), "05" === e && (e = "5"), "06" === e && (e = "6"), "07" === e && (e = "7"), "08" === e && (e = "8"), "09" === e && (e = "9")) : ("0" === e && (e = "00"), "1" === e && (e = "01"), "2" === e && (e = "02"), "3" === e && (e = "03"), "4" === e && (e = "04"), "5" === e && (e = "05"), "6" === e && (e = "06"), "7" === e && (e = "07"), "8" === e && (e = "08"), "9" === e && (e = "09")), e
}
module.exports.document = {
    insert: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Insert(Data)");
        if (!1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid params: Collection.Insert(Data)");
        let o = e.get()
            , l = r._id || nanoid(t.id_length || 32)
            , n = lodash.find(o, e => e._id === l)
            , i = {
                _id: l
                , _updated: !1
            };
        if (!n) return !0 === t.indicate_created_at && (i._created_at = new Date), !0 === t.indicate_created_timestamp && (i._created_timestamp = Date.now()), i = Object.assign(i, r), o.push(i), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument inserted with ID '\x1b[35m" + l + "\x1b[32m'."), e.set(o), i;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with this ID already exists: " + l)
    }
    , find: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Find(Params)");
        if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid params: Collection.Find(Params)");
        let o = e.get()
            , l = lodash.find(o, r);
        if (l) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + l._id + "\x1b[32m' found."), l;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument not found.")
    }
    , filter: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Filter(Params)");
        if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid params: Collection.Filter(Params)");
        let o = e.get()
            , l = lodash.filter(o, r);
        return 0 === l.length ? !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocuments not found.") : !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32m\x1b[35m" + filterNumber(l.length) + "\x1b[32m documents found."), l
    }
    , update: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Update(Id, ...)");
        if (!o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Update(..., Data)");
        if (!1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid params: Collection.Update(..., Data)");
        let l = e.get()
            , n = lodash.find(l, e => e._id === r)
            , i = {
                _id: r
                , _updated: !0
            };
        if (n) return n._created_at && (i._created_at = n._created_at), n._created_timestamp && (i._created_timestamp = n._created_timestamp), !0 === t.indicate_updated_at && (i._updated_at = new Date), !0 === t.indicate_updated_timestamp && (i._updated_timestamp = Date.now()), i = Object.assign(i, o), l[l.indexOf(n)] = i, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been updated."), e.set(l), i;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r)
    }
    , delete: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Delete(Id)");
        let o = e.get()
            , l = lodash.find(o, e => e._id === r);
        if (l) return o.splice(o.indexOf(l), 1), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been deleted."), e.set(o), !0;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r)
    }
}, module.exports.key_value = {
    set: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Set(Key, ...)");
        let l = e.get();
        lodash.set(l, r, o);
        let n = lodash.get(l, r);
        return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been set."), e.set(l), n
    }
    , get: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Get(Key)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Get(Key)");
        let o = e.get()
            , l = lodash.get(o, r);
        if (void 0 !== l) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' found."), l;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid value key: " + r)
    }
    , push: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Push(Key, ...)");
        let l = e.get()
            , n = lodash.get(l, r);
        if (n && !1 === Array.isArray(n)) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."));
        let i = n || [];
        return i.push(o), lodash.set(l, r, i), n = lodash.get(l, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue pushed to key '\x1b[35m" + r + "\x1b[32m'."), e.set(l), n
    }
    , remove: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Remove(Key, ...)");
        let l = e.get()
            , n = lodash.get(l, r);
        if (n && !1 === Array.isArray(n)) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."));
        let i = n || [];
        return i[i.indexOf(o)] ? (i.splice(i.indexOf(o), 1), lodash.set(l, r, i), n = lodash.get(l, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue in key '\x1b[35m" + r + "\x1b[32m' has been removed."), e.set(l), n) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue in key '\x1b[35m" + r + "\x1b[31m' not found."), i)
    }
    , increase: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Increase(Key, ...)");
        if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Increase(..., Value)");
        let l = e.get()
            , n = lodash.get(l, r);
        if (n && "number" != typeof n) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an number."));
        let i = n || 0;
        return i += o, lodash.set(l, r, i), n = lodash.get(l, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been increased."), e.set(l), n
    }
    , reduce: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Reduce(Key, ...)");
        if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Reduce(..., Value)");
        let l = e.get()
            , n = lodash.get(l, r);
        if (n && "number" != typeof n) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an number."));
        let i = n || 0;
        return i -= o, lodash.set(l, r, i), n = lodash.get(l, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been reduced."), e.set(l), n
    }
    , delete: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Delete(Key)");
        let o = e.get();
        if (void 0 !== lodash.get(o, r)) return lodash.unset(o, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been deleted."), e.set(o), !0;
        !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid value key: " + r)
    }
}, module.exports.public = {
    backup: (e, t) => {
        fs.mkdirSync(path.join("./", "./peakdb/Backups/Collections"), {
            recursive: !0
        }, e => Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mError when backing up collection."));
        let r = t.name + "_" + (new Date)
            .getFullYear() + "-" + filterTime((new Date)
                .getMonth() + 1) + "-" + filterTime((new Date)
                .getDate()) + "_" + filterTime((new Date)
                .getHours()) + filterTime((new Date)
                .getMinutes()) + ".pea";
        return !1 !== fs.existsSync("./peakdb/Backups/Collections/" + r) ? Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mA backup has already been taken recently.") : (e.backup("./peakdb/Backups/Collections/" + r)
            .then(() => {
                Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCollection has been backed up with name '\x1b[35m" + r + "\x1b[32m'.")
            })
            .catch(e => Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mError when backing up collection.")), !0)
    }
    , destroy: (e, t) => (Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCollection has been destroyed."), "DOCUMENT_BASED" === t.type ? e.set([]) : "KEY_VALUE_BASED" === t.type && e.set({}), !0)
};
