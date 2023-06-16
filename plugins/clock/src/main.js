
/**
 * The underscore variant of an intent exported function could exist to allow
 * the function to do some light validation of the type of query, meaning
 * a function could deny any intent based call
 *
 * Maybe this function can return a value between 0 and 1, of the confidence it
 * can be responded to. 0 being it won't respond, 1 being it will respond.
 * Where the standard recommendation is to return 1 or 0.5, but fancy packages
 * can be more accurate.
 */
function _getTime(opts) {
  if (opts.hasName() && opts.isLike(opts.name, "time")) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * The non-underscore variant, or otherwise intent exported function is the function
 * that will actually be called with any given intent
 */
function getTime(opts) {

}

module.exports = {
  getTime,
};
