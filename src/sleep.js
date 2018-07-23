/* Set a timer for a number of seconds */
const sleep = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, (seconds * 1000));
    });
};

module.exports = sleep;
