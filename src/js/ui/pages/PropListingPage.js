class PropListingPage {
    constructor(element) {
        if (element === undefined) {
            console.log('Element Not Passed')
        } else {
            this.element = element;
        }

        this.handleClick = this.handleClick.bind(this)
    }

    registerEvents() {
        document.body.addEventListener('click', this.handleClick)
    }

    unregisterEvents() {
        document.body.removeEventListener('click', this.handleClick)
    }

    handleClick(event) {
        if (event.target.classList.contains('add-fav')) {
            Favorites.setNewFav(this.listing)
            this.update()
        } else if (event.target.classList.contains('delete-fav')) {
            Favorites.removeFav(this.listing.lister_url)
            this.update()
        } else if (event.target.classList.contains('main-page')) {
            this.unmount()
            App.showPage('propSearchPage')
        } else if (event.target.classList.contains('fav-btn')) {

            this.unmount()
            App.showPage('favPage')

        }
    }

    unmount() {
        this.unregisterEvents()
        this.element.innerHTML = '';
    }

    render(data = '') {
        this.listing = JSON.parse(data)

        this.renderListing()
        this.registerEvents()
    }

    renderListing() {
        const html = this.getListingHTML()
        this.element.insertAdjacentHTML("afterbegin", html)
    }

    getListingHTML() {
        const {
            price_formatted, 
            title, 
            img_width, 
            img_height, 
            img_url, 
            bedroom_number, 
            bathroom_number, 
            summary,
        } = this.listing

        const state = this.checkIfFavourite()

        return `<main class="main">
                    <h1>Property Details</h1>
                    <button class="${state ? 'delete-fav' : 'add-fav'} btn">${state ? '&#128151;' : '&#43;'}</button>
                    <h1>${price_formatted}</h1>
                    <h2>${title}</h2>
                    <img src="${img_url}" alt="${title}" width="${img_width}" height="${img_height}">
                    <span>${bedroom_number} bed</span>
                    <span>,</span>
                    <span>${!bathroom_number ? 'no' : bathroom_number} bathrooms</span>
                    <p>${summary}</p>
                </main>`;
    }

    checkIfFavourite() {
        const {lister_url} = this.listing
        return Favorites.getFav(lister_url)
    }

    update() {
        this.element.innerHTML = '';
        this.renderListing()
    }
}