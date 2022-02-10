import React, { Key, useEffect, useState } from "react";
import { PageArea } from './styled'
import {  PageContainer } from "../../components/MainComponents";
import OlxAPI from '../../helpers/OlxAPI'
import { useNavigate, useLocation } from "react-router-dom";
import AdItem from "../../components/AdItem";


const SignIn = () => {

    const api = OlxAPI();

    const navigate = useNavigate();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') !== null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') !== null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') !== null ? query.get('state') : '');

    const [stateList, setStateList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [ads, setAds] = useState([]);
    const [toTopButton, setToTopButton] = useState(false);

    useEffect(()=>{
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getCategories = async () => {
            const cList = await api.getCategories();
            setCategoriesList(cList);
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getAds = async () => {
            const json = await api.getAd(
                '6203bd353463c428e4e46f7c', false
                
            );
            console.log(json);
        }
        getAds();
    }, []);

    useEffect(()=>{
        const checkScroll = () => {
            if (window.scrollY === 0) {
                setToTopButton(false);
            } else if (window.scrollY > 0) {
                setToTopButton(true);
            }
        }
        checkScroll();
        window.addEventListener("scroll", checkScroll);
    },[]);

    useEffect(()=>{
        let queryString: string[] = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }
        
        navigate({
            search: `?${queryString.join('&')}`
        })
    }, [q, state, cat]);

    type State = {
        _id: number,
        name: string
    }
    type Category = {
        _id: number,
        name: string,
        img:string,
        slug:string
    }

    type AdItem = {
        id: string,
        image:string,
        price:number,
        priceNegotiable: boolean,
        title:string
    }

    type Ad = {
        category: Category,
        dateCreated: string,
        description: string,
        id: string,
        images: [string],
        others: [AdItem],
        price: number,
        priceNegotiable: boolean,
        stateName: string,
        title: string,
        userInfo: {
            name: string,
            email: string
        },
        views: number
    }

    const filter = () => {
        (r: Ad) => 
        (r.images !== null) &&
        (
            (r.title === q) &&
            (r.category.name === cat) &&
            (r.stateName === state)
        )
        
    }

    return(
        <PageContainer>
            <PageArea>
                <div className="leftSide box-shadow">
                    <form method="GET">
                        <input
                        type="text"
                        name="q"
                        placeholder="O que você procura?"
                        value={q!}
                        onChange={e=>setQ(e.target.value)}
                        />
                        <div className="filterName">Estado:</div>
                        <select
                        name="state"
                        value={state!}
                        onChange={e=>setState(e.target.value)}
                        >
                            <option></option>
                            {stateList.map((i: State, k: Key) => (
                                <option
                                key={k} 
                                value={i.name}
                                
                                >{i.name}</option>
                            ))}
                        </select>
                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categoriesList.map((i: Category, k: Key) => (
                                <li 
                                key={k} 
                                value={i._id} 
                                className={cat === i.slug ? 'categoryItem active' : 'categoryItem'}
                                onClick={()=>setCat(i.slug)}
                                >
                                    <img src={i.img} alt=''/>
                                    <span>{i.name}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <div className="list">
                        {ads
                        .filter(filter) 
                        .map((i: AdItem, k: Key) => (
                            <AdItem key={k} data={i} />
                        ))}
                    </div>
                    
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default SignIn;