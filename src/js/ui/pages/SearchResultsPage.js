class SearchResultsPage {
    constructor(element) {
        if (element === undefined) {
            console.log('Element Not Passed')
        } else {
            this.element = element;
        }

        this.unmount = this.unmount.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    registerEvents() {
        this.element.addEventListener('click', this.handleClick)
    }

    handleClick(event) {
        if (event.target.classList.contains('listing')) {
            this.unmount()
            App.showPage('propListingPage', event.target.dataset.about)
        } else if (event.target.classList.contains('main-page')) {
            this.unmount()
            App.showPage('propSearchPage')
        }
    }

    unregisterEvents() {
        this.element.removeEventListener('click', this.handleClick)
    }

    render(data = {}) {
        this.renderMainLayout()
        this.renderTitle(data.listings.length, data.total_results)
        this.renderListings(data.listings)

        if (data.total_results > data.listings.length) {
            this.renderLoadMoreBtn()
        }
        this.registerEvents();
    }

    unmount() {
        this.element.innerHTML = '';
        this.unregisterEvents()
    }

    update(data = []) {
        this.render(data);
    }

    renderMainLayout() {
        const html = `<header>
                            <h1 class="main-page">PropertyCross</h1>
                            <h2 class="title"></h2>
                        </header>
                        <main class="main">
                        </main>`;

        this.element.insertAdjacentHTML("afterbegin", html);
    }

    getListingHTML(listing) {
        const li = document.createElement('li')
        li.classList.add('listing')
        li.dataset.about = JSON.stringify(listing)

        li.innerHTML = `<img class="listing__thumb" src="${listing.thumb_url}" alt="${listing.title}" width="${listing.thumb_width}" height="${listing.thumb_height}">
                        <span class="listing__price">
                            ${listing.price_formatted}
                        </span>
                        <span class="listing__title">
                            ${listing.title}
                        </span>`;
        return li;
    }

    renderListings(listings) {
        this.element.querySelector('.main').append(this.getListingsHTML(listings))
    }

    getListingsHTML(listings) {
        let ul = document.createElement('ul')
        ul.classList.add('listings')

        listings.forEach(listing => {
            ul.appendChild(this.getListingHTML(listing))
        })

        return ul;
    }

    renderTitle(part, total) {
        //The page title should indicate be of the form "x of y matches"
        this.element.querySelector('.title').textContent = this.formatTitle(part, total)
    }

    formatTitle(x, y) {
        return `${x} of ${y} matches`;
    }

    renderLoadMoreBtn() {
        const html = this.getLoadMoreBtnHTML()
        this.element.querySelector('.main').insertAdjacentHTML('beforeend', html)
    }

    getLoadMoreBtnHTML() {
        return `<button class="load-more-btn">Load more</button>
                <p>Results for #search_term#, showing x of y properties</p>`;
    }
}