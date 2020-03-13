class Form {
    constructor(element) {
        if (element === undefined) {
            console.log('Form Not Defined')
        } else {
            this.element = element
        }

        this.submit = this.submit.bind(this)
        this.registerEvents()
    }

    registerEvents() {
        this.element.addEventListener("submit", this.submit)
    }

    unregisterEvents() {
        this.element.removeEventListener("submit", this.submit)
    }

    getData() {
        const formData = new FormData(this.element)
        let formObj = {}

        for (const pair of formData.entries()) {
            formObj[pair[0]] = pair[1]
        };
        
        return formObj;
    }

    onSubmit() {}

    submit(event) {
        event.preventDefault()

        const data = this.getData()
        this.onSubmit(data)
    }
}