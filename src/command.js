/**
 * This class serves as the entry point for any and all commands in the system.
 * Whether this is a command of an action for any particular device,
 * or is an intent that should be handed off to specific intent handlers.
 */

const Intent = require("./intent.js");
const IntentObject = require("./intent-object.js");
const History = require("./history.js");

/**
 * @class Command
 * @classdesc The `companion.command` global orchestrates all commands in the
 * system, including controlling devices, managing intents, and decoding text
 * and audio into intents.
 */
class Command {
  constructor() {
    // `companion` is not available in this constructor
    this.history = new History();
  }

  /**
   * @function init
   * The initalization function for the Command class. Currently an empty placeholder.
   * @memberof Command
   */
  init() {

  }

  /**
   * This function is the end all be all of adding a new command into the system.
   * An object should be passed, describing the type of command we are recieving.
   * There are a few valid types that would all be handled differently:
   *    - audio: An audio file that must be decoded as needed.
   *    - text: A raw text command that needs to be decoded.
   *    - intent: A direct intent command object, similar to an intent object,
   *              but includes the type of intent.
   *    - directive: A direct device directive, which would control behavior of
   *                 a device. The schema for this does not exist yet.
   * The command object should include at least two properties:
   *    - type: The type of command we are receiving, from the list above
   *    - content: The content of this command type.
   */
  add(opts) {
    let historyId = this.history.addCommand(opts);
    let res;
    switch(opts.type) {
      case "audio": {
        throw new Error("The Command Type 'audio' is not yet supported!");
        break;
      }
      case "text": {
        throw new Error("The Command Type 'text' is not yet supported!");
        break;
      }
      case "intent": {
        res = this.handleIntent(opts.content, historyId);
        break;
      }
      case "directive": {
        res = this.handleDirective(opts.content, historyId);
        break;
      }
      default: {
        throw new Error(`Unrecognized Command Type '${opts.type}' is not supported!`);
        break;
      }
    }
    this.history.editCommand(historyId, "resolution", res);
    return res;
  }

  /**
   * This function is intended to handle a specific intent.
   */
  handleIntent(obj, historyId) {
    if (typeof obj.kind !== "string" || typeof obj.intent !== "object") {
      throw new Error("Invalid Intent Object passed!");
    }

    let intent = new Intent(obj.kind, new IntentObject(obj.intent));

    let res = intent.act();
    // From here, we could also enlist or inspect a data type specified via
    // the intent object. While defaulting to text, in order to display this,
    // but we could also leave this handling up to whoever called the command
    // since only they will know the format of this data to be displayed.
    // Otherwise we can return

    this.history.editCommand(historyId, "object", intent);
    return res;
  }

  /**
   * Function to handle directives, that is objects defining how to control a
   * device. These aren't complex, and instead the burden of complexity is placed
   * on whoever calls the command
   */
   async handleDirective(obj, historyId) {
     let device = companion.inventory.devices.get(obj.target);

     if (device === undefined) {
       throw new Error(`Device: ${obj.target} does not exist!`);
     }

     this.history.editCommand(historyId, "object", device);

     if (typeof device[obj.command] === "function") {
       return device[obj.command](obj.params);
     } else if (typeof device[`${obj.command}Async`] === "function") {
       return await device[`${obj.command}Async`](obj.params);
     } else {
       throw new Error(`Device: ${obj.target} is unable to handle ${obj.command}!`);
     }
   }

}

module.exports = Command;
