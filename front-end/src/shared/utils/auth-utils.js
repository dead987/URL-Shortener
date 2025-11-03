// auth-utils.js
export const logout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
};