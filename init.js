#!/usr/bin/env node

const fs = require('fs');
var path = require('path');


const basedir=process.argv[2];
const templatedirs=path.join(basedir,'templates');
const models=path.join(basedir,'models.js');
const views=path.join(basedir,"views.js")
const settings=path.join(basedir,"settings.js")


fs.mkdirSync(basedir);
fs.mkdirSync(templatedirs);
fs.writeFileSync(models,"")
fs.writeFileSync(views,"")
fs.writeFileSync(settings,"")

