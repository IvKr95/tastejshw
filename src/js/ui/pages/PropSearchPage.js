class PropSearchPage {
    constructor(element) {
        if (element === undefined) {
            console.log('Element Not Passed')
        } else {
            this.element = element;
        }
    }

    registerEvents() {
        this.element.addEventListener("click", (event) => {
            const trg = event.target;

            if (trg.classList.contains("fav-btn")) {
                this.getFavorites();
            }
        })
    }

    unregisterEvents() {
        this.element.removeEventListener("click");
    }

    update() {

    }

    render() {
        const html = `<header>
                        <h1>PropertyCross</h1>
                        <div>
                            <button class="fav-btn btn">Faves</button>
                        </div>
                    </header>
                    <main class="main">
                        <section class="upper-part">
                            <div class="container">
                                <p class="description">
                                    Use the form below to search for houses to buy. 
                                    You can search by place-name, postcode, 
                                    or click 'My location', to search in your current location!
                                </p>
                            </div>
                            <div class="container">
                                <form class="search-form">
                                    <input class="search-form__field" type="search" name="search-field">
                                    <button class="search-form__go go-btn" type="submit">Go</button>
                                    <button class="search-form__location loc-btn" type="submit">My location</button>
                                </form>
                            </div>
                        </section>
                        <section class="lower-part">
                            <h2 class="lower-part__text"></h2>
                            <div class="lower-part__box">
                            </div>
                        </section>
                    </main>`;

        this.element.insertAdjacentHTML("afterbegin", html);
    }

    getFavorites() {}
}