/* Calculate the time accumulated since the given start time */
const calculateTimeAccumulated = () => (startTime) => {
    return Math.floor((Math.abs(Date.now() - startTime) / 1000) / 60);
};

module.exports = calculateTimeAccumulated;
