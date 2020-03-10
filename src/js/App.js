class App {
    static init() {
        this.content = document.querySelector(".app")
        this.initPages()
        this.showPage('propSearchPage')
        this.initForms()
    }

    static initForms() {
        console.log(document.querySelector('.search-form'))
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
        return this.pages[pageName];
    }

    static getForm(formName) {
        return this.forms[formName];
    }

    static showPage(pageName) {
        const page = this.getPage(pageName);
        page.render();
    }
}