
const DEFAULT = "default";
export function sendMessage(vue, author, text, style = DEFAULT) {
    return new Promise((resolve) => {
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
        vue.$emit('addMessage', message);
    });
}