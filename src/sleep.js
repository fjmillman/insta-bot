/* Pause execution for a sleep delay for a number of given minutes */
const sleep = minutes => new Promise(resolution => setTimeout(resolution, minutes * 1000 * 60));

module.exports = sleep;
