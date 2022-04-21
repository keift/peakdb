const Collection = require("./src/Collection.js")
    , Debugger = require("./src/util/Debugger.js")
    , Package = require("./package.json")
    , axios = require("axios");
console.log(""), console.log("                                              \x1b[32m!?                  \x1b[36m:?:   7!"), console.log("                                              \x1b[32m?Y.                 \x1b[36m^Y^   J?"), console.log("        \x1b[32m.: .^~~^.      .^~~^:     .^^~~~^.    ?Y.    .^.    \x1b[36m.^^^:.^Y^   J? :^^^:"), console.log("        \x1b[32m757!~^^!J7   .7J!^^~?J:   !!~^^~7Y^   ?Y.  ^7?~.  \x1b[36m.7?~^^~!?Y^   JJ!~^^^7?^"), console.log("        \x1b[32m?5^     ^5!  ?5:     JY.    ..:::YJ   ?Y.^??^     \x1b[36m?J.     !Y^   JJ.     !Y:"), console.log("        \x1b[32m?5.      YJ  YY!7777!?7.  !?7!~~~YJ   ?Y?5~      \x1b[36m.J7      ^Y^   J?      :Y~"), console.log("        \x1b[32m?5:     :57  ?Y.         75:    :5J   ?Y.^??^     \x1b[36m?J      ~Y^   JJ      ~Y^"), console.log("        \x1b[32m75?~:::~J?.  .?J~::::^.  ~57::^!7YJ   ?5.  ^??^   \x1b[36m.??^::^~?Y^   JJ!^:::!J~"), console.log("        \x1b[32m?5::~!!~:      :~!!!~~.   :~!!~^ ^^   :^     :~.    \x1b[36m:~~~^:.^.   ^:.^~~~^."), console.log("        \x1b[32m?5."), console.log("        \x1b[32m!J.                                                                \x1b[33mv" + Package.version), console.log(""), setTimeout(() => {
    axios.get("https://cdn.jsdelivr.net/npm/" + Package.name + "/package.json")
        .then(o => {
            axios.get("https://raw.githubusercontent.com/" + o.data.repository.url.split("/")[3] + "/" + o.data.repository.url.split("/")[4].split(".git")
                    .join("") + "/main/package.json")
                .then(o => {
                    o.data.version.split(".")
                        .join("") > Package.version.split(".")
                        .join("") && Debugger.log("\x1b[33mNEW VERSION AVAILABLE! \x1b[32mYou are currently using version \x1b[35mv" + Package.version + "\x1b[32m. New version \x1b[35mv" + o.data.version + "\x1b[32m is available. You can update it using this command: \x1b[35mnpm install " + o.data.name + "@^" + o.data.version)
                })
                .catch(() => {
                    Debugger.error("An error occurred while checking for updates.")
                })
        })
        .catch(() => {
            Debugger.error("An error occurred while checking for updates.")
        })
}, 5e3), module.exports.Collection = Collection;