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
        skills: "#",
        experience: "#",
        portfolio: "#",
        contact: "#"
      };
    }

    // Updating the current page links with what they should be per page
    updatePageLinks(pageName) {
        // Setting links if the current page is home
        if (pageName === "home") {
            this.links["home"] = "index.html";
            this.links["skills"] = "../html/skills.html";
            this.links["experience"] = "../html/experience.html";
            this.links["portfolio"] = "../html/portfolio.html";
            this.links["contact"] = "../html/contact.html";
        }
        // Setting links if the current page is not home
        else {
            this.links["home"] = "../src/index.html";
            this.links["skills"] = "skills.html";
            this.links["experience"] = "experience.html";
            this.links["portfolio"] = "portfolio.html";
            this.links["contact"] = "contact.html";
        }

        // The beginning of the html, starting with the links and page_wrapper container
        this.innerHTML = `
        <!--Nav links-->
        <div id="page_wrapper">
            <nav>
                <div class="container">
                    <ul>
                        <li><a href="${this.links["home"]}">Home</a></li>
                        <li><a href="${this.links["skills"]}">Skills</a></li>
                        <li><a href="${this.links["experience"]}">Experience</a></li>
                        <li><a href="${this.links["portfolio"]}">Portfolio</a></li>
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
        <!--Line-->
        <div id="header_line">
            <nav>
                <div class="container">
                    <ul>
                        <li><div class="home"></div></li>
                        <li><div class="skills"></div></li>
                        <li><div class="experience"></div></li>
                        <li><div class="portfolio"></div></li>
                        <li><div class="contact"></div></li>
                    </ul>  
                </div>
            </nav>
        </div>
        `;
        // Currently searching for the line where we underline the current page
        let hl_search_string = `<li><div class="${pageName}`;
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
        let hamburger_menu_html = "";
        `
        <!--Mobile menu-->
        <div id="mobile-menu-box">
            <div class="container">
                <ul id="mobile-menu">
                    <li><a href="${this.links["home"]}">Home</a></li>
                    <li><a href="${this.links["skills"]}">Skills</a></li>
                    <li><a href="${this.links["experience"]}">Experience</a></li>
                    <li><a href="${this.links["portfolio"]}">Portfolio</a></li>
                    <li><a href="${this.links["contact"]}">Contact</a></li>
                </ul>
            </div>
        </div>
        `;

        // Currently searching for the line where we highlight the current page in yellow
        let links_search_string = `<li><a href="${this.links[pageName]}"`;
        let add_links_class_pos = hamburger_menu_html.search(links_search_string) + links_search_string.length;

        // We print out an error if it was not found
        if (add_links_class_pos == -1) {
            console.log("ERROR! Invalid page class name searched for in updateHamburgerMenu().");
        }

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
            <div id="skills_spacer_line" class="title_text"></div>
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
        else if (pageName === "skills") {
            title_line = `
            <div id="skills_name_line" class="title_text">
                <p>Preston Harrell</p>
            </div>
            <div id="skills_sub_line" class="subheader_text">
                <p>Backend software engineer</p>
            </div>
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
        <div id="title_profile_container" class="container">
            <div id="title_profile_wrapper">
                <div id="hamburger-icon-wrapper" onclick="toggleMobileMenu()">
                    <div id="hamburger-icon">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                </div>
                <!--Page title-->
                <div id="title_wrapper">
                    ${title_line}
                </div>
                <!--Profile pic-->
                <div id="profile_box_wrapper">
                    <div id="profile_container">
                        <img src="../Assets/Profile_pic_crop.webp" alt="Profile">
                    </div>
                </div>
            </div>
        </div>
        <div id="mobile-menu-box">
            <div class="container">
                <ul id="mobile-menu">
                    <li><a href="${this.links["home"]}">Home</a></li>
                    <li><a href="${this.links["skills"]}">Skills</a></li>
                    <li><a href="${this.links["experience"]}">Experience</a></li>
                    <li><a href="${this.links["portfolio"]}">Portfolio</a></li>
                    <li><a href="${this.links["contact"]}">Contact</a></li>
                </ul>
            </div>
        </div>
        `;

        // Currently searching for the line where we highlight the current page in yellow
        let links_search_string = `<li><a href="${this.links[pageName]}"`;
        let add_links_class_pos = header_trailer.search(links_search_string) + links_search_string.length;

        // We print out an error if it was not found
        if (add_links_class_pos == -1) {
            console.log("ERROR! Invalid page class name searched for in updateHamburgerMenu().");
        }

        // Slicing in the curr_page class into the html
        header_trailer = [header_trailer.slice(0, add_links_class_pos), ` class="curr_page"`, header_trailer.slice(add_links_class_pos)].join("");
        

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
customElements.define('header-component', Header);

const mobileMenuBox = document.getElementById('mobile-menu-box');
const hamburgerIcon = document.getElementById('hamburger-icon-wrapper')

function toggleMobileMenu() {
    hamburgerIcon.classList.toggle('open');
    mobileMenuBox.classList.toggle('open');
}

let viewportWidth = 0;
$(window).resize(function() {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth >= 768) {
        if (hamburgerIcon.classList.contains("open")) {
            hamburgerIcon.classList.remove("open");
        }
        if (mobileMenuBox.classList.contains("open")) {
            mobileMenuBox.classList.remove("open");
        }
    }
});

