class RecentSearches {

    static setNewSearch(item) {
        if (!this.getRecentSearches()) {
            const recentSearches = [item]
            localStorage.setItem(this.RECENT_SEARCHES, JSON.stringify(recentSearches))
        } else {
            const recentSearches = this.getRecentSearches()
            const rs = recentSearches.filter(rs => rs.name !== item.name)
            rs.unshift(item)
            localStorage.setItem(this.RECENT_SEARCHES, JSON.stringify(rs))
        } 
    }

    static removeSearch(key) {
        localStorage.removeItem(key)
    }

    static getRecentSearches() {
        return JSON.parse(localStorage.getItem(this.RECENT_SEARCHES))
    }

    static emptyRecentSearches() {
        localStorage.clear()
    }
}

RecentSearches.RECENT_SEARCHES = 'recentSearches';