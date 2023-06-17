# Usage-ish

Alright, as things are getting relatively complicated lets go over the implementation.

When the IntelligentHome Service is started up it runs `main.js` which initiates the global `companion` item, as well registering process signals that indicate the server needs to shut down.

To register the global it assigns the global as an instance of `companion-environment.js` which then calls the following items:
  - `config`
  - `pluginManager`
  - `command`
  - `exterminate`: Inherits the one created within `main`

This means all of these items are available via the `companion` global. Once fully setup `main` calls the `init` function within the `CompanionEnvironment` which then calls the `init()` of all it's services listed above.

At this point once everything is setup, we are ready to start receiving commands. Which once received `Command` will create a new command helper based on the type of data received. Such as an `Intent` which can handle any intent objects, otherwise handling user requests.

It's also setup to be able to handle raw text, or audio files to extract an intent from them. Lastly, it is setup to handle `directives` which is the final type of command, which instruct a device on the system to do a task.

Optionally, we may want to instead setup a directive as an intent, that's just intended to be used against devices. Since that will help to avoid yet another data standard within the system. 
