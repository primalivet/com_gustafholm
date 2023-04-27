---
title: "Nvim for Fsharp"
publishdate: "2023-04-27T11:42:11+02:00"
draft: true
---

There isn't much support in Neovim for FSharp delelopment, atleast not at the time of writing. So the "out of the box" experience is quite not there.

To make it better I though I would list some software which helps with FSharp development in Neovim.

A very usefull package for FSharp development in Neovim is [Ionide](https://github.com/ionide/Ionide-vim) It provides a lot of "intellisense" features around FSharp. It does have dependency on `dotnet` itself as well as the language server `fsautocomplete` and the code formatter `fantomas`.

## Install whats needed

1. Install the [Ionide](https://github.com/ionide/Ionide-vim) plugin with the manager of your choice.
2. Install `fsautocomplete` using dotnet command with `dotnet tool install --global fsautocomplete`
3. Install `fantomas` using dotnet command with `dotnet tool install --global fantomas`

## Update your `$PATH`

By default these "tools" are installed in your `$HOME` directory in a folder called `.dotnet/tools`. And given that the Ionide plugin will initiate the language server (fsautocomplete) and formatter (fantomas) with the command `fsautocomplete` as well as `fantomas` these tools need to be available in you `$PATH`. To set that up include the following in your `.bashrc` or `.zshrc` depending on what you use:

```bash
export PATH="$HOME/.dotnet/tools:$PATH"
```

## Set needed autocommands

There are plugins doing the below stuff for you like [adelarsq/neofsharp.vim](https://github.com/adelarsq/neofsharp.vim) to name one. But to me Ionide-vim gives good enough fsharp basic support. But we still need to tell Neovim that the Fsharp file extentions should match the `fsharp` filetype in Neovim with a autocommand. As well as setup a `commentstring` to help toggle comments if you use something like [tpope/vim-commentary](https://github.com/tpope/vim-commentary).

```lua
vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead" }, {
  group = group,
  pattern = "*.fs,*.fsx,*.fsi",
  callback = function()
    vim.cmd([[set filetype=fsharp]])
    vim.cmd([[setlocal commentstring=//\ %s]])
  end,
})
```

And then a autocommand to relate the `.fsproj` filetype to the `xml` filetype.

```lua
vim.api.nvim_create_autocmd(
  { "BufNewFile", "BufRead" },
  { group = group, pattern = "*.fsproj", command = "set filetype=xml" }
)
```

If you want to dig futher into Neovim setup I host my configuration at [github.com/primalivet/dotfiles](https://github.com/primalivet/dotfiles).

