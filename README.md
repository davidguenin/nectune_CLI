nectune
=======

Lifestyle media for developers

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nectune.svg)](https://npmjs.org/package/nectune)
[![Downloads/week](https://img.shields.io/npm/dw/nectune.svg)](https://npmjs.org/package/nectune)
[![License](https://img.shields.io/npm/l/nectune.svg)](https://github.com/davdevdesign/nectune/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nectune
$ nectune COMMAND
running command...
$ nectune (-v|--version|version)
nectune/0.0.0 darwin-x64 node-v10.16.3
$ nectune --help [COMMAND]
USAGE
  $ nectune COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nectune hello [FILE]`](#nectune-hello-file)
* [`nectune help [COMMAND]`](#nectune-help-command)

## `nectune hello [FILE]`

describe the command here

```
USAGE
  $ nectune hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nectune hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/davdevdesign/nectune/blob/v0.0.0/src/commands/hello.ts)_

## `nectune help [COMMAND]`

display help for nectune

```
USAGE
  $ nectune help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
