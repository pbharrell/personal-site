let header = document.getElementById("header_line");
// header.getBoundingClientRect()
console.log(header.getBoundingClientRect());

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

// Getting the grey-half children
let grey_children = document.getElementsByClassName("grey-half")[0].children;
let bounding_rects = {};
let coords = {}
for (grey_child of grey_children) {
  bounding_rects[grey_child.localName] = grey_child.getBoundingClientRect();
  coords[grey_child.localName] = GetScreenCordinates(grey_child);
  // grey_child.style.position = "absolute"
}
console.log(coords);

// Getting the green-half children
let green_children = document.getElementsByClassName("green-half")[0].children;
for (green_child of green_children) {
  console.log(green_child);
  if (green_child.localName == "h1") {
    // console.log(screen.width - bounding_rects["h1"].top);
    // green_child.offsetLeft = screen.width - bounding_rects["h2"];
    green_child.style.position = "absolute";
    // green_child.style.right = String(bounding_rects["h1"].right)+"px";
    // console.log($("grey-half").first().position().left);
    green_child.style.top = String(180 + bounding_rects["h2"].top)+"px";
    console.log(green_child.style.top);
  }
  else if (green_child.localName == "h2") {
    
  }
  // offsets[green_child.localName] = green_child.offsetLeft;
}


</script>
