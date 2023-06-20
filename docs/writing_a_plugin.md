# Writing A Plugin

Plugins are the beating heart and soul of IntelligentHomeCompanion (IHC), plugins allow IHC to have new features, gain new abilities, and support new devices.

And depending on your skill set there are a whole host of different kinds of plugins that can be written. But let's get started.

## Creating your `package.json`

The `package.json` of a plugin is just like those used within NPM, for those familiar.
Meaning you can have your own set of `dependencies` and build scripts as needed.

But when creating this file, there is a special key used within IHC. Fittingly this special key is called `companion`, this key allows your plugin to specify the kind of plugin it is, as well as the features it supports that relate to that type.

The two required properties for this plugin to be useful are:
  * `version`: This is the version of IHC it is known to work with.
  * `type`: This is the type of plugin you have.

There are a few valid types of plugins and depending on that type will dictate our last field within the `companion` object.

If your plugin adds a new `service` to IHC, such as being able to tell the time, or control a device, or query a remote API then you'll need a `companion` object like so:

```json
"companion": {
  "version": "1.0.0",
  "type": "service",
  "intents": {}
}
```

As you can see the `type` is now `service` with an `intents` object. This exposes what types of `intents` your `service` is able to support, but more on that later.

Otherwise if you plugin adds support for a new device, your `companion` object will look like this:

```json
"companion": {
  "version": "1.0.0",
  "type": "device"
}
```

Much shorter, but having the `type` `device` comes with some expectations of the functions that will be available by default.

Here's a quick list of every `type` that's valid within an IHC plugin:

  * `service`: Means your plugin provides a new `service` for intents, such as getting the time, setting alarms, handling intents to then control devices etc.
  * `device`: Your plugin provides support for a new kind of device.
  * `web`: Your plugin acts as the main backend used within IHC.
  * `webui`: Your plugin acts as the main frontend used within IHC.
  * `webui-theme`: Your plugin provides theming for the main frontend.

## Writing your Plugins Code - Service

Since a service plugin has to be able to handle `intent`s the first thing that will need to be done, is define what intents your plugin supports.

This is done within the `package.json` `companion.intents` object, where you can define the function names for each intent your plugin supports.
These function names must be exported from the main module, as well as have their compatibility check function exported as well, but more on that later.

For example, if your plugin is able to support the `get_thing` intent via the function `getTime()` your `companion.intents` object would look like the following:

```json
"companion": {
  "version": "1.0.0",
  "type": "service",
  "intents": {
    "get_thing": "getTime"
  }
}
```

Where the `intents` object can have as many keys as your plugin supports.

Each function used as the value of a key however **must** have a compatibility check function as well.

With the above example of `getTime` that means we **must** have the following in our functions main module:

```javascript
function getTime(opts) {
  // This function should handle our 'get_thing' intent
}

function _getTime(opts) {
  // This function is used as the compatibility check
}
```

The reason the underscore variant of your intent handler function must exist is to ensure your plugin can accurately handle the intent being passed to it.

Since any single intent can likely never be handled by a single plugin, instead needing many of plugins to handle every possible intent, each plugin is able to report it's confidence that it can handle the intent being passed.

When `_getTime()` is called the intent will be handed to it, and your plugin should report a number between `0` and `1` of how confident it is, that it will be able to handle this intent. Where `1` is totally confident. Remember within the underscore variant, no changes should be made, and this check should attempt to be as fast as possible, since every intent will likely be passed through several different plugins before finally being resolved.

Once all plugins report their confidence the IHC `Intent` class will determine which plugin will actually be able to handle this intent, and only then calls the `getTime()` function with the intent, expecting any actions that need to be taken will be taken.

At this stage, the intent object itself may specify how to return the data, otherwise it should always be assumed to return text.

## Writing your Plugins Code - Device

When creating a device plugin it's expected your plugin will export an `update()` or `updateAsync()` function from it's main module.

This function is called during every `refresh` event on the system automatically, allowing it to check for any new devices to discover during every `refresh` event. This ensures new devices are always discovered in a timely manner.

During any of these checks, if a device is found, you'll be able to create a new `Device` and add it to the global `Inventory`.
