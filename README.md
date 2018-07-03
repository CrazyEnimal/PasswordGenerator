# Password Generator

A module for ProcessWire CMS/CMF. Adds a password generator to InputfieldPassword with configured password mask.


![generator](https://user-images.githubusercontent.com/1538852/31315139-c80089c2-ac6e-11e7-91dd-778be3302dc8.gif)

## Usage

[Install](http://modules.processwire.com/install-uninstall/) the Password Generator module.

Now any InputfieldPassword has a password generation feature. The settings for the generator are taken automatically from the settings* of the password field.

*Settings is a simple set to mask for password:

* Complexify: but generated passwords should still satisfy complexify settings in the recommended range in mask not set.
* Banned words: but the generated passwords are random strings so actual words are unlikely to occur.
