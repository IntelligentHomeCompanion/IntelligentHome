Keep in mind the documentation in this folder should be temporary. Where it should all move to IntelligentHomeCompanion/Docs, but during development, ehh..


Second honest attempt at the IntelligentHomeCompanion idea, which again is the idea to forgo the current standard of connected home devices. Where nothing is really quite smart, just connected.
But to achieve an IntelligentHome first must come the Connected Home, then Smart Home.


# Core

Learning what I've seen from Pulsar, the core of the IntelligentHome should attempt to model closely the API that Pulsar has, being extremely open, operating on services. Likely implementing our own ServiceHub API.
Which is a huge improvement past the core functions calling other functions.

Of course, the entire core should remain as open as possible, and modular, ideally allowing nearly every meaningful component to be fully exchanged with another.

# Overview

Very zoomed out we should be looking at the following components:

  * Devices: Plugins that create and manage controls or even just connections or data collection from external devices. ie. Controlling lights, controlling TVs, or fans
  * Services: Plugins that create and manage controls or interactions between code only services. ie. Setting an alarm
  * Information: Plugins that expose additional information from the outside world to the core. ie. Temperature, Time, Wikipedia articles
  * Core: While the core itself can't be a plugin, the additional listed plugins will all interact more directly with the Core itself
    - webui: The Website UI of the entire application, that a community plugin is able to swap out completely
    - webui-theme: Theming for the website, that instead of totally replacing the UI, just replaces the theme
    - Plugin Manager: While this itself likely won't be a swappable service, rather a core API, this will manage the installation and updating of community plugins.
    - ServiceHub: Again not itself a plugin, but handles all installed plugins registering for specific services
    - notifications: The system that manages notifications, so that they can easily be displayed anywhere as needed

# Plugin Manager

Since the core itself, will contain as few APIs as possible, it doesn't make much sense to try and registering all the core services of the system via the core, when those can be plugins anyway.

What may be best is to load each plugin exactly the same, but some of them can identify themselves as being one of these core services then that itself is logged via the ServiceHub, where from there the ServiceHub can be the intended way to interact with each specific service, where since it knows of them, we could have `companion.serviceHub.getWeb().pluginName` or something like that. Meanwhile all other plugins that aren't in charge of core services, would still be normally available as plugins, meanwhile accessible via the ServiceHub for whatever service they are, relating to things more like devices and such.

An important distinction is that Core Services: refer to the core aspects of the companion application, meanwhile Services: Just refer to code only services of the Home Companion, such as being able to set a timer and such.

# How to Interact with Plugins

A big problem, is how do we interact with different plugins?

## devices

This can be rather simple, each devices have an agreed on feature set, then a `companion` key in the `package.json` can provide those individual functions that match that feature set, with standard values that will be provided.

To create interactions with devices, it's difficult to decide what system to choose that will provide the greatest success.

- Google Home: https://developers.home.google.com/cloud-to-cloud/guides
- HomeAssistant: https://developers.home-assistant.io/docs/core/entity

Both of these attempt to define every single type of device that might exist, as well as the properties or functions for them all. It may be best to find a middle ground between these to best support everything that might be possible.

For example, the properties of devices as supported by HomeAssistant can be significant help, meanwhile Google Home's method of preforming actions on devices is quite flexible.

What we can do for devices:
  * Intents that aim to command an action are regular intents, just with a special intent of command that will need to be handled by an intent handler plugin.
  * Then a command is it's own object that should be passed as a directive object.
  * This directive object can then target any one device and preform actions on it. If the original intent needed multiple actions preformed
    then the intent handler for the action must create multiple directives as needed.
  * The directive then will be similar to Google's Structure of controls for an object with parameters. Meanwhile each device will share several properties like HomeAssistant.
  * Each plugin for a device will have an `init()` function called during load. This init will allow the plugin to preform whatever setup is needed and begin either loading previously found devices, or start searching for new devices. Once a device is found it can create a new device from the global classes and add that to the global `devices` class that will store all active devices. These active devices then will receive directives as needed.

## services

This one is much harder. Since technically what anyone says would have to be converted into a serializable set of data that can be provided, that needs to be rich and generic enough that any service plugin can take advantage of it, meanwhile still attempting to retain all the information present. Even worse, it ideally would still need to be usable to every plugin. It wouldn't make much sense to make every single plugin decode text or audio data into something usable.

We could handle this the way Google Assistant Apps do, letting each plugin define a set of textual commands it accepts. But since even the understanding of how to handle text at all is very far off, it may be best to research similar concepts.

In short it seems there are several ways to approach this. One possible way is similar to how Google handled it's now deprecated Conversational intents.

Essentially an application could register functions to certain intents. Such as "Open app feature", "Create thing", "Get thing" and so on. So that I could register a function to "Get thing" and would receive an object containing the following possible fields: `thing.name`, `thing.type`. This may be the most realistic option, but does mean whatever decodes the initial query, will have to be very advanced to be able to parse data with any kind of accuracy. But from everything I've found this seems to be the most realistic option to except developers to work with, and with a large enough definition of fields being passed around, could allow complex enough interactions. On the topic of having an extensive library of parameters, it seems Schema.org has got us covered, and is in fact what Google based their possibilities on.

Resources:
  - Google: https://developer.android.com/reference/app-actions/built-in-intents
  - Schema: https://schema.org/Thing

## core services

Though these may be easier to define, since with this we will just be able to define the type of core service and easily link to it with it's defined accepted functions.

---

# Goals:

1. Have an application that allows users to (via a website) control their smart home devices.
2. Let users control these items with text and their voice
3. Throughout, the application shouldn't feel like HomeAssistant, where you must be a skilled techy to configure YAML files, and know the in's and out's of each service. For the most part things should attempt to be auto-configured, while still allowing deep customizability.
