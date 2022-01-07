import Cookies from "js-cookie";
import qs from 'qs'

let BASEAPI = 'http://alunos.b7web.com.br:501'

type BodyPost = {
    name?: string,
    password?: string,
    email?: string,
    token?: string,
    state?: string
}

type BodyGet = {
    password?: string,
    email?: string,
    token?: string,
    sort?: string,
    limit?: number,
    id?: string,
    other?: boolean
}

const initialState = {
    password: '',
    email: '',
    token:''
}

const apiFetchPost = async (endpoint:string, body:BodyPost) => {

    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin'
        return;
    }

    return json;
}

const apiFetchGet = async (endpoint:string, body:BodyGet = initialState) => {

    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin'
        return;
    }

    return json;
}

const OlxAPI =  {

    login: async (email:string, password:string) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },

    register: async (
        name:string,
        email:string,
        password:string,
        state:string
        ) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state}
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet("/states");
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet("/categories");
        return json.categories;
    },

    getAds: async (options:BodyGet) => {
        const json = await apiFetchGet("/ad/list",
        options
        );
        return json;
    },

    getAd: async (id:string, otherAds = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other:otherAds}
        )
        return json;
    }
}

export default ()=>OlxAPI;