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
module.exports.document_based = {
    insert: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Insert(Data)");
        if (!1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Insert(Data)");
        let o = e.get()
            , i = r._id || nanoid(t.id_length || 32)
            , a = lodash.find(o, e => e._id === i)
            , n = {
                _id: i
                , _updated: !1
                , _archived: !1
            };
        if (!a) return !0 === t.indicate_created_at && (n._created_at = new Date), !0 === t.indicate_created_timestamp && (n._created_timestamp = Date.now()), n = Object.assign(n, r), o.push(n), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument inserted with ID '\x1b[35m" + i + "\x1b[32m'."), e.set(o), n;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with this ID already exists: " + i)
    }
    , find: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Find(Params, ...)");
        if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Find(Params, ...)");
        if (o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Find(..., Options)");
        if (o && o.archived && "boolean" != typeof o.archived) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect option type: FindOptions.Archived");
        let i = e.get();
        o && !0 === o.archived || (i = lodash.filter(i, e => !0 !== e._archived));
        let a = lodash.find(i, r);
        if (a) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + a._id + "\x1b[32m' found."), a;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument not found.")
    }
    , filter: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Filter(Params, ...)");
        if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(Params, ...)");
        if (o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(..., Options)");
        if (o && o.archived && "boolean" != typeof o.archived) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect option type: FilterOptions.Archived");
        let i = e.get();
        o && !0 === o.archived || (i = lodash.filter(i, e => !0 !== e._archived));
        let a = lodash.filter(i, r);
        if (0 !== a.length) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32m\x1b[35m" + filterNumber(a.length) + "\x1b[32m documents found."), a;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocuments not found.")
    }
    , has: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Has(Params, ...)"), !1;
        if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Has(Params, ...)"), !1;
        if (o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Has(..., Options)"), !1;
        if (o && o.archived && "boolean" != typeof o.archived) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect option type: HasOptions.Archived"), !1;
        let i = e.get();
        return o && !0 === o.archived || (i = lodash.filter(i, e => !0 !== e._archived)), lodash.find(i, r) ? (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument found."), !0) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument not found."), !1)
    }
    , update: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Update(Document_Id, ...)");
        if (!o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Update(..., Data)");
        if (!1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Update(..., Data)");
        let i = e.get()
            , a = lodash.find(i, e => e._id === r);
        if (!a) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r));
        let n = {
            _id: r
            , _updated: !0
            , _archived: a._archived || !1
        };
        return a._created_at && (n._created_at = a._created_at), a._created_timestamp && (n._created_timestamp = a._created_timestamp), !0 === t.indicate_updated_at && (n._updated_at = new Date), !0 === t.indicate_updated_timestamp && (n._updated_timestamp = Date.now()), a._archived_at && (n._archived_at = a._archived_at), a._archived_timestamp && (n._archived_timestamp = a._archived_timestamp), a._unarchived_at && (n._unarchived_at = a._unarchived_at), a._unarchived_timestamp && (n._unarchived_timestamp = a._unarchived_timestamp), delete o._id, delete o._updated, delete o._archived, delete o._created_at, delete o._created_timestamp, delete o._updated_at, delete o._updated_timestamp, delete o._archived_at, delete o._archived_timestamp, delete o._unarchived_at, delete o._unarchived_timestamp, n = Object.assign(n, o), i[i.indexOf(a)] = n, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been updated."), e.set(i), n
    }
    , archive: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Archive(Document_Id)"), !1;
        let o = e.get()
            , i = lodash.find(o, e => e._id === r);
        if (!i) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r), !1;
        if (!0 === i._archived) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with ID '\x1b[35m" + r + "\x1b[31m' is already archived."), !1;
        let a = {
            _id: r
            , _updated: i._updated || !1
            , _archived: !0
        };
        return i._created_at && (a._created_at = i._created_at), i._created_timestamp && (a._created_timestamp = i._created_timestamp), i._updated_at && (a._updated_at = i._updated_at), i._updated_timestamp && (a._updated_timestamp = i._updated_timestamp), !0 === t.indicate_archived_at && (a._archived_at = new Date), !0 === t.indicate_archived_timestamp && (a._archived_timestamp = Date.now()), i._unarchived_at && (a._unarchived_at = i._unarchived_at), i._unarchived_timestamp && (a._unarchived_timestamp = i._unarchived_timestamp), delete i._id, delete i._updated, delete i._archived, delete i._created_at, delete i._created_timestamp, delete i._updated_at, delete i._updated_timestamp, delete i._archived_at, delete i._archived_timestamp, delete i._unarchived_at, delete i._unarchived_timestamp, a = Object.assign(a, i), o[o.indexOf(i)] = a, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been archived."), e.set(o), !0
    }
    , unarchive: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Unarchive(Document_Id)"), !1;
        let o = e.get()
            , i = lodash.find(o, e => e._id === r);
        if (!i) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r), !1;
        if (!1 === i._archived) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with ID '\x1b[35m" + r + "\x1b[31m' is not already archived."), !1;
        let a = {
            _id: r
            , _updated: i._updated || !1
            , _archived: !1
        };
        return i._created_at && (a._created_at = i._created_at), i._created_timestamp && (a._created_timestamp = i._created_timestamp), i._updated_at && (a._updated_at = i._updated_at), i._updated_timestamp && (a._updated_timestamp = i._updated_timestamp), i._archived_at && (a._archived_at = i._archived_at), i._archived_timestamp && (a._archived_timestamp = i._archived_timestamp), !0 === t.indicate_unarchived_at && (a._unarchived_at = new Date), !0 === t.indicate_unarchived_timestamp && (a._unarchived_timestamp = Date.now()), delete i._id, delete i._updated, delete i._archived, delete i._created_at, delete i._created_timestamp, delete i._updated_at, delete i._updated_timestamp, delete i._archived_at, delete i._archived_timestamp, delete i._unarchived_at, delete i._unarchived_timestamp, a = Object.assign(a, i), o[o.indexOf(i)] = a, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been unarchived."), e.set(o), !0
    }
    , delete: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Delete(Document_Id)"), !1;
        let o = e.get()
            , i = lodash.find(o, e => e._id === r);
        return i ? (o.splice(o.indexOf(i), 1), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been deleted."), e.set(o), !0) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r), !1)
    }
}, module.exports.key_value_based = {
    set: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Set(Key, ...)");
        if ("string" != typeof o && "number" != typeof o && "object" != typeof o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Set(..., Value)");
        let i = e.get();
        lodash.set(i, r, o);
        let a = lodash.get(i, r);
        return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been set."), e.set(i), a
    }
    , get: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Get(Key)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Get(Key)");
        let o = e.get()
            , i = lodash.get(o, r);
        if (void 0 !== i) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' found."), i;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid value key: " + r)
    }
    , push: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Push(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Push(..., Data)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Push(Key, ...)");
        if ("string" != typeof o && "number" != typeof o && "object" != typeof o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Push(..., Data)");
        let i = e.get()
            , a = lodash.get(i, r);
        if (a && !1 === Array.isArray(a)) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."));
        let n = a || [];
        return n.push(o), lodash.set(i, r, n), a = lodash.get(i, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mData pushed to key '\x1b[35m" + r + "\x1b[32m'."), e.set(i), a
    }
    , remove: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Remove(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Remove(..., Data)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Remove(Key, ...)");
        if ("string" != typeof o && "number" != typeof o && "object" != typeof o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Remove(..., Data)");
        let i = e.get()
            , a = lodash.get(i, r);
        if (a && !1 === Array.isArray(a)) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."));
        let n = a || [];
        return n[n.indexOf(o)] ? (n.splice(n.indexOf(o), 1), lodash.set(i, r, n), a = lodash.get(i, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mData in key '\x1b[35m" + r + "\x1b[32m' has been removed."), e.set(i), a) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mData in key '\x1b[35m" + r + "\x1b[31m' not found."), n)
    }
    , find: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Find(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Find(..., Params)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Find(Key, ...)");
        if ("function" != typeof o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Find(..., Params)");
        let i = e.get()
            , a = lodash.get(i, r);
        if (a && !1 === Array.isArray(a)) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."));
        let n = a || [];
        if (a = lodash.find(n, o)) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mData in key '\x1b[35m" + r + "\x1b[32m' found."), a;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mData in key '\x1b[35m" + r + "\x1b[31m' not found.")
    }
    , filter: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Filter(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Filter(..., Params)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(Key, ...)");
        if ("function" != typeof o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(..., Params)");
        let i = e.get()
            , a = lodash.get(i, r);
        if (a && !1 === Array.isArray(a)) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."));
        let n = a || [];
        if (0 !== (a = lodash.filter(n, o))
            .length) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32m\x1b[35m" + filterNumber(a.length) + "\x1b[32m data in key '\x1b[35m" + r + "\x1b[32m' found."), a;
        !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mData in key '\x1b[35m" + r + "\x1b[31m' not found.")
    }
    , has: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Has(Key, ...)"), !1;
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Has(Key, ...)"), !1;
        if (!o || "function" == typeof o || "object" == typeof o || "string" == typeof o || "number" == typeof o) {
            if (o) {
                let i = e.get()
                    , a = lodash.get(i, r);
                if (a && !1 === Array.isArray(a)) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an array."), !1;
                let n = a || [];
                return a = lodash.find(n, o), "function" != typeof o && "object" != typeof o && (a = void 0), a ? (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[32mData in key '\x1b[35m" + r + "\x1b[32m' found."), !0) : n[n.indexOf(o)] ? (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[32mData in key '\x1b[35m" + r + "\x1b[32m' found."), !0) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mData in key '\x1b[35m" + r + "\x1b[31m' not found."), !1)
            } {
                let o = e.get();
                return void 0 === lodash.get(o, r) ? (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[32m' not found."), !1) : (!0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' found."), !0)
            }
        }
        Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Has(..., Params)")
    }
    , increase: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Increase(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Increase(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Increase(Key, ...)");
        if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Increase(..., Value)");
        let i = e.get()
            , a = lodash.get(i, r);
        if (a && "number" != typeof a) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an number."));
        let n = a || 0;
        return n += o, lodash.set(i, r, n), a = lodash.get(i, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been increased."), e.set(i), a
    }
    , reduce: (e, t, r, o) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Reduce(Key, ...)");
        if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Reduce(..., Value)");
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Reduce(Key, ...)");
        if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Reduce(..., Value)");
        let i = e.get()
            , a = lodash.get(i, r);
        if (a && "number" != typeof a) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[31m' is not an number."));
        let n = a || 0;
        return n -= o, lodash.set(i, r, n), a = lodash.get(i, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been reduced."), e.set(i), a
    }
    , delete: (e, t, r) => {
        if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Delete(Key, ...)"), !1;
        if ("string" != typeof r && "number" != typeof r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Delete(Key)"), !1;
        let o = e.get();
        if (void 0 !== lodash.get(o, r)) return lodash.unset(o, r), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mValue with key '\x1b[35m" + r + "\x1b[32m' has been deleted."), e.set(o), !0;
        !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[31mValue with key '\x1b[35m" + r + "\x1b[32m' not found.")
    }
}, module.exports.public = {
    backup: (e, t) => {
        fs.mkdirSync(path.join("./", "./peakdb/Backups/Collections"), {
            recursive: !0
        }, e => (Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mError when backing up collection."), !1));
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
            .catch(e => (Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mError when backing up collection."), !1)), !0)
    }
    , destroy: (e, t) => (Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mCollection has been destroyed."), "DOCUMENT_BASED" === t.type ? e.set([]) : "KEY_VALUE_BASED" === t.type && e.set({}), !0)
};
