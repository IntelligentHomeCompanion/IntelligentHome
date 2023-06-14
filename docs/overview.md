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
