import {RequestParamsType} from './model';

export const createDbQuery = (user_id, {limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $user_id AS String;
    DECLARE $name AS String;

    $user_id = "${user_id || ''}";
    $limit = ${limit};
    $offset = ${offset};

    SELECT DISTINCT c.* FROM \`community\` as c
    Left Join \`user_community\` as uc
    ON c.community_id = uc.community_id
    Where
        IF ($user_id = "", true, user_id = $user_id)
    ORDER BY name ASC
    LIMIT $limit
    OFFSET $offset;
`


export const idDbQuery = (login, password) => `
    DECLARE $login AS String;
    DECLARE $password AS String;

    $login = "${login}";
    $password = "${password}";

    SELECT user_id FROM auth 
    WHERE login = $login 
    AND password = $password
`;
export const organizerDbQuery = (user_id) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT * FROM users 
    WHERE user_id = $user_id
`;
export const countDbQuery = () => `
    DECLARE $user_id AS String;
    SELECT Count(community_id) FROM community
`;

export const usersDbQuery = (community_id) => `
    DECLARE $community_id AS String;

    $community_id = "${community_id}";

    SELECT u.* FROM \`users\` as u 
    Left Join \`user_community\` as uc
    On u.user_id = uc.user_id
    WHERE community_id = $community_id;
`;

export const tagsDbQuery = (community_id) => `
    DECLARE $community_id AS String;

    $community_id = "${community_id}";

    SELECT t.* FROM \`tag\` as t 
    Left Join \`community_tag\` as ct
    On t.tag_id = ct.tag_id
    WHERE community_id = $community_id;
`;