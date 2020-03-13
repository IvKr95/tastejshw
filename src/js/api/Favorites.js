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

    static removeFav(url) {
        const favs = this.getFavs()
        const newFavs = favs.filter(fav => fav.lister_url !== url)
        this.updateFavs(newFavs)
    }

    static updateFavs(newFavs) {
        localStorage.setItem(this.FAVORITES, JSON.stringify(newFavs))
    }

    static getFavs() {
        return JSON.parse(localStorage.getItem(this.FAVORITES))
    }

    static getFav(url) {
        const favs = this.getFavs()
        let result = false;

        for (const fav of favs) {
            if (fav.lister_url === url) {
                result = true;
                break;
            }
        }

        return result;
    }

    static emptyFavs() {
        localStorage.clear()
    }
}

Favorites.FAVORITES = 'favorites';