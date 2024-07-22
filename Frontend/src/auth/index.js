// is Logged in=>

export const isLoggedIn=()=>{
    return localStorage.getItem('data')!==null;
}

// doLogin=>data=>set to localStorage

export const doLogin=(data,next)=>{
    localStorage.setItem('data',JSON.stringify(data));
    next();
}

// doLogout=> removve from localStorage

export const doLogout=(next)=>{
    localStorage.removeItem('data');
    next();
}

// get current user

export const getCurrentUser=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem('data'))?.user;
    }
    else{
        return undefined;
    }
}

 // is Admin=>