define(['exports', 'N/error'], function (exports, error) {
    const ErrorType = {
        NotFound: 'not_found',
        BadRequest: 'bad_request',
        InternalServerError: 'internal_server_error',
    };
    exports.ErrorType = ErrorType;

    exports.isErrorType = (value) =>
        typeof value === 'string' && Object.values(ErrorType).includes(value);

    exports.notFoundError = ({ message }) =>
        error.create({
            name: ErrorType.NotFound,
            message: `Not found: ${message}`,
        });

    exports.badRequestError = ({ message }) =>
        error.create({
            name: ErrorType.BadRequest,
            message: `Bad request: ${message}`,
        });

    exports.internalServerErrorError = ({ message }) =>
        error.create({
            name: ErrorType.InternalServerError,
            message: `Internal server error: ${message}`,
        });
});
