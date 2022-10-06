import axios from "axios";

const URL = "http://localhost:8080/api/"







const CustomAxios = axios.create({
    baseURL:URL,
});

CustomAxios.interceptors.request.use(
    req=>{
        req.headers['Authorization'] = "Bearer "+localStorage.getItem('token');
        return req;},
    err=>{return Promise.reject(err);}
);
CustomAxios.interceptors.response.use(
    res=>{return res;},
    err=>{
        const originalReq = err.config;
        const status = err.response ? err.response.status:null;
        if(status ===401)
        {
            return axios.post(URL+'user/refresh',
            {
                userName:localStorage.getItem('user'),
                refreshToken:localStorage.getItem('refreshToken')
            }
            ).then(response=>{
                localStorage.setItem('refreshToken',response.data.refreshToken);
                localStorage.setItem('token',response.data.accessToken);
                console.log("Tokens changed");
                return CustomAxios(originalReq);
            })
            .catch(err=>{  
                console.log(err);
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('persist:main-root');
                window.location.replace('/')
            }
             
            );
        }
        return Promise.reject(err);}
);

export default CustomAxios;