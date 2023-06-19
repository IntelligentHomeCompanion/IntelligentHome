There's further initial details about devices within `overview.md` but this will attempt to cover them in more depth.

To operate a device there are a few components needed for it to all work:

  * the device: This is the device class itself, attached to the global inventory of the system
    This class should specify what plugin was used to add it, how to update it's properties
    allow easy access to it's properties, and maybe even link to a plugin that can handle intents for it
    (but also maybe not)
  * the discovery plugin: A plugin registered as `type: device` will facilitate discovery and addition of the device.
    This plugin can have it's `init()` function as well as an `update()` or `asyncUpdate()` functions to be called to look for devices. As it discovers devices on the network, it is then able to add them as a Device class to the global inventory.
  * intent handler: Finally to be able to control the device we need a plugin that can handle intents of `intents.handle_action` as any audio, text, or intents passed to `Command` would eventually resolve to. This plugin must be able to decde the intent details and then register a command of type `directive` to control this specific device. Even targeting the device within the directive.

As for the features and traits of devices, while originally this implementation attempted to be composed of endless classes extending from a base class, as would be the seemingly methodology of HomeAssistant.

The usage within Google Home may actually be better suited for longevity, since those devices are able to be a mix of several different 'traits'.

What will be done here instead, is a single device class that has a built in function of `addCapability()` which allows the addition of a specific capability.

This new capability will add as many or few parameters, or functions as needed to support itself. While ensuring to keep a running list of every capability added to the device, to allow other functions interacting with it to quickly and easily understand what parameters are available, or functions are available.

Although, it may still be worthwhile adding some prebuilt classes to be helpful of common device types.
But these should use the same built in `addCapability()` function
