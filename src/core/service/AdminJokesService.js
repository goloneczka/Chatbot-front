export default class AdminJokeService {

    constructor(jokeAdminRepository) {
        this.jokeAdminRepository = jokeAdminRepository;
    }

    getCategories() {
        return this.jokeAdminRepository.getCategories()
    }

    addCategory(name) {
        let data = {
            "category": name
        }
        return this.jokeAdminRepository.addCategory(data)
    }

    validateCategory(category, errorContent) {
        let errors = []

        if(category.name.length === 0) 
            errors.push(errorContent.nameContent)
            
        return errors
    }

    editCategory(oldCategory, newCategory) {
        return this.jokeAdminRepository.editCategory(newCategory, oldCategory.category)
    }

    removeCategory(name){
        return this.jokeAdminRepository.removeCategory(name)
    }

    getJokesForCategory(name) {
        return this.jokeAdminRepository.getJokesForCategory(name)
    }

    addJoke(joke, category){
        return this.jokeAdminRepository.addJoke({category: category, joke: joke})
    }

    validateJoke(joke, errorContent) {
        let errors = []
        if(joke.joke.length === 0) 
            errors.push(errorContent.jokeContent)
            
        return errors
    }

    modifyJoke(joke) {
        return this.jokeAdminRepository.modifyJoke(joke)
    }

    removeJoke(id) {
        return this.jokeAdminRepository.removeJoke(id)
    }
}