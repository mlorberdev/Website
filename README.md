# Personal Website

Deployed [here](https://mlorber.com)

## Description

Personal website in vanilla JS made to resemble a chat session. I share my online details and invite the visitor to interact with a very non-AI avatar.

## Code Summary
* Coded in vanilla JS, uses fileReader, encodeURIComponent, and RegEx matching (sample below)
```javascript
let target = source
  .replace(/(?=(\<\!\-\-))(.*)(\-\-\>)/g,"") 
  .replace(/\n|\t/gm,"")
  .replace(/ +/gm," ") 
  .replace(/ \</gm,"<")
  .replace(/\s?=\>/gm,">") 
  .replace(/ \>/gm,">")
  .replace(/\: /gm,":")
  .replace(/\; /gm,";")
  .replace(/\, /gm,",");
```

## Screenshot

![screenshot](./assets/ss1.png)

## License
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)