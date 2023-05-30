---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'webcrack'
  # text: 'Deobfuscate, unminify and unpack bundled javascript'
  # tagline: My great project tagline
  logo: https://user-images.githubusercontent.com/55899582/231488871-e83fb827-1b25-4ec9-a326-b14244677e87.png
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: API Examples
      link: /guide/api-examples

features:
  - title: Deobfuscate
    details: Undo all the obfuscation techniques of <a href="https://obfuscator.io">obfuscator.io</a>
    icon: 🛡️
  - title: Unminify
    details: Convert minified code to human readable code
    icon: 🧹
  - title: Unpack bundles
    details: Extract modules from webpack and browserify bundles to separate files
    icon: 📦
---
