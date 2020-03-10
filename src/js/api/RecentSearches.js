class RecentSearches {

    static setNewSearch(item) {
        localStorage.setItem(item.key, item.value)
    }

    static removeSearch(key) {
        localStorage.removeItem(key)
    }

    static getRecentSearches(key) {
        localStorage.getItem(key)
    }

    static emptyRecentSearches() {
        localStorage.clear()
    }
}