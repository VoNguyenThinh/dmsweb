import jwt_decode from "jwt-decode";
export const Role = () => {
    const curentUser = jwt_decode(localStorage.getItem('access_token'))
    let role = curentUser.is_admin ? 'admin' : 'user';
    return role
}