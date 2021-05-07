---
title: Setup Ale for Project Local Linting and Fixing in Vim
publishdate: 2019-03-08T13:28:43.454Z
draft: true
---

Stuff like linting and fixing can be a hustle in any enviroment. In
Vim, most humans tend to use [Ale](https://github.com/w0rp/ale), an async
linting and fixing engine. Basically it's a plugin that looks for language
specific command line linting and fixing tools.

{{< img src="reduce-filter-map.gif" alt="Artwork for Reduce, Filter, Map" caption="Read the article reduce filter map!" credit="Gustaf Holm" >}}


## Basic Ale setup

First, install the Ale plugin. After that, I like the following to global
settings in my `~/.vimrc` or `~/.config/nvim/init.vim`.

```
".vimrc
let g:ale_linters_explicit = 1
let g:ale_fix_on_save = 1
```

Ale is automatically turned on for any supported file type with it's default
linter and fixer, and those with each default set of set of rules. So the first option `let
g:ale_linters_explicit = 1` turns linters off until you tell it to turn on some
specific linter.

Knowing that, one option is to place file type/language specific linter and fixer
settings in a Vim filetype plugin file like
`~/.vim/after/ftplugin/javascript.vim` for Javascript files. However, this will
make Ale turn on the rules you specify in javascript.vim for any Javascript
file. 

This makes it a hassle to use project specific settings. E.g. if I use
ESLint for project A and B I would place `let g:ale_linters = { 'javascript':
['eslint'] }` in my Javascript.vim file type plugin. But now, project C turns up
and want to use JSHint, :| oh no. Where should we put that? I don't know.

So instead of the inherited problem when using file type settings, let's figure out
how to use project settings.

## `.local.vimrc`

What I mean here by a local vimrc is a Vim configuration file that's in the root
of your project folder. It should only be sourced when Vim uses the project root
directory. Imagine the following directory structure.

This concept idea is far from new, a quick you'll find plugins like
[vim-localvimrc](https://github.com/embear/vim-localvimrc) and
[local_vimrc](https://github.com/LucHermitte/local_vimrc) which both make Vim
use a local `.vimrc`. But they also come with a ton of features and make me
depend on another plugin. I don't want that. So here's a super simple script
which just load the `.local.vimrc` in Vim's `:pwd`.

```
" .vimrc
" check if autochdir is 0 (false) and there is a .vimrc.local in the pwd
if (has('autochdir') == 0) && (filereadable(globpath('.', '.local.vimrc')))
    " if yes, load it up!
    let s:lvimrc_unresolved = fnamemodify('.local.vimrc', ':p')
    let s:lvimrc_resolved = resolve(s:lvimrc_unresolved)
    execute "source" . s:lvimrc_resolved
endif
```

Add that to your `.vimrc` and it will load any `.local.vimrc` file that sits in
a project's root directory, as long as Vim's "working directory", print it with
the command `:pwd` inside Vim. The working directory in Vim is set to the same
directory as where you opened Vim.

## Configure `.local.vimrc` for your project

I figured I won't leave you hanging with a working bit size script to load local
`.vimrc` files without giving an example. Here's a `.local.vimrc` a potential
WordPress project which uses [phpcs and
phpcbf](https://github.com/squizlabs/PHP_CodeSniffer) as linter and fixer for
PHP files and [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
as linter and fixer for Javascript.

```
" .local.vimrc
let g:ale_linters = { 
    \ 'javascript': ['eslint'], 
    \ 'php': ['phpcs'] 
    \ }

let g:ale_fixers = { 
    \ 'javascript': ['prettier'], 
    \ 'php': ['phpcbf']
    \ }

let g:ale_javascript_eslint_use_global = 0
let g:ale_javascript_prettier_use_local_config = 1
let g:ale_php_cs_fixer_user_global = 0
let g:ale_php_phpcs_standard = 'Wordpress'
let g:ale_php_phpcbf_use_global = 0
let g:ale_php_phpcbf_standard = 'Wordpress'
```

The settings above should be pretty self explanatory. Be sure to read up on
settings you don't understand at `:help [insert_ale_setting]`. Some of them are
default settings but I like to be explicit in these files as it's clear what's
going on, especially when you haven't touched the project for a while.

The setup above assume that you've also keep project root directory also houses
a `compose.json` for PHP packages and `.eslintrc` and `.prettierrc` together
with a `package.json` to handle Javascript. Here are samples of those files

### `compose.json`
This makes sure the needed PHP packages exists. You'll also need
[Composer](https://getcomposer.org/) to
install these packages.
```
{
  "require-dev": {
    "squizlabs/php_codesniffer": "3.*",
    "wp-coding-standards/wpcs": "^1.1",
    "dealerdirect/phpcodesniffer-composer-installer": "^0.5.0"
  }
}
```

### `package.json`
This makes sure the needed Node packages exists. For this you'll need Node and
NPM or Yarn.
```
{
  "name": "example",
  "devDependencies": {
    "eslint": "^5.8.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-node": "^8.0.0",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-standard": "^4.0.0",
    "prettier": "^1.14.3"
  }
}

```

### `.eslintrc`
This uses the terrific [Standard JS](https://standardjs.com/) linting rules.
```
{
	"extends": "standard"
}
```

### `.prettierrc`
This fixes the Javascript to use single quotes and no semi colons. How do you
like it? haha :)
```
{
	"semi": false,
	"singleQuote": true
}
```

The settings above are all samples and Composer, Node, NPM, ESLint, Prettier and
CodeSniffer are all subjects of their own.

I hope you found this text helpful. Bye!
