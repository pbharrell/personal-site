// Define positioning helper functions here
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

function SetSyncObjectProperty(master_obj, slave_obj, property) {
    set_value = master_obj[property];
    slave_obj[property] = set_value;
}

function MiddleVertAlign(y, h1, h2) {
    return y + ((h1 - h2) / 2);
}

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
    console.log("clicked");
}

class Header extends HTMLElement {
    // observe attributes of custom element
    static get observedAttributes() {
        return ["pageName"];
    }

    constructor() {
      super();

    // Dictionary of the link values for header line
      this.links = {
        home: "#",
        experience: "#",
        portfolio: "#",
        about: "#",
        contact: "#"
      };
    }

    // Updating the current page links with what they should be per page
    updatePageLinks(pageName) {
        // Setting links if the current page is home
        if (pageName === "home") {
            this.links["home"] = "index.html";
            this.links["experience"] = "../html/experience.html";
            this.links["portfolio"] = "../html/portfolio.html";
            this.links["about"] = "../html/about.html";
            this.links["contact"] = "../html/contact.html";
        }
        // Setting links if the current page is not home
        else {
            this.links["home"] = "../src/index.html";
            this.links["experience"] = "experience.html";
            this.links["portfolio"] = "portfolio.html";
            this.links["about"] = "about.html";
            this.links["contact"] = "contact.html";
        }

        // The beginning of the html, starting with the links and page_wrapper container
        this.innerHTML = `
        <div id="page_wrapper">
            <nav>
                <div class="container">
                    <ul>
                        <li><a href="${this.links["home"]}">Home</a></li>
                        <li><a href="${this.links["experience"]}">Experience</a></li>
                        <li><a href="${this.links["portfolio"]}">Portfolio</a></li>
                        <li><a href="${this.links["about"]}">About</a></li>
                        <li><a href="${this.links["contact"]}">Contact</a></li>
                    </ul>  
                </div>
            </nav>
        `;
    }

    // Setting the current selected page's highlighted link and underline
    setSelectedPage(pageName) {
        // Currently searching for the line where we highlight the current page in yellow
        let links_search_string = `<li><a href="${this.links[pageName]}"`;
        let add_links_class_pos = this.innerHTML.search(links_search_string) + links_search_string.length;

        // We print out an error if it was not found
        if (add_links_class_pos == -1) {
            console.log("ERROR! Invalid page class name searched for in setSelectedPage().");
        }

        // Slicing in the curr_page class into the html
        this.innerHTML = [this.innerHTML.slice(0, add_links_class_pos), ` class="curr_page"`, this.innerHTML.slice(add_links_class_pos)].join("");


        // Here we define the header line's html 
        let header_line_html =         
        `
        <!-- Line & profile pic -->
        <div id="header_line">
            <nav>
                <div class="container">
                    <ul>
                        <li><div class="home"></div></li>
                        <li><div class="experience"></div></li>
                        <li><div class="portfolio"></div></li>
                        <li><div class="about"></div></li>
                        <li><div class="contact"></div></li>
                    </ul>  
                </div>
            </nav>
        </div>
        `;
        // Currently searching for the line where we underline the current page
        let hl_search_string = `<li><div class="${pageName}`
        let add_line_class_pos = header_line_html.search(hl_search_string) + hl_search_string.length;

        // We print out an error if it was not found
        if (add_line_class_pos == -1) {
            console.log("ERROR! Invalid page class name searched for in setSelectedPage().");
        }

        // Slicing in the curr_page class into the html
        header_line_html = [header_line_html.slice(0, add_line_class_pos), " selected", header_line_html.slice(add_line_class_pos)].join("");
        this.innerHTML = [this.innerHTML, header_line_html].join("");
    }

