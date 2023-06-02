[![license](https://img.shields.io/github/license/j4k0xb/webcrack)](https://github.com/j4k0xb/webcrack/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ba64bf80-7053-4ed8-a282-d3762742c0dd/deploy-status)](https://app.netlify.com/sites/webcrack/deploys)

<p align="center">
  <img src="https://user-images.githubusercontent.com/55899582/231488871-e83fb827-1b25-4ec9-a326-b14244677e87.png" width="200">
</p>

<h1 align="center">webcrack UI</h1>

## About

Frontend for the [webcrack](https://github.com/j4k0xb/webcrack) deobfuscator/unpacker that runs entirely in the browser.

## Query Parameters

Pass either `code` or `url` parameters to load code into the editor.
Keep in mind to encode them (e.g. `encodeURIComponent` in js).

| Parameter | Description                                  |
| --------- | -------------------------------------------- |
| `code`    | Code as a string                             |
| `url`     | URL to fetch code from                       |
| `run`     | Automatically start deobfuscation (optional) |

Examples:

- <https://webcrack.netlify.app/?code=1-1&run>
- <https://webcrack.netlify.app/?url=https%3A%2F%2Fpastebin.com%2Fraw%2Fye3usFvH>

Note: Use this only if you don't mind netlify or corsproxy.io seeing the code/url, otherwise paste it directly into the editor.
