import moment from "moment";


export default class Formatter {
    asLines(text){
        return text.split("\n");
    }

    formatDate(data){
        return moment(data).format('YYYY-MM-DD');
    }
}
