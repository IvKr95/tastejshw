class CurrentListings {
    static setCurrentListings(listings) {
        if (this.getCurrentListings()) {
            this.updateCurrentListings(listings)
        } else {
            localStorage.setItem(this.CURRENT_LISTINGS, JSON.stringify(listings))
        }
    }

    static removeCurrentListings() {
        localStorage.removeItem(this.CURRENT_LISTINGS)
    }

    static updateCurrentListings(newListings) {
        const cl = this.getCurrentListings()
        const extended = [...cl, ...newListings]
        localStorage.setItem(this.CURRENT_LISTINGS, JSON.stringify(extended))
    }

    static getCurrentListings() {
        return JSON.parse(localStorage.getItem(this.CURRENT_LISTINGS))
    }
}

CurrentListings.CURRENT_LISTINGS = 'current_listings';