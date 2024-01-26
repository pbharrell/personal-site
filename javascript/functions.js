// Define positioning helper functions here
function GetScreenCordinates(obj) {
    let p = {};
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
    let p = {};
    let obj_style = getComputedStyle(obj);
  
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

const Position = {
    Left: Symbol("left"),
    Right: Symbol("right"),
    Top: Symbol("top"),
    Bottom: Symbol("bottom")
}

function SyncObjectProperty(master_obj, slave_obj, position) {
    let property, value;
    let master_position = GetScreenCordinates(master_obj);
    let master_size = GetSize(master_obj);
    let slave_size = GetSize(slave_obj);

    switch(position) {
        case Position.Left:
            // If left, use just the x value
            property = "left";
            value = master_position.x + master_size.paddingLeft;
            break;
        case Position.Right:
            // If right, use the x value + width
            property = "left";
            value = (master_position.x + master_size.width + master_size.paddingRight) -
                    (slave_size.width + slave_size.borderRight);
            break;
        case Position.Top:
            // If top, use just the y value
            property = "top";
            value = master_position.y + master_size.paddingTop;
            break;
        case Position.Bottom:
            // If bottom, use the y value + height + padding
            property = "top";
            value =  (master_position.y + master_size.height + master_size.paddingBottom) -
                     (slave_size.height + slave_size.borderLeft);
            break;
        default:
            console.log(
                "Invalid position value supplied to '"
                + arguments.callee.toString() + "'"
                );
            return;
    }
    slave_obj.style[property] = value+"px";
}

function SetProfilePosition() {
    let width = parseFloat(getComputedStyle(main).width);
    if (width < 768) {
        // if mobile layout, right align the profile pic
        SyncObjectProperty(container, profilePicture, Position.Right);
    }
    else {
        // if desktop layout, left align the profile pic
        SyncObjectProperty(container, profilePicture, Position.Left);
    }
}

function MiddleVertAlign(y, h1, h2) {
    return y + ((h1 - h2) / 2);
}
