export const errorHandling = ({ code, status, message }) => {
    return {
        status: code || status,
        message
    };
};
