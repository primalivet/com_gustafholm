---
title: Common Way of Resizing Windows/Panes in Vim and Tmux
publishdate: 2019-03-08T12:53:16.359Z
image: resizing-in-vim-and-tmux.png
draft: false
---

It's not often, but once in a while I want to resize a window in Vim or a pane in Tmux. And every time I'm thinking that I should rebind some keys to make the two programs more similar. So in Vim I use the default bindings for resizing buffers. But I've tweaked them a bit.

The only thing I've done is to rebind the keys in whatever mode (just `noremap`)
to increase and decrease by 5 instead of the default 1.

```
noremap <C-w>+ :resize +5<CR>
noremap <C-w>- :resize -5<CR>
noremap <C-w>< :vertical:resize -5<CR>
noremap <C-w>> :vertical:resize +5<CR>
```

More info in Vim help system at `:h window-resize`.

In Tmux I bind the same keys used in Vim (now with Tmux prefix odiously, I use
`Ctrl+A` like most others). Here I change the value by 10 instead of 5. Only
reason for this is that it feels right. I think the system are in columns and
rows or something, that doesn't really matter.

```
bind-key -r '+' resize-pane -U 10
bind-key -r '-' resize-pane -D 10
bind-key -r '<' resize-pane -L 10
bind-key -r '>' resize-pane -R 10
```
The `-r` flag passed into the binding makes it repeatable. So when you press
your prefix, you have a certain time to hammer `>` for example to make the pane
increase to the right. The time you got depends on your `repeat-time` option
which defaults to 500 milliseconds.

Thanks for reading, "underbart är kort" ;)
