---
title: Useful GNU Readline Settings
publishdate: 2019-03-08T12:42:30.607Z
image: gnu-readline-settings.png
draft: false
---
I thought I would share some of the settings found in my `.inputrc` [GNU Readline](https://www.gnu.org/software/readline/) configuration file.

As you’ve already ended up on this page you probably already know what GNU Readline is, but for those who don’t, here’s the one-sentence explanation:

> GNU Readline is a software library that provides line-editing and history  capabilities for interactive programs with a command-line interface, such as Bash.

Most users come in contact with GNU Readline through the “Bash prompt” or programs like the MySQL shell. Most of the GNU Readline settings can be set in each programs respective configuration file. Like `.bashrc`. But the `.inputrc` is specifically for GNU Readline. So the settings there will be inherited by any program that implements GNU Readline. In other words, same settings almost everywhere 🤓.

## Settings

```
set bell-style none
```

Turns off any annoying beeps bash makes, like the one when you hammer the backspace while you’re at the start of the prompt. No more “ding ding ding” 🙌!

```
set colored-stats on
set colored-completion-prefix on
```

The first option, `colored-stats`, makes your completions colored just like when you `ls --color=auto`. The second line puts some color on the current prefix used to search possible completions. For example if you type `apt-` and then hit tab, the `apt-`-part will be highlighted when GNU Readline gives you completion suggestions like `apt-get` and `apt-cache`.

```
set completion-ignore-case on
set completion-map-case on
```

The first line is self explanatory, it turns off case sensitivity. The second option, `completion-map-case` isn’t a great label. What it does is to treat hyphens `-` like underscores `_` and vice versa. This option only works when `completion-ignore-case` is turned on, like above.

```
set echo-control-characters off
```

When your timing is off or your brain stops working when jumping around the command line you just throw combinations like `Ctrl+C` for no reason. And GNU Readline is polite, so it just thinks “what the hell” and echo out your combo 🤜🤜🤛👊🤛🤜. This settings tells GNU Readline that it doesn’t have to bother.

```
set menu-complete-display-prefix on
```

When hitting `Tab` to search possible completions, GNU Readline will show you the common prefix for the possible completions and present them in a list. For example, if I have a `package.json` file and a `package-lock.json` file running `vi p` + `Tab` will make GNU Readline list the two files and append to your prompt up to `vi package`. This is because all (both) possible completions share the prefix `package`.

```
$if Bash
 Tab: menu-complete
$endif
```

By default, Bash binds a function called `complete` to the `Tab `key. That function show a list of possible completions and completes up to the lowest common prefix. If you keep hammering on the `Tab` key, just repeats this action. With `Tab` bound to `menu-complete`. Bash will cycle through the options as you keep hammering the `Tab` key, much better! There’s also `menu-complete-backwards`, hmm?? 🤔😉

## There’s more

If you’re using the GNU Readline (command line) a lot and want to tweak and bend it. Fire up a terminal emulator and `man readline`.

Hope you had a nice read and you learned something. Bye. 👋
