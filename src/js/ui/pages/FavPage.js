class FavPage {
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

    unregisterEvents() {

    }

    handleClick(event) {
        if (event.target.classList.contains('listing')) {
            this.unmount()
            App.showPage('propListingPage', event.target.dataset.about)
        }
    }

    render() {
        this.renderMainLayout()
        this.renderListings(Favorites.getFavs())
        this.registerEvents()
    }

    update() {
        this.render()
    }

    unmount() {
        this.unregisterEvents()
        this.element.innerHTML = '';
    }

    renderMainLayout() {
        const html = `<header>
                            <h1>Favourites</h1>
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
        const html = this.getListingsHTML(listings)
        this.element.querySelector('.main').append(html)
    }

    getListingsHTML(listings) {
        let ul = document.createElement('ul')
        ul.classList.add('listings')

        listings.forEach(listing => {
            const html = this.getListingHTML(listing)
            ul.appendChild(html)
        })

        return ul;
    }
}