class App {
    static init() {
        this.content = document.querySelector(".app")
        this.initPages()
        this.showPage('propSearchPage')
        this.initForms()
    }

    static initForms() {
        this.forms = {
            searchForm: new SearchForm(document.querySelector('.search-form')),
        }
    }

    static initPages() {
        this.pages = {
            propSearchPage: new PropSearchPage(this.content),
            searchResultsPage: new SearchResultsPage(this.content),
            propListingPage: new PropListingPage(this.content),
            favPage: new FavPage(this.content),
        }
    }

    static getPage(pageName) {
        return this.pages[pageName]
    }

    static getForm(formName) {
        return this.forms[formName]
    }

    static showPage(pageName, data = {}) {
        const page = this.getPage(pageName)
        page.render(data)
        this.setCurrentPage(pageName)
    }

    static setCurrentPage(name) {
        this.currentPage = name
    }

    static update() {
        this.updatePages()
        this.updateForms()
    }

    static updatePages() {
        for (const page in this.pages) {
            this.pages[page].update()
        }
    }

    static updateForms() {
        this.getForm('searchForm').update()
    }
}