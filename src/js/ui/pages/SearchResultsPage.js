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
        document.body.addEventListener('click', this.handleClick)
    }

    handleClick(event) {
        if (event.target.classList.contains('listing')) {
            this.unmount()
            App.showPage('propListingPage', event.target.dataset.about)
        } else if (event.target.classList.contains('main-page')) {
            this.unmount()
            App.showPage('propSearchPage')
        } else if (event.target.classList.contains('fav-btn')) {
            this.unmount()
            App.showPage('favPage')
        } else if (event.target.classList.contains('load-more')) {
            Entity.get({"place_name": this.location, page: this.page + 1}, (result, error) => {
                this.updateListings(result.data, CurrentListings.getCurrentListings())
            })
        } 
    }

    unregisterEvents() {
        document.body.removeEventListener('click', this.handleClick)
    }

    render(data = {}) {
        this.page = data.page;
        this.location = data.locations[0].place_name;

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
        CurrentListings.removeCurrentListings()
    }

    update(data = []) {
        this.element.innerHTML = '';
        this.render(data)
    }

    updateListings(data, listings) {
        this.element.innerHTML = '';
        this.renderTitle(listings.length, data.total_results)
        this.renderListings(listings)

        if (data.total_results > listings.length) {
            this.renderLoadMoreBtn()
        }
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
        this.element.append(this.getListingsHTML(listings))
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
        this.element.insertAdjacentHTML(
            'afterbegin', 
            `<h2>${this.formatTitle(part, total)}</h2>`
        )
    }

    formatTitle(x, y) {
        return `${x} of ${y} matches`;
    }

    renderLoadMoreBtn() {
        const html = this.getLoadMoreBtnHTML()
        this.element.insertAdjacentHTML('beforeend', html)
    }

    getLoadMoreBtnHTML() {
        return `<button class="load-more">Load more</button>
                <p>Results for #search_term#, showing x of y properties</p>`;
    }
}