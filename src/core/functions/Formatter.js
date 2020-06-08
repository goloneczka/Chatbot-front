import moment from "moment";


export default class Formatter {
    asLines(text){
        return text.split("\n");
    }

    formatDate(date){
        return moment(date).format('YYYY-MM-DD');
    }
}
