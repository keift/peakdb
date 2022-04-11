module.exports = {
    log: o => {
        console.log("\x1b[36mpeakdb \x1b[34m» \x1b[32m" + o + "\x1b[0m")
    }
    , error: o => {
        console.error("\x1b[36mpeakdb \x1b[34m» \x1b[31m" + o + "\x1b[0m")
    }
};
