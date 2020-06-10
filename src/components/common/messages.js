
const DEFAULT = "default";
export function setMessage(author, text, style = DEFAULT, resolve) {
    const basicMessage = {
        author: author,
        style: style,
        resolve: resolve
    };
    let message;
    if (style === DEFAULT)
        message = {
            ...basicMessage,
            text: text
        }
    else {
        message = {
            ...basicMessage,
            data: text
        }
    }
    return message;
}