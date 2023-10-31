'use strict';

function GetScreenCordinates(obj) {
  var p = {};
  p.x = obj.offsetLeft;
  p.y = obj.offsetTop;
  while (obj.offsetParent) {
    p.x = p.x + obj.offsetParent.offsetLeft;
    p.y = p.y + obj.offsetParent.offsetTop;
    if (obj == document.getElementsByTagName("body")[0]) {
      break;
    }
    else {
      obj = obj.offsetParent;
    }
  }
  return p;
}

function GetSize(obj) {
  var p = {};
  var obj_style = getComputedStyle(obj);

  p.paddingLeft = parseFloat(obj_style.paddingLeft);
  p.paddingRight = parseFloat(obj_style.paddingRight);
  p.paddingTop = parseFloat(obj_style.paddingTop);
  p.paddingBottom = parseFloat(obj_style.paddingBottom);

  p.borderLeft = parseFloat(obj_style.borderLeft);
  p.borderRight = parseFloat(obj_style.borderRight);
  p.borderTop = parseFloat(obj_style.borderTop);
  p.borderBottom = parseFloat(obj_style.borderBottom);

  p.height = obj.offsetHeight - (p.paddingTop + p.paddingBottom) - (p.borderTop + p.borderBottom);
  p.width = obj.offsetWidth - (p.paddingLeft + p.paddingRight) - (p.borderLeft + p.borderRight);
  return p;
}

function MiddleVertAlign(y, h1, h2) {
  return y + ((h1 - h2) / 2);
}

function SetContactAlignment() {
  // Getting the grey-half children
  let grey_children = document.getElementsByClassName("grey-half")[0].children;
  let sizes = {};
  let coords = {}
  for (let grey_child of grey_children) {
    // bounding_rects[grey_child.localName] = grey_child.getBoundingClientRect();
    coords[grey_child.localName] = GetScreenCordinates(grey_child);
    sizes[grey_child.localName] = GetSize(grey_child);
    // grey_child.style.position = "absolute"
  }

  // Getting the green-half children
  let green_children = document.getElementsByClassName("green-half")[0].children;
  for (let green_child of green_children) {
    green_child.style.position = "absolute";
    if (green_child.localName == "h1") {
      let x = String(coords["h2"]["x"]);
      let y = String(MiddleVertAlign(coords["h2"]["y"], sizes["h2"]["height"], GetSize(green_child)["height"]));
      green_child.style.right = x +"px";
      green_child.style.top = y +"px";
    }
    else if (green_child.localName == "h2") {
      let x = String(coords["h1"]["x"]);
      let y = String(MiddleVertAlign(coords["h1"]["y"], sizes["h1"]["height"], GetSize(green_child)["height"]));
      green_child.style.right = x +"px";
      green_child.style.top = y +"px";
    }
  }
}

SetContactAlignment();

$(window).resize(function() {
  SetContactAlignment();
});
