class SearchForm extends Form {
    constructor(element) {
        super(element);
    }

    onSubmit(data) {
        Entity.get(data, (result) => {
            console.log(result)
        })
    }
}