import {httpRequest} from '../../App'
export default {
    getCategories() {
        return httpRequest.get('admin/jokes/categories')
    },
    getJokesForCategory(name) {
        return httpRequest.get('admin/jokes/categories/' + name)
    },
    removeJoke(id) {
        return httpRequest.delete('admin/jokes/'+id)
    },
    editJoke(joke) {
        return httpRequest.put('admin/jokes', joke)
    }
}