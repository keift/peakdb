module.exports.rebuildCollectionName = (t => {
  let e = "";
  t = t.trim()
      .toUpperCase()
      .split(" ")
      .join("_");
  for (let r = 0; r < t.length; r++) {
      let o = t.charAt(r);
      "abcdefghijklmnoprstuvyzwxqABCDEFGHIJKLMNOPRSTUVYZWXQ1234567890_".includes(o) && (e += o)
  }
  return e.substr(0, 64)
}), module.exports.isJSON = (t => {
  if ("object" == typeof t && null !== t) return !0;
  try {
      JSON.parse(t)
  } catch (t) {
      return !1
  }
  return !0
}), module.exports.separateNumber = (t => {
  let e = t.toString()
      .split(".")
      .join(",")
      .split(",")[0].split("")
      .reverse()
      .join("")
      , r = "";
  for (let t = 0; t < e.length; t++) r += t % 3 == 0 && 0 !== t ? "," + e.charAt(t) : e.charAt(t);
  return t.toString()
      .split(".")
      .join(",")
      .split(",")[1] ? r.split("")
      .reverse()
      .join("") + "." + t.toString()
      .split(".")
      .join(",")
      .split(",")[1] : r.split("")
      .reverse()
      .join("")
}), module.exports.zeroBeforeNumber = ((t, e = !1) => (t = t.toString(), !0 === e ? ("00" === t && (t = "0"), "01" === t && (t = "1"), "02" === t && (t = "2"), "03" === t && (t = "3"), "04" === t && (t = "4"), "05" === t && (t = "5"), "06" === t && (t = "6"), "07" === t && (t = "7"), "08" === t && (t = "8"), "09" === t && (t = "9")) : ("0" === t && (t = "00"), "1" === t && (t = "01"), "2" === t && (t = "02"), "3" === t && (t = "03"), "4" === t && (t = "04"), "5" === t && (t = "05"), "6" === t && (t = "06"), "7" === t && (t = "07"), "8" === t && (t = "08"), "9" === t && (t = "09")), t));