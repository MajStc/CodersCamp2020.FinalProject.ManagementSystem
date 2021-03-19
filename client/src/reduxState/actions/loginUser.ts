import axios from '../../axios/axiosMain';

import * as actionTypes from './types';

interface LoginData {
    email: string,
    password: string,
    confirmPassword: string
}

const startLogginIn = ()=>{
    return{
        type: actionTypes.LOGIN_USER
    }
}

const logginSuccess = (id: string, token: string)=>{
    return{
        type: actionTypes.LOGIN_SUCCESS,
        id: id,
        token: token
    }
}

const logginFail = (error: Error)=>{
    return{
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

const logout = ()=>{
    localStorage.clear();
    return{
        type: actionTypes.LOGOUT
    }
}

const loginUser = (data:LoginData) =>{
    return (dispatch: actionTypes.AppDispatch)=>{
        dispatch(startLogginIn());
            axios.post('/login', data)
            .then(res=>{
                dispatch(logginSuccess(res.data.id, res.data.token));
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.id);
            })
            .catch(error=>{
                dispatch(logginFail(error));
            })
    }
}

const authUser = ()=>{
    const token = localStorage.getItem('token');
    return (dispatch: actionTypes.AppDispatch)=>{
        axios.get('/users/me', {headers:{'x-auth-token': `${token}`}})
        .then(res=>{
            dispatch(logginSuccess(res.data._id, `${token}`));
        })
        .catch(error=>{
            dispatch(logout());
        })
    }
}


export {loginUser, authUser, logout};