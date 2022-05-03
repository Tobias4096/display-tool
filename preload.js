const { contextBridge, ipcRenderer } = require('electron')

const exec = require('child_process').exec;
const fs = require("fs");

const filePresets = "presets.json";
const presets = JSON.parse(fs.readFileSync(filePresets).toString());

contextBridge.exposeInMainWorld(
  'electron',
  {
    presets
  }
)

function id(id) {
  return document.getElementById(id);
}

function gcd(a, b) {
  return (!b) ? a : gcd(b, a%b);
}

/*function cmd(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}*/

//const xrandr = cmd("xrandr");



window.addEventListener('DOMContentLoaded', async () => {
/*  const xrandrOut = await xrandr;
  const xrandrLines = xrandrOut.split("\n");
  const currentMode = xrandrOut.split("primary")[1].split("*")[0].split("\n")[1].split(/ +/g);
  const w = currentMode[1].split("x")[0];
  const h = currentMode[1].split("x")[1];
  const rr = currentMode[currentMode.length-1];
  id("res-w-input").value = w;
  id("res-h-input").value = h;
  id("rr-input").value = rr;*/
  id("res-w-input").value = screen.width
  id("res-h-input").value = screen.height

  const resPresetSelect = id("res-preset-select");
  presets.resolutions.forEach(res => {
    const option = document.createElement("option");
    option.innerText = `${res.w}x${res.h}` + (res.name ? ` (${res.name})` : ``);
    option.title = (res.name ? `${res.name} - ` : ``) + `resolution: ${res.w}x${res.h}, aspect ratio: ${res.w / gcd(res.w, res.h)}:${res.h / gcd(res.w, res.h)}`
    resPresetSelect.appendChild(option);
  });

  const rrPresetSelect = id("rr-preset-select");
  presets.refreshrates.forEach(rr => {
    const option = document.createElement("option");
    option.innerText = `${rr} Hz`;
    rrPresetSelect.appendChild(option);
  });

  const cdPresetSelect = id("cd-preset-select");
  presets.colordepths.forEach(cd => {
    const option = document.createElement("option");
    option.innerText = `${cd.value} bpc`;
    if (cd.selected) {
      option.selected = true;
    }
    cdPresetSelect.appendChild(option);
  });

  const csPresetSelect = id("cs-preset-select");
  presets.colorspaces.forEach(cs => {
    const option = document.createElement("option");
    option.innerText = cs.name;
    if (cs.selected) {
      option.selected = true;
    }
    csPresetSelect.appendChild(option);
  });

})
