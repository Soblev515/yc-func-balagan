
export const getDbQuery = (user_id) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";
    
    Select t.* from \`tag\` as t
    Left Join \`user_tags\` as ut
    on t.tag_id = ut.tag_id
    Where user_id = $user_id
`;

export const idDbQuery = (login, password) => `
    DECLARE $login AS String;
    DECLARE $password AS String;

    $login = "${login}";
    $password = "${password}";

    SELECT user_id FROM auth 
    WHERE login = $login 
    AND password = $password
`;
;