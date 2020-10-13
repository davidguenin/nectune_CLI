
<pre>
░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ ░▓▓  ░▓▓ ░▓▓▓ ░▓▓ ░▓▓▓▓▓▓▓
 ░▓▓▓▓░▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓░▓▓ ░▓▓      
 ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓   ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓▓▓▓▓▓ ░▓▓▓▓▓▓▓ 
 ░▓▓░▓▓▓▓ ░▓▓       ░▓▓      ░▓▓   ░▓▓  ░▓▓ ░▓▓░▓▓▓▓ ░▓▓      
░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓  ░▓▓▓▓▓▓▓   ░▓▓   ░▓▓▓▓▓▓▓ ░▓▓ ░▓▓▓ ░▓▓▓▓▓▓▓
</pre>


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


# Install Nectune

**NPM**

Install the CLI by running:
```
 npm i nectune
```

Update by running:
```
npm install nectune@latest
```

**Mac and Windows**

Direct download:
https://www.nectune.com/#install-cli


# Using Nectune


**USAGE**
```
$ nectune [COMMAND]
```

**COMMANDS**

<strong>The termzine</strong>
```
$ nectune yoworld
```    

Get all the articles of the current month:

```
$ nectune yoworld all
```

Get all the articles of the past months:
```
$ nectune yoworld [EDITION_ID]
```

---

<strong>The games</strong>
```
$ nectune cocobingo
```  
Get all the games of the current month:
```
$ nectune cocobingo all
```

Get all the games of the past months:
```
$ nectune cocobingo [EDITION_ID] 
```

---

<strong>The deals</strong>

```
$ nectune peepshow
```   
Search deals (maximum 3 TAGS):  
```
$ nectune peepshow [TAGS]
```    
Read a single deal:
```
 $ nectune peepshow [DEAL_ID] 
```

---

<strong>Find old content </strong>[EDITION_ID]:

```
$ nectune timemachine
```
