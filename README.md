
```
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
                  ░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓  ░▓▓ ░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓                  
                   ░▓▓▓▓░▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓░▓▓ ░▓▓                        
                   ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓   ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓                   
                   ░▓▓░▓▓▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓░▓▓▓▓ ░▓▓                        
                  ░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓   ░▓▓   ░▓▓▓▓▓▓▓ ░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓                  
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
```


**Nectune pushes entertainment directly on your terminal: media, games, deals and much more!** 
Our mission is to bring you original content every day.

**Technically Nectune is a simple CLI which allows you to connect to our API and ensure the layout of the content.**
The commands enable navigation in the different categories like a menu on a website.

We use the Oclif framework to build our CLI.
**All content and illustrations are created from scratch.**

Nectune is a young project, we are open for all your feedback. Visit our site to contact us.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nectune.svg)](https://npmjs.org/package/nectune)
[![Downloads/week](https://img.shields.io/npm/dw/nectune.svg)](https://npmjs.org/package/nectune)
[![License](https://img.shields.io/npm/l/nectune.svg)](https://github.com/davdevdesign/nectune/blob/master/package.json)


## Getting Started

#### NPM

#### 1 - Local install and use of npx

**Local installation with npx**

*npx is included directly in npm since version 5.2.*

- From the user directory, run: `npm i nectune`
- Then run `npx nectune` anywhere to launch nectune

You can of course also launch the CLI directly from the installation folder by running `nectune`

*OR* 

**npx alone**

- Just run `npx nectune` anywhere

*-> You will have a waiting time at each launch because npx downloads the latest version globally each time.*


#### 2 - Global install

- Install the CLI globally, run: `npm install -g nectune`

- To launch the CLI, run: `nectune`

*If you encounter permissions problems you can find help with this npm documentation:* [npm help documentation](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)


#### Mac and Windows

Direct download from our [website](https://www.nectune.com/#install-cli)


## Using Nectune

Basic usage, run: `$ nectune [COMMAND]`

**COMMANDS**

**yoworld => the termzine**

- Get the last post with chat: `$ nectune yoworld`    

- Get all the posts of the current month: `$ nectune yoworld all`

- Get all the posts of the past months: `$ nectune yoworld [EDITION_ID]`


**cocobingo => the games**

- Get the last game with chat: `$ nectune cocobingo`  

- Get all the games of the current month: `$ nectune cocobingo all`

- Get all the games of the past months: `$ nectune cocobingo [EDITION_ID] `

**peepshow => the deals**

- Get the last deals: `$ nectune peepshow`  

- Search deals (maximum 3 TAGS): `$ nectune peepshow [TAGS]`   

- Read a single deal: `$ nectune peepshow [DEAL_ID] `


**timemachine => find old content**

- Get all the editions of the games and lives: `$ nectune timemachine`

**piou => send messages**

- Send messages for the different channels: `$ nectune piou`

*Use tags to target the channel: the name of the channel as tag name.*


## Display information

**Screen size** 
With a reasonable font size (not too big) Nectune's layout works from a 12-inch screen.
If the layout seems broken when rendering, try reducing the font size of your terminal.

**Missing characters**
Nectune uses the following character families: *Ascii, Emojis, Geometrics shapes, Block elements and Box drawing.*

The majority of terminals integrate these fonts, but encoding problems are frequent.

If some characters are not displayed (*empty square or question mark)* try changing font family.

As far as Emojis are concerned, there is normally no problem on mac. On Linux it may be enough to install a font to recognize them. On Windows it's more complicated, we are working to fix this problem.