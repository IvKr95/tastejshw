class Form {
    constructor(element) {
        if (element === undefined) {
            console.log('Form Not Defined')
        } else {
            this.element = element;
        }

        this.registerEvents();
        this.submit = this.submit.bind(this)
    }

    registerEvents() {
        this.element.addEventListener("submit", this.submit)
    }

    unregisterEvents() {
        
    }

    clear() {

    }

    getData() {
        console.log('works')
        const formData = new FormData(this.element)
        return formData;
    }

    onSubmit() {}

    submit(event) {
        event.preventDefault();
        console.log(this.getData)
        const data = this.getData();
        // this.onSubmit(data);
    }
}