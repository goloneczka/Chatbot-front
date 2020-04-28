export default class JokesService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getAllCategories() {
        return this.httpRequest.get("jokes/categories").then((data) => {
            const categories = [];
            data.forEach(category => categories.push(category.category));
            return categories;
        });
    }

    getRandomJoke() {
        return this.httpRequest.get("jokes/random").then(data => data);
    }

    rateJoke(mark, jokeId) {
        return this.httpRequest.post("jokes/rate", {jokeId: jokeId, mark: mark}).then(data => data);
    }

    createJoke(joke, category) {
        return this.httpRequest.post("jokes", {joke: joke, category: category}).then(data => data);
    }

    getJokeForCategory(category) {
        return this.httpRequest.get(`jokes/random/${category}`).then(data => data);
    }

    getAvgRate(jokeId){
        return this.httpRequest.get(`jokes/rate/${jokeId}`).then(data => data);
    }
}
