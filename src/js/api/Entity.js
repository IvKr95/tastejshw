class Entity {
    static get(data, callback = () => {}) {
        return createRequest({
            url: this.HOST + this.URL,
            params: {
                "pretty": 1,
                "action": "search_listings",
                "encoding": "json",
                "place_name": data["place_name"]
            },
            method: 'GET',
            body: null,
            callback(data) {
                const resCode = data.response.application_response_code;

                if (resCode === 100 || resCode === 101 || resCode === 110) {
                    //the query returned a list of properties
                    if (data.listings.length >= 1) {
                        callback(data)
                    } else {
                        callback("error")
                    }
                    
                } else if (resCode === 200 || resCode === 202) {
                    //The search term was ambiguous. In this case Nestoria returns a list of suggested locations. 
                    callback(data.locations);
                } else {
                    // any other response is considered an error
                    callback("error")
                }
                
            }
        })
    }

    static list() {
        return createRequest({})
    }
}

Entity.HOST = "https://api.nestoria.co.uk";
Entity.URL = "/api";