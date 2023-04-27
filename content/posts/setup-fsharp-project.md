---
title: "Setup a Fsharp Project"
publishdate: "2023-04-27T08:42:08+02:00"
draft: true
---

When trying to learn FSharp and get things setup you quickly go down the rabbit hole of this framework, called dotnet. Dotnet is like an overarching framework for multiple languages that are made by Microsoft, although I think they're open source now adays. Atleast FSharp is. The other languages that you can use "on top" or "together with" dotnet is CSharp and Visual Basic.

As the CSharp community is so huge in comparison to the FSharp community (I dont know about Visual Basic) there is an issue with getting a lot of guides and stuff on CSharp while you were searching for FSharp. And alot of that is usefull, but you wont know that if your first encounter with dotnet is FSharp. So it's hard to pick the berries out of the cake at this moment.

That's why, for your and mostly my own sake, I took the time to write down the working setup I've as of now. Obviously this is no "best practice" (dont know them yet) and there might be things lacking.

## Install dotnet

There are way to many names thrown around in dotnet. .NET Sdk, ASP.NET, .NET Core, .NET Framework and the list goes on. But what you need is just called .NET on the download page. Go to [the Microsoft dowload page for .NET](https://dotnet.microsoft.com/en-us/download) and download the suiting version of .NET. 

Once installed you should have the command `dotnet --version` available in your command line and it should return the expected version.

## Initialize a new dotnet thing

The standard way of starting a new dotnet project, app or basically any other thing you can build with on top of dotnet is to use the `dotnet new` command together with a template name.

### Templates

I would say that the easiest (the least boilerplate to understand) is to start with a console application. And for that there is a console template we can use together with the `dotnet new` command like.

But we want to do it for FSharp, so as CSharp is the default for any `dotnet new` command we have to specify that with a `--language` or shorter `-lang` flag.

We also want to place the new project inside a directory, for that we use the `--output` or shorter `-o` flag.

__Dry run:__ if you would just like to run the command below to create the console application but without eventuall suprises we can add the `--dry-run` flag to run the command but not create any files or folders.

### What templates are there?

There are alot of different templates available for dotnet. Some are custom and some are built in. The builtin templates are listed at the [Microsoft templates webpage]( https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates ).

## Tab completion for the `dotnet` command

For a better expecience we can use the `dotnet` command tab completion. There is a good guide for each major shell at the [Microsoft tab completion page](https://learn.microsoft.com/en-us/dotnet/core/tools/enable-tab-autocomplete).

## Create a console app

So to create a new console application in a folder called "HelloWorld" in FSharp we can write: 

```bash
dotnet new console --language "F#" --output HelloWorld
# with the "--dry-run" flag
dotnet new console --language "F#" --output HelloWorld --dry-run
```
When not using the "--dry-run" flag the below files and folder structure is created for us.

```
HelloWorld
├── HelloWorld.fsproj
├── Program.fs
└── obj
```

In addition dotnet has also downloaded and "restored" nessesary packages for us. 

__Note:__ The `dotnet restore` command can be ran to ensure that packages/dependencies are up to date and that they work together.

## The `.fsproj` file

The project "config" file is called `HelloWorld.fsproj` and tells dotnet what dependencies we want to use, specific project options as well as what files to include when the program should combile/build. Our generated `HelloWorld.fsproj` file looks like below.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <Compile Include="Program.fs" />
  </ItemGroup>

</Project>
```

It tells us that we want to output an executable file with the `<OutputType>` property and that we "target/build for" dotnet version 7.0 with the `<TargetFramework>` property (it's the most recent at the time of writing, yours might say another version if you're in the future).

Files that should be included when compiling are listed in the `<ItemGroup>` section, and for each file we have a `<Compile Include=".....">` property. In our case there is only on for the `Program.fs` file.

## Compile and run

Now you should be able to compile and run the `HelloWorld.fsproj` file with the commands `dotnet build` and the `dotnet run`. And the output should be

```bash
Hello from F#!
```
