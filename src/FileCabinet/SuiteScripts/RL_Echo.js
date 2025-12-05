/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define([], function () {
    const getHandler = (params) => ({
        status: 'success',
        data: {
            params,
        },
    });

    const postHandler = (body) => ({
        status: 'success',
        data: {
            body,
        },
    });

    const putHandler = (body) => ({
        status: 'success',
        data: {
            body,
        },
    });

    const deleteHandler = (params) => ({
        status: 'success',
        data: {
            params,
        },
    });

    return {
        get: getHandler,
        post: postHandler,
        put: putHandler,
        delete: deleteHandler,
    };
});
