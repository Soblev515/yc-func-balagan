import {RequestParamsType} from './model';

export const createDbQuery = ({limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    $limit = ${limit};
    $offset = ${offset};

    SELECT * FROM tag
    ORDER BY name ASC
    LIMIT $limit
    OFFSET $offset;
`;

export const countDbQuery = () => `
    DECLARE $limit AS Uint32;
    SELECT Count(name) FROM tag 
`;