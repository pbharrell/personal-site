'use strict';

function SetContactAlignment() {
  // Getting the grey-half children
  let grey_children = document.getElementsByClassName("grey-half")[0].children;
  let sizes = {};
  let coords = {};
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

function ClearContactAlignment() {
  // Getting the green-half children
  let green_children = document.getElementsByClassName("green-half")[0].children;
  for (let green_child of green_children) {
    green_child.style = "";
  }
}

viewportWidth = window.innerWidth || document.documentElement.clientWidth;
console.log(viewportWidth);
if (viewportWidth >= 768) {
  SetContactAlignment();
}

$(window).resize(function() {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth >= 768) {
      SetContactAlignment();
    }
    else {
      ClearContactAlignment();
    }
});
