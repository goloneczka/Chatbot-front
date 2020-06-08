
export function setMessage(author, text, style, resolve) {
    const basicMessage = {
        author: author,
        style: style,
        resolve: resolve
    };
    let message;
    if (style === 'default')
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