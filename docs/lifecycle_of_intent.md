# The LifeCycle of an Intent

When an `intent` is triggered within the system it has a specific lifecycle used to preform whatever action it needs to, best being handled by whatever plugin is deemed to be correct.

An `intent` object is triggered like so:

```javascript
let command = companion.command.add({
  type: "intent",
  content: {
    kind: "get_thing",
    intent: {
      name: "time"
    }
  }
});
```

The above is passing an object to `companion.command.add()` which is the global endpoint to add any new command to the system. This `command` object is rather simple, containing only two values:

- `type`: This is the type of command being added, in this case the type is of `intent` although several other types are valid.
- `content`: This is the content of whatever type of command we are adding.

The content in this case, of course, is an `intent` object. Our `intent` object must only contain two properties:

- `kind`: This is the kind of `intent` we are passing. There's many possible values of this field. In our case we are using `get_thing` this means that our intent is attempting to 'get' a specific 'thing' such as information, or status of a device.
- `intent`: This object contains the properties for our `intent` to define what the purpose of our intent is or the context of the intent. In our case all we have is the name of the thing we are attempting to get. In this case that is `time`. Meaning we are attempting to 'get' the 'time'.

From here our `intent` is passed to the `command` class via the `.add()` function. This function inspects our `type` of the command object, and matches our type of `intent` and is passed to `Command.handleIntent()` passing the content of our command object. Once here a new `Intent` class is created, providing the actual `intent` properties as a new `IntentObject` class to the new `Intent` class.

From here our `Intent` class is told to `.act()` on it's current intent. To act it will first gather all `service` plugins on the system as `potentialPlugins` where it then filters out all the currently disabled plugins to create it's map of `compatiblePlugins`. With this new Map of plugins that's passed to the `Intent` class' `.rankIntentHandler()` function, which will attempt to return the single plugin best designed to handle this specific intent.

To do this the `.rankIntentHandler()` function will loop through every single passed plugin and call the 'underscore' variant of the handle function for this particular intent. For example if this plugin lists `intents.get_thing: getTime` in it's `package.json` that means `._getTime()` will be called on this plugin, which the plugin will have to implement. When it's called the current `IntentObject` is passed, to allow the plugin to inspect the content of the `IntentObject` and determine if it feels it could handle this particular user request. The plugin should return a 'float' number of `0.0-1.0` where `0` is zero confidence that it can handle the request, and `1` is total confidence it can handle this particular request.

At this point with the map `successReportPlugins` the `.rankIntentHandler()` needs to determine which of this plugins is the one true right answer for handling this request. The methodology here is currently unknown, but currently the first plugin is always provided.

Once this plugin is provided back to `.act()` the `Intent` class can preform the function listed by the plugin for this particular intent. Again in this case of `intents.get_thing: getTime` the plugin's `.getTime()` function is called provided the `IntentObject` class, where the plugin can do whatever is needed to handle the intent. This may mean the plugin can't handle it, and must return an error, but otherwise hopefully means the plugin handle's the intent successfully and returns it's results. In this specific case of our intent being to 'get' the 'time', ideally that information is a string of the current time. Plugins that have intent handlers should always default to providing information as a string, but depending on the intent this can differ.

---

Other times though, the intent may not be as simple as the example above. Such as the user asking to 'Turn off the lights.', in this case we would need an plugin to handle the intent of `intents.handle_action`. This intent is then gong to be used just like above, filtering all possible plugins, calling the underscore variant of the official handler functions and so on. That is until the official handler function is called. At this point the plugin handling the intent is not expected to actually turn off the lights. Since the contents of the request may actually be rather complex, such as needing to find out what the 'lights' are in this specific scenario, depending on what device initiated the intent, or it's location, or based on what lights are currently connected to the system. Instead the plugin handling this intent must be able to determine all of these aspects, and once done, it then needs to command these devices to act accordingly. In this case that means adding a new command in the system for each specific device that needs to be modified. Such as

```javascript
let command = companion.command.add({
  type: "directive",
  content: {
    command: "setFanSpeed",
    target: "device-id-001",
    params: {
      fanSpeed: "speed_high"
    }
  }
});
```

As we can see again, any command object needs it's `type` and `content` fields. But in this case as this is a direct action for a device, we need the type `directive`. The content then is a Device Directive Object. This object must contain three properties:

- `command`: This is the specific command to execute.
- `target`: This is the target device to affect.
- `params`: This is an object containing all relevant parameters to change.
