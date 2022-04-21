const {
  isJSON: isJSON
  , separateNumber: separateNumber
} = require("../util/Tools.js"), Debugger = require("../util/Debugger.js"), {
  set: set
  , get: get
  , find: find
  , filter: filter
  , unset: unset
} = require("lodash");
class KeyValueBasedCollection {
  constructor(e, r) {
      this.set = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Set(..., Value)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Set(Key, ...)");
          if ("string" != typeof o && "number" != typeof o && "object" != typeof o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Set(..., Value)");
          let n = e.get();
          set(n, t, o);
          let l = get(n, t);
          return !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been set."), e.set(n), l
      }), this.get = (t => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Get(Key)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Get(Key)");
          let o = e.get()
              , n = get(o, t);
          if (void 0 !== n) return !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' found."), n;
          !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mInvalid value key: " + t)
      }), this.push = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Push(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Push(..., Data)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Push(Key, ...)");
          if ("string" != typeof o && "number" != typeof o && "object" != typeof o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Push(..., Data)");
          let n = e.get()
              , l = get(n, t);
          if (l && !1 === Array.isArray(l)) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array."));
          let i = l || [];
          return i.push(o), set(n, t, i), l = get(n, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mData pushed to key '\x1b[35m" + t + "\x1b[32m'."), e.set(n), l
      }), this.remove = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Remove(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Remove(..., Data)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Remove(Key, ...)");
          if ("string" != typeof o && "number" != typeof o && "object" != typeof o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Remove(..., Data)");
          let n = e.get()
              , l = get(n, t);
          if (l && !1 === Array.isArray(l)) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array."));
          let i = l || [];
          return i[i.indexOf(o)] ? (i.splice(i.indexOf(o), 1), set(n, t, i), l = get(n, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mData in key '\x1b[35m" + t + "\x1b[32m' has been removed."), e.set(n), l) : (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mData in key '\x1b[35m" + t + "\x1b[31m' not found."), i)
      }), this.find = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Find(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Find(..., Params)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Find(Key, ...)");
          if ("function" != typeof o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Find(..., Params)");
          let n = e.get()
              , l = get(n, t);
          if (!l || !1 !== Array.isArray(l)) return (l = find(l || [], o)) ? (!0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mData in key '\x1b[35m" + t + "\x1b[32m' found."), l) : void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mData in key '\x1b[35m" + t + "\x1b[31m' not found."));
          !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array.")
      }), this.filter = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Filter(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Filter(..., Params)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(Key, ...)");
          if ("function" != typeof o && !1 === isJSON(o)) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Filter(..., Params)");
          let n = e.get()
              , l = get(n, t);
          if (!l || !1 !== Array.isArray(l)) return 0 !== (l = filter(l || [], o))
              .length ? (!0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32m\x1b[35m" + separateNumber(l.length) + "\x1b[32m data in key '\x1b[35m" + t + "\x1b[32m' found."), l) : void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mData in key '\x1b[35m" + t + "\x1b[31m' not found."));
          !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array.")
      }), this.has = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Has(Key, ...)"), !1;
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Has(Key, ...)"), !1;
          if (!o || "function" == typeof o || "object" == typeof o || "string" == typeof o || "number" == typeof o) {
              if (o) {
                  let n = e.get()
                      , l = get(n, t);
                  if (l && !1 === Array.isArray(l)) return !0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an array."), !1;
                  let i = l || [];
                  return l = find(i, o), "function" != typeof o && "object" != typeof o && (l = void 0), l ? (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[32mData in key '\x1b[35m" + t + "\x1b[32m' found."), !0) : i[i.indexOf(o)] ? (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[32mData in key '\x1b[35m" + t + "\x1b[32m' found."), !0) : (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mData in key '\x1b[35m" + t + "\x1b[31m' not found."), !1)
              } {
                  let o = e.get();
                  return void 0 === get(o, t) ? (!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[32m' not found."), !1) : (!0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' found."), !0)
              }
          }
          Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Has(..., Params)")
      }), this.increase = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Increase(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Increase(..., Value)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Increase(Key, ...)");
          if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Increase(..., Value)");
          let n = e.get()
              , l = get(n, t);
          if (l && "number" != typeof l) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an number."));
          let i = l || 0;
          return set(n, t, i += o), l = get(n, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been increased."), e.set(n), l
      }), this.decrease = ((t, o) => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Decrease(Key, ...)");
          if (void 0 === o) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Decrease(..., Value)");
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Decrease(Key, ...)");
          if (o = parseFloat(o), isNaN(o) || "number" != typeof o) return Debugger.error("Incorrect parameter type: Collection.Decrease(..., Value)");
          let n = e.get()
              , l = get(n, t);
          if (l && "number" != typeof l) return void(!0 === r.detailed_debugger_logs && Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[31m' is not an number."));
          let i = l || 0;
          return set(n, t, i -= o), l = get(n, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been decreased."), e.set(n), l
      }), this.delete = (t => {
          if (!t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mNot specified: Collection.Delete(Key, ...)"), !1;
          if ("string" != typeof t && "number" != typeof t) return Debugger.error("\x1b[35m(Collection#" + r.name + "): \x1b[31mIncorrect parameter type: Collection.Delete(Key)"), !1;
          let o = e.get();
          if (void 0 !== get(o, t)) return unset(o, t), !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[32mValue with key '\x1b[35m" + t + "\x1b[32m' has been deleted."), e.set(o), !0;
          !0 === r.detailed_debugger_logs && Debugger.log("\x1b[35m(Collection#" + r.name + "): \x1b[31mValue with key '\x1b[35m" + t + "\x1b[32m' not found.")
      })
  }
}
module.exports.Collection = KeyValueBasedCollection;