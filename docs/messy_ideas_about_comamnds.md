Alright, so it's no secret one of the biggest conceptual struggles is how do you turn a hyper hackable set of plugins, where you won't know what exists into an application that can take the natural language, and call these functions and return responses.

Google seemed to be confident in using `intents`. This system would allow an app to define the intents their application could handle. The issue with this is that the NLP parser must have to be much more advanced, but really this seems like the best way forward for this project.

But with that said, lets focus slightly bigger picture (not really)

## Overview

The basic idea of how a users text/voice can turn into function calls is this:

  * Obviously, their request will have to be parsed. But it should then be turned into a collection of items and things from `schema.org`, essentially allowing something like this: "What time is it?" => "{ name: 'time' }" then we could even optionally include "{ expects: 'time' }" to help indicate what type of response is expected.

  * But once a command is parsed into this object, how do we know which plugin to call?
    Well similar to google, we can try to use the `intent` system. Meaning we have a list of possible supported `intent`s such as `get_thing`, `pause_exercise`, `get_cart` and so on. This information doesn't have to be passed down to plugins, but does need to be known at one point in the application.

  * Alright, now really how do we know what plugin to call?
    Well now that we have an `intent` and an object representing the `intent` we can look through all plugins that provide services, and inspect the `companion.intents` object, so that we can match the plugins supported intent against our current intent. Of course at this point we don't know what the right plugin is. We might have a list of 10 plugins all supporting `companion.intents.get_thing` but obviously not all of them can tell use about the status of our light bulb.

  * A possible way of helping to determine which set of plugins is the right one to call can be by using a precall, in the `package.json` each `intent` will list the right function to call from the package's main module. But by calling that same function name with `_` preceding, we could call that to allow the plugin to inspect the object data we would pass to it's twin function, and return a confidence that it could answer this intent correctly. Returning any number between `0-1` where `0` is not confident it could answer the intent.

  * With all of that, similar to how Google Assistant works, we could then rank the results based on additional factors, such as previous request, location, or whatever is deemed helpful. As well as the precall's returned confidence scores. So that way we could then choose any particular function and make the final call to it and return its data.

  * Of course this last part will have to be sure to catch any errors, as well as be prepared for incorrect responses and return an error. But while complicated, this could allow any number of plugins to be added. The only solid concern I can see at this point is performance. Since calling dozens of functions before ever being able to return, might make each request take some time. It's possible that there could be a pre-rank time, where say the last several times a user has requested the time, or even asked the exact same intent that a certain package answered, then that package can be asked first. Or via methods like this package's can be called in order of their `assumed confidence` scores. Or even, if a package responds with a high enough score, and we have a minimum number of checks, then we can call that package right away without having to check each one.
  Additionally, a system of assumed confidence could allow an in-point in customization, since users could supply assumed confidence levels to plugins they would want to be preferred more often in some contexts. But the exact methodology here will have to be seen

## Intent Object

While some aspects of this class should be obvious, such as `hasFIELD()` being a simple way to check validity of a field, such as existing, being a string and so on. But others like `isLike()` might be less obvious.

The concept is, for a plugin to validate the type of intent being passed to them, it's very likely they will need to check the value of certain things, such as thing names, or locations and many other things. But without yet knowing exactly how the parsing of data will work, it's hard to imagine, that these values will always be decoded back to exactly "time" as needed, and not "time of day", "time right now" and so on. So by provided a function `isLike()` allows us to take what the name of the thing is, and what the plugin can support, and we can do our best to inspect and return if they likely refer to the same thing.

This can be done, not only with a huge collection of synonyms, but also very likely a whole lot of machine learning, where if our confidence is high enough we return true, otherwise false and the plugin will not act on this intent.

As for keeping code clean, the Intent Object will likely focus on building out the object itself, and then a SchemaObject can be in charge of handling all schema items.
