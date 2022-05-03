const fs = require("fs");
const file = "presets.json";
const content = JSON.parse(fs.readFileSync(file).toString());
/*content.resolutions.sort((a, b) => {
  const dh = a.h - b.h;
  if (dh == 0) {
    return a.w - b.w;
  }
  return dh;
});*/
content.resolutions.sort((a, b) => {
  const pxs = a.w * a.h - b.w * b.h;
  if (pxs == 0) {
    return a.h - b.h;
  }
  return pxs;
});
const jsonified = JSON.stringify(content, null, 2);
fs.writeFileSync(file, jsonified);
//console.log(content.resolutions.map(x=>x.w/x.h));