    // Update the page hamburger menu with what it should be according to current page
    updateHamburgerMenu(pageName) {
        let hamburger_menu_html = 
        `
        <!-- <div id="mobile-menu-container" class="container">  -->
            <div id="mobile-menu-box" class="container">
                <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
            </div>
                <ul id="mobile-menu">
                        <li><a href="${this.links["home"]}">Home</a></li>
                        <li><a href="${this.links["experience"]}">Experience</a></li>
                        <li><a href="${this.links["portfolio"]}">Portfolio</a></li>
                        <li><a href="${this.links["about"]}">About</a></li>
                        <li><a href="${this.links["contact"]}">Contact</a></li>
                </ul>
            <!-- </div> -->
        <!-- </div> -->
        `;

        // Currently searching for the line where we highlight the current page in yellow
        let links_search_string = `<li><a href="${this.links[pageName]}"`;
        let add_links_class_pos = hamburger_menu_html.search(links_search_string) + links_search_string.length;

        // We print out an error if it was not found
        if (add_links_class_pos == -1) {
            console.log("ERROR! Invalid page class name searched for in updateHamburgerMenu().");
        }

        // Slicing in the curr_page class into the html
        hamburger_menu_html = [hamburger_menu_html.slice(0, add_links_class_pos), ` class="curr_page"`, hamburger_menu_html.slice(add_links_class_pos)].join("");

        // Adding appending the hamburger menu into the html
        this.innerHTML = [this.innerHTML, hamburger_menu_html].join("");
        
    }
    
    // Update the page title with what it should be according to which page we are on
    updatePageTitle(pageName) {
        // Defining the title icon
        let title_line = ""

        // Updating title line with what it should be for each page
        if (pageName === "home") {
            title_line = `
            <div id="home_name_line" class="title_text">
                <p>Preston Harrell</p>
            </div>
            <div id="home_sub_line" class="subheader_text">
                <p>Backend software engineer</p>
            </div>
            `;
        }
        else if (pageName === "experience") {
            title_line = `
            <div id="experience_line" class="title_text">
                <p>Work Experience</p>
            </div>
            `;
        }
        else if (pageName === "portfolio") {
            title_line = `
            <div id="portfolio_line" class="title_text">
                <p>Project Portfolio</p>
            </div>
            `;
        }
        else if (pageName === "about") {
            title_line = `
            <div id="about_spacer_line" class="title_text"></div>
            `;
        }
        else if (pageName === "contact") {
            title_line = `
            <div id="contact_line" class="title_text">
                <p>We'll be in touch</p>
            </div>
            `;
        }

        // Defining the header trailer here and working in the title line
        let header_trailer = 
        `
            <div class="outer container">
                ${title_line}
            </div>
        </div>
        <div class="outer_profile_box container">
            <div class="profile_container">
                <img src="../Assets/Profile_pic_crop.webp" alt="Profile">
            </div>
        </div>
        `;

        // Slicing in the trailer into the html
        this.innerHTML = [this.innerHTML, header_trailer].join("");
    }

    connectedCallback() {
        // Getting the page's name
        let pageName = this.getAttribute("pageName").toLowerCase();

        // Constructing the html required for the top line
        this.updatePageLinks(pageName);
        this.setSelectedPage(pageName);
        this.updateHamburgerMenu(pageName);
        this.updatePageTitle(pageName);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // observed props
        console.log("props", arguments);
        // get and assigns value from props "text"
        if (name === "pageName" && oldValue !== newValue) {
            connectedCallback();
        }
    }
}

function toggleMobileMenu(icon) {
    document.getElementById("mobile-menu").classList.toggle('open');

    // hamburger_icon = document.getElementById("hamburger-icon");
    // for (bar of hamburger_icon.children) {
    //     bar.classList.toggle("open");
    // }
    icon.classList.toggle('open');
}

customElements.define('header-component', Header);

const headerComponent = document.querySelector('header-component');
const container = document.getElementsByClassName('container')[0];

if (headerComponent) {

    $(window).resize(function() {
        SetSyncObjectProperty(container, headerComponent, )
    });
}

// run align function on the profile pic
SetSyncObjectProperty()

