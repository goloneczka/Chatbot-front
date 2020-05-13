import {httpRequest} from '../../App'
export default {
    getCategories() {
        return httpRequest.get('admin/jokes/categories')
    },
    addCategory(data) {
        return httpRequest.post('admin/jokes/categories', data)
    },
    editCategory(data, oldCategoryName) {
        return httpRequest.put('admin/jokes/categories/'+ oldCategoryName, data)
    },
    removeCategory(id) {
        return httpRequest.delete('admin/jokes/categories/'+id)
    },
    getJokesForCategory(name) {
        return httpRequest.get('admin/jokes/categories/' + name)
    },
    removeJoke(id) {
        return httpRequest.delete('admin/jokes/'+id)
    },
    modifyJoke(data) {
        return httpRequest.put('admin/jokes', data)
    },
    addJoke(data) {
        return httpRequest.post('admin/jokes', data)
    },
    getUnconfirmedJokes() {
        return httpRequest.get('admin/jokes/unconfirmed');
    },
    confirmJoke(id) {
        return httpRequest.put('admin/jokes/confirm/' + id);
    }
}
