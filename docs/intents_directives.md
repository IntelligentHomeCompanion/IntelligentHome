# Intents & Directives

While these are the most complex object structures within the system, they serve two very important purposes.

## Intents

An intent should be passed as a command, when you intend for 'something' to happen.
This may mean you intend to start playing a show, you intend to turn on the lights.
Whatever it is, it's generic and slightly unknown.

Do you know the ID or IP address of the lights to turn on? No, you just know "The lights".
Intents utilize Schema.org's fantastic properties to detail all the information
possible before being handed off to a plugin. Where the plugin that's able to handle
this is then the one responsible for descerning meaning, and exact details.

Once the plugin is able to determine exactly what is intended to happen, then they
can fire a directive.

## Directive

A Directive should be passed as a command when you are directing an exact thing to happen.
This means you are telling a specifc device to do a very specific action. There
is no ambiguity in this direction.

The schema of a directive is mostly custom, consisting of a single command
(This command should relate to an official intent, matching the intents from Androids
built in intent schema). Also containing a target, or device to affect, as well
as finally parameters, that relate (roughly) to device traits as defined by Google's
Smart Home system.
