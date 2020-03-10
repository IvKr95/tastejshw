class PropSearchPage {
    constructor(element) {
        if (element === undefined) {
            console.log('Element Not Passed')
        } else {
            this.element = element;
        }
    }

    registerEvents() {
        this.element.addEventListener("click", (event) => {
            const trg = event.target;

            if (trg.classList.contains("fav-btn")) {
                this.getFavorites();
            }
        })
    }

    unregisterEvents() {
        this.element.removeEventListener("click");
    }

    update() {

    }

    render() {
        this.renderMainLayout();
        this.renderRecentSearches();
        this.renderTitle('Recent searches');
    }

    renderMainLayout() {
        const html = `<header>
                            <h1>PropertyCross</h1>
                            <div>
                                <button class="fav-btn btn">Faves</button>
                            </div>
                        </header>
                        <main class="main">
                            <section class="upper-part">
                                <div class="container">
                                    <p class="description">
                                        Use the form below to search for houses to buy. 
                                        You can search by place-name, postcode, 
                                        or click 'My location', to search in your current location!
                                    </p>
                                </div>
                                <div class="container">
                                    <form class="search-form">
                                        <input class="search-form__field" type="search" name="place_name">
                                        <button class="search-form__go go-btn" type="submit">Go</button>
                                        <button class="search-form__location loc-btn" type="submit">My location</button>
                                    </form>
                                </div>
                            </section>
                            <section class="lower-part">
                                <h2 class="lower-part__title"></h2>
                                <div class="lower-part__searches">
                                </div>
                            </section>
                        </main>`;

        this.element.insertAdjacentHTML("afterbegin", html);
    }

    renderRecentSearches() {
        const searches = this.element.querySelector(".lower-part__searches");
        searches.innerHTML = this.getRecentSearches();
    }

    getRecentSearches() {
        const data = {
            search1: {
                name: 'search1',
                number: 10,
                url: ""
            },
            search2: {
                name: 'search2',
                number: 2,
                url: ""
            },
            search3: {
                name: 'search3',
                number: 20,
                url: ""
            },
            search4: {
                name: 'search4',
                number: 100,
                url: ""
            },
        }

        let rcs = "";
        
        rcs += "<ul>";
        for (const rc in data) {
            rcs += this.getRecentSearch(data[rc]);
        }
        rcs += "</ul>";

        return rcs;
    }

    getRecentSearch(item) {
        return `<li class="search-item">
                    <a href="${item.url}">
                        <span class="search__name">${item.name}</span>
                        <span class="search__number">${item.number}</span>
                    </a>
                </li>`;
    }

    renderTitle(name) {
        this.element.querySelector('.lower-part__title').textContent = name;
    }
}