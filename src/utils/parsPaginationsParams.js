function parsNumber(value, defaultValue) {
    if (typeof value === 'undefined') {
        return defaultValue;
    }

    const parsedValue = parseInt(value);

    if (Number.isNaN(parsedValue) === true) {
        return defaultValue;
    }

    return parsedValue;
 }

export function parsPaginationsParams(query) {
    const { page, perPage } = query;

    const parsedPage = parsNumber(page, 1);
    const parsedPerPage = parsNumber(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage
    };
}

