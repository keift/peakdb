const {
  isJSON: isJSON
  , separateNumber: separateNumber
} = require("../util/Functions.js"), Debugger = require("../util/Debugger.js"), {
  find: find
  , filter: filter
} = require("lodash"), {
  nanoid: nanoid
} = require("nanoid");
class DocumentBasedCollection {
  constructor(e, t) {
      this.insert = (r => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Insert(Document)");
          if (!1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Insert(Document)");
          let i = e.get()
              , a = r._id || nanoid(t.id_length || 32)
              , d = find(i, e => e._id === a)
              , n = {
                  _id: a
                  , _updated: !1
                  , _archived: !1
              };
          if (!d) return !0 === t.indicate_created_at && (n._created_at = new Date), !0 === t.indicate_created_timestamp && (n._created_timestamp = Date.now()), n = Object.assign(n, r), i.push(n), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument inserted with ID '\x1b[35m" + a + "\x1b[32m'."), e.set(i), n;
          !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with this ID already exists: " + a)
      }), this.find = ((r, i) => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Find(Params, ...)");
          if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Find(Params, ...)");
          if (i && !1 === isJSON(i)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Find(..., Options)");
          if (i && i.archived && "boolean" != typeof i.archived) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect option type: FindOptions.Archived");
          let a = e.get();
          i && !0 === i.archived || (a = filter(a, e => !0 !== e._archived));
          let d = find(a, r);
          if (d) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + d._id + "\x1b[32m' found."), d;
          !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument not found.")
      }), this.filter = ((r, i) => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Filter(Params, ...)");
          if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(Params, ...)");
          if (i && !1 === isJSON(i)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(..., Options)");
          if (i && i.archived && "boolean" != typeof i.archived) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect option type: FilterOptions.Archived");
          let a = e.get();
          i && !0 === i.archived || (a = filter(a, e => !0 !== e._archived));
          let d = filter(a, r);
          if (0 !== d.length) return !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32m\x1b[35m" + separateNumber(d.length) + "\x1b[32m documents found."), d;
          !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocuments not found.")
      }), this.has = ((r, i) => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Has(Params, ...)"), !1;
          if ("function" != typeof r && !1 === isJSON(r)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Has(Params, ...)"), !1;
          if (i && !1 === isJSON(i)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Has(..., Options)"), !1;
          if (i && i.archived && "boolean" != typeof i.archived) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect option type: HasOptions.Archived"), !1;
          let a = e.get();
          return i && !0 === i.archived || (a = filter(a, e => !0 !== e._archived)), find(a, r) ? (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument found."), !0) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument not found."), !1)
      }), this.update = ((r, i) => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Update(Document_Id, ...)");
          if (!i) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Update(..., Document)");
          if (!1 === isJSON(i)) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mIncorrect parameter type: Collection.Update(..., Document)");
          let a = e.get()
              , d = find(a, e => e._id === r);
          if (!d) return void(!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r));
          let n = {
              _id: r
              , _updated: !0
              , _archived: d._archived || !1
          };
          return d._created_at && (n._created_at = d._created_at), d._created_timestamp && (n._created_timestamp = d._created_timestamp), !0 === t.indicate_updated_at && (n._updated_at = new Date), !0 === t.indicate_updated_timestamp && (n._updated_timestamp = Date.now()), d._archived_at && (n._archived_at = d._archived_at), d._archived_timestamp && (n._archived_timestamp = d._archived_timestamp), d._unarchived_at && (n._unarchived_at = d._unarchived_at), d._unarchived_timestamp && (n._unarchived_timestamp = d._unarchived_timestamp), delete i._id, delete i._updated, delete i._archived, delete i._created_at, delete i._created_timestamp, delete i._updated_at, delete i._updated_timestamp, delete i._archived_at, delete i._archived_timestamp, delete i._unarchived_at, delete i._unarchived_timestamp, n = Object.assign(n, i), a[a.indexOf(d)] = n, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been updated."), e.set(a), n
      }), this.archive = (r => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Archive(Document_Id)"), !1;
          let i = e.get()
              , a = find(i, e => e._id === r);
          if (!a) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r), !1;
          if (!0 === a._archived) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with ID '\x1b[35m" + r + "\x1b[31m' is already archived."), !1;
          let d = {
              _id: r
              , _updated: a._updated || !1
              , _archived: !0
          };
          return a._created_at && (d._created_at = a._created_at), a._created_timestamp && (d._created_timestamp = a._created_timestamp), a._updated_at && (d._updated_at = a._updated_at), a._updated_timestamp && (d._updated_timestamp = a._updated_timestamp), !0 === t.indicate_archived_at && (d._archived_at = new Date), !0 === t.indicate_archived_timestamp && (d._archived_timestamp = Date.now()), a._unarchived_at && (d._unarchived_at = a._unarchived_at), a._unarchived_timestamp && (d._unarchived_timestamp = a._unarchived_timestamp), delete a._id, delete a._updated, delete a._archived, delete a._created_at, delete a._created_timestamp, delete a._updated_at, delete a._updated_timestamp, delete a._archived_at, delete a._archived_timestamp, delete a._unarchived_at, delete a._unarchived_timestamp, d = Object.assign(d, a), i[i.indexOf(a)] = d, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been archived."), e.set(i), !0
      }), this.unarchive = (r => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Unarchive(Document_Id)"), !1;
          let i = e.get()
              , a = find(i, e => e._id === r);
          if (!a) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r), !1;
          if (!1 === a._archived) return !0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mDocument with ID '\x1b[35m" + r + "\x1b[31m' is not already archived."), !1;
          let d = {
              _id: r
              , _updated: a._updated || !1
              , _archived: !1
          };
          return a._created_at && (d._created_at = a._created_at), a._created_timestamp && (d._created_timestamp = a._created_timestamp), a._updated_at && (d._updated_at = a._updated_at), a._updated_timestamp && (d._updated_timestamp = a._updated_timestamp), a._archived_at && (d._archived_at = a._archived_at), a._archived_timestamp && (d._archived_timestamp = a._archived_timestamp), !0 === t.indicate_unarchived_at && (d._unarchived_at = new Date), !0 === t.indicate_unarchived_timestamp && (d._unarchived_timestamp = Date.now()), delete a._id, delete a._updated, delete a._archived, delete a._created_at, delete a._created_timestamp, delete a._updated_at, delete a._updated_timestamp, delete a._archived_at, delete a._archived_timestamp, delete a._unarchived_at, delete a._unarchived_timestamp, d = Object.assign(d, a), i[i.indexOf(a)] = d, !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been unarchived."), e.set(i), !0
      }), this.delete = (r => {
          if (!r) return Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mNot specified: Collection.Delete(Document_Id)"), !1;
          let i = e.get()
              , a = find(i, e => e._id === r);
          return a ? (i.splice(i.indexOf(a), 1), !0 === t.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + t.name + "): \x1b[32mDocument with ID '\x1b[35m" + r + "\x1b[32m' has been deleted."), e.set(i), !0) : (!0 === t.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + t.name + "): \x1b[31mInvalid document ID: " + r), !1)
      })
  }
}
module.exports.Collection = DocumentBasedCollection;