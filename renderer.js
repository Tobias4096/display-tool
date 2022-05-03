function id(id) {
  return document.getElementById(id);
}
const presets = window.electron.presets;

/*[ "res", "rr" ].forEach(i => {
  [ "preset", "custom" ].forEach(j => {
    [ 1, 2 ].forEach(k => {
      id(`${i}-${j}${k}`).onmousedown = () => {
        id(`${i}-${j}1`).querySelector(`input[name = ${i}-radio]`).checked = true;
      };
    });
  });
});*/

//get inputs


function getData() {
  const resIndex = id("res-preset-select").selectedIndex;
  const rrIndex = id("rr-preset-select").selectedIndex;
  var res, rr;
  if (resIndex == 1) { //dropdown Custom
    res = {
      "w": parseInt(id("res-w-input").value),
      "h": parseInt(id("res-h-input").value)
    };
  } else {
    res = presets.resolutions[resIndex - 2];
  }

  if (rrIndex == 1) { //dropdown Custom
    rr = parseFloat(id("rr-input").value);
  } else {
    rr = presets.refreshrates[resIndex - 2];
  }

  const cs = parseFloat(presets.colorspaces[id("cs-preset-select").selectedIndex - 1].multiplier);
  const cd = parseInt(presets.colordepths[id("cd-preset-select").selectedIndex - 1].value);

  return {
    res,
    rr,
    cs,
    cd
  };
}

//calculate
function calculate(resolution, refreshRate, colorSpaceMultiplier, colorDepth) {
  const bppx = round(colorSpaceMultiplier * colorDepth * 3) // round because of floating point math sh t
}


//on button press
id("calculate").onclick = () => {

};

id("cs-preset-select").onchange = id("cd-preset-select").onchange = () => {
  const data = getData();
  if (3*data.cd * (3*data.cs - 1) / 2 % 3) {//everything *3 because of floating point math sh t
    id("cs-warning").innerText = `Warning: color space ${id("cs-preset-select").value} and color depth ${id("cd-preset-select").value} are not compatible.`;
  } else {
    id("cs-warning").innerText = "\u00A0";
  }
};
