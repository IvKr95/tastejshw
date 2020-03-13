class PropSearchPage {
    constructor(element) {
        if (element === undefined) {
            console.log('Element Not Passed')
        } else {
            this.element = element;
        }

        this.handleClick = this.handleClick.bind(this);
        this.showError = this.showError.bind(this);
        this.unmount = this.unmount.bind(this);
    }

    registerEvents() {
        document.body.addEventListener('click', this.handleClick)
    }

    unregisterEvents() {
        document.body.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        const trgClasses = event.target.classList;

        if (trgClasses.contains('recent-search')) {
            const placeName = event.target.dataset.name;

            Entity.get({"place_name": placeName}, (result, error) => {
                if (result && error === null) {
                    this.unmount()
                    App.showPage('searchResultsPage', result.data)
                }
            })
        } else if (trgClasses.contains('fav-btn')) {

            this.unmount()
            App.showPage('favPage')

        } else if (trgClasses.contains('loc-btn')) {

            if (!navigator.geolocation) {
                console.log('Your browser does not support geolocation');
            } else {
                navigator.geolocation.getCurrentPosition(success, this.showError('Location not enabled'));

                function success(position) {
                    const latitude  = Number(position.coords.latitude).toFixed(6);
                    const longitude = Number(position.coords.longitude).toFixed(6);
            
                    let location = latitude + ',' + longitude;
        
                    Entity.get({"centre_point": location}, (result, error) => {
                        if (result && error === null) {
                            this.unmount()
                            App.showPage('searchResultsPage', result.data)
                        }
                    })
                }

                function error() {
                    // this.showError('Location not enabled')
                }
            }
        } else if (trgClasses.contains('location')) {
            const {name, title} = event.target.dataset;

            App.getForm('searchForm').update(title)
            Entity.get({"place_name": name}, (result, error) => {
                if (result && error === null) {
                    this.unmount()
                    App.showPage('searchResultsPage', result.data)
                }
            })
        }
    }

    update(data = {}) {
        this.render(data);
    }

    unmount() {
        this.unregisterEvents()
        this.element.innerHTML = '';
    }

    showError(error) {
        this.renderRecentSearches('');

        if (error === 'Zero properties returned') {
            this.renderTitle("There were no properties found for the given location.");
        } else if (error === 'Location not matched') {
            this.renderTitle("There were no properties found for the given location.");
        } else if (error === 'Network connection issues' || error === 'timeout') {
            this.renderTitle("An error occurred while searching. Please check your network connection and try again.");
        } else if (error === 'Location not enabled') {
            this.renderTitle("The use of location is currently disabled");
        } else if (error === 'Location not found' || error === 'timeout') {
            this.renderTitle("Unable to detect current location. Please ensure location is turned on in your phone settings and try again.");
        } else {
            this.renderTitle(error.application_response_text);
        }
    }

    render(data) {
        if (data.ambiguous) {
            const html = this.getLocationsHTML(data.locations);
            this.renderLocationsHTML(html);
            this.renderTitle("Please select a location below:");
        } else {
            this.renderMainLayout();
            const html = this.getRecentSearchesHTML();
            this.renderRecentSearches(html);
            this.renderTitle('Recent searches');
        }
        this.registerEvents();
    }

    getLocationsHTML(data) {
        let locs = "";
        
        locs += "<ul>";
        for (const loc of data) {
            locs += this.getLocationHTML(loc);
        }
        locs += "</ul>";

        return locs;
    }

    getLocationHTML(item) {
        return `<li class="location" data-name="${item.place_name}" data-title="${item.title}">
                    <span class="location__name">${item.title}</span>
                </li>`;
    }

    renderLocationsHTML(html) {
        const locations = this.element.querySelector(".lower-part__box");
        locations.innerHTML = html;
    }

    renderMainLayout() {
        const html = `<section class="upper-part">
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
                            </form>
                            <button class="loc-btn" type="submit">My location</button>
                        </div>
                    </section>
                    <section class="lower-part">
                        <h2 class="lower-part__title"></h2>
                        <div class="lower-part__box">
                        </div>
                    </section>`;

        this.element.insertAdjacentHTML("afterbegin", html);
    }

    renderRecentSearches(html) {
        const searches = this.element.querySelector(".lower-part__box");
        searches.innerHTML = html;
    }

    getRecentSearchesHTML() {
        const searches = RecentSearches.getRecentSearches();
        let rs = "";
        
        rs += "<ul>";
        for (const s of searches) {
            rs += this.getRecentSearchHTML(s);
        }
        rs += "</ul>";

        return rs;
    }

    getRecentSearchHTML(item) {
        return `<li class="recent-search" data-name="${item.name}">
                    <span class="recent-search__name">${item.name}</span>
                    <span class="recent-search__number">${item.props}</span>
                </li>`;
    }

    renderTitle(name) {
        this.element.querySelector('.lower-part__title').textContent = name;
    }
}