class SearchForm extends Form {
    constructor(element) {
        super(element)
    }

    update(input) {
        console.log(input)
        this.element.querySelector('.search-form__field').textContent = input
    }

    onSubmit(data) {
        Entity.get(data, (result, error) => {
            this.element.reset()

            if (result && error === null) {
                if (!result.ambiguous) {
                    App.getPage('propSearchPage').clear()
                    App.showPage('searchResultsPage', result.data)
                } else if (result.ambiguous) {
                    App
                    .getPage('propSearchPage')
                    .update(result)
                }
            } else {
                App
                .getPage('propSearchPage')
                .showError(error)
            }
        })
    }
}