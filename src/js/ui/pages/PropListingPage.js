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
        this.element.addEventListener('click', this.handleClick)
    }

    unregisterEvents() {
        this.element.removeEventListener('click', this.handleClick)
    }

    handleClick(event) {
        if (event.target.classList.contains('add-fav')) {
            Favorites.setNewFav(this.listing)
        }
    }

    unmount() {
        this.unregisterEvents()
        this.element.innerHTML = '';
    }

    render(data = '') {
        this.listing = JSON.parse(data)

        const {
            price_formatted, 
            title, 
            img_width, 
            img_height, 
            img_url, 
            bedroom_number, 
            bathroom_number, 
            summary
        } = this.listing

        const html = `<header>
                            <h1>Property Details</h1>
                            <button class="add-fav btn">+</button>
                        </header>
                        <main class="main">
                            <h1>${price_formatted}</h1>
                            <h2>${title}</h2>
                            <img src="${img_url}" alt="${title}" width="${img_width}" height="${img_height}">
                            <span>${bedroom_number} bed</span>
                            <span>,</span>
                            <span>${!bathroom_number ? 'no' : bathroom_number} bathrooms</span>
                            <p>${summary}</p>
                        </main>`;

        this.element.insertAdjacentHTML("afterbegin", html)
        this.registerEvents()
    }

    update(data = []) {
        this.render(data)
    }

    renderTitle() {
    }
}