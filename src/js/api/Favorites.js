class Favorites {
    static setNewFav(item) {
        if (!this.getFavs()) {
            const favorites = [item]
            localStorage.setItem(this.FAVORITES, JSON.stringify(favorites))
        } else {
            const favorites = this.getFavs()
            const favs = favorites.filter(rs => rs.lister_url !== item.lister_url)
            favs.unshift(item)
            localStorage.setItem(this.FAVORITES, JSON.stringify(favs))
        } 
    }

    static removeFav(key) {
        localStorage.removeItem(key)
    }

    static getFavs() {
        return JSON.parse(localStorage.getItem(this.FAVORITES))
    }

    static emptyFavs() {
        localStorage.clear()
    }
}

Favorites.FAVORITES = 'favorites';