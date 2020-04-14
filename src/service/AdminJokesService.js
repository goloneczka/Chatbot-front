export default class AdminJokeService {
    constructor(jokeAdminRepository) {
        this.jokeAdminRepository = jokeAdminRepository;
    }

    getCategories() {
        return this.jokeAdminRepository.getCategories()
    }

    getJokesForCategory(name) {
        return this.jokeAdminRepository.getJokesForCategory(name)
    }

    removeJoke(id) {
        return this.jokeAdminRepository.removeJoke(id)
    }

    validateEditJoke(joke) {
        let errors = []

        if(joke.content.length === 0) 
            errors.push(this.$t('adminJokes.validateJokeContentEmpty'))
            
        return errors
    }

    modifyJoke(joke) {
        return this.jokeAdminRepository.editJoke(joke)
    }
}