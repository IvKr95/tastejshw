class Entity {
    static get(data, callback = () => {}) {
        createRequest({
            url: this.HOST + this.URL,
            params: {
                ...this.configParams,
                ...data
            },
            method: 'GET',
            callback(result, error) {
                if (error) {
                    callback(null, error)
                } else {
                    const appResCode = Number(result.response.application_response_code)

                    if (appResCode === 100 || appResCode === 101 || appResCode === 110) {
                        //the query returned a list of properties
                        if (result.response.listings.length >= 1) {

                            callback({
                                ambiguous: false,
                                data: result.response,
                            }, null)

                            RecentSearches.setNewSearch({
                                name: result.request.location,
                                props: result.response.total_results,
                            })

                        } else {
                            callback(null, 'Zero properties returned')
                        }     
                    } else if (appResCode === 200 || appResCode === 202) {
                        //The search term was ambiguous. In this case Nestoria returns a list of suggested locations. 
                        callback({
                            ambiguous: true,
                            locations: result.response.locations
                        }, null);

                    } else {
                        // any other response is considered an error
                        callback(null, 'error')
                    }
                }
            }
        })
    }
}

Entity.HOST = "https://api.nestoria.co.uk";
Entity.URL = "/api";
Entity.configParams = {
    "pretty": 1,
    "action": "search_listings",
    "encoding": "json",
};