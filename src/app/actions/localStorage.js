// LOCAL STORAGE
export const saveToken = (usuario, opcaoLembrar) => {
    if(!usuario.token) return null;
    const [ token1, token2, token3 ] = usuario.token.split('.');
    localStorage.setItem("token1", token1);
    localStorage.setItem("token2", token2);
    localStorage.setItem("token3", token3);
    localStorage.setItem("opcaoLembrar", opcaoLembrar);
};

export const cleanToken = () => {
    localStorage.removeItem("token1");
    localStorage.removeItem("token2");
    localStorage.removeItem("token3");
    localStorage.removeItem("opcaoLembrar");
}

export const getToken = () => {
    const token1 = localStorage.getItem("token1");
    const token2 = localStorage.getItem("token2");
    const token3 = localStorage.getItem("token3");
    if(!token1 || !token2 || !token3) return null;
    return `${token1}.${token2}.${token3}`;
}

export const getHeaders = () => {
    return {
        "headers" : { 
            "authorization": `Ecommerce ${getToken()}` 
        }
    }
}