import React, { useEffect, useState } from "react";
import { PageArea, SearchArea } from './styled'
import {  PageContainer } from "../../components/MainComponents";
import OlxAPI from '../../helpers/OlxAPI'
import { Link } from "react-router-dom";
import AdItem from "../../components/AdItem";


const SignIn = () => {

    const api = OlxAPI();

    const [stateList, setStateList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [recentAds, setRecentAds] = useState([])
    const [toTopButton, setToTopButton] = useState(false)

    useEffect(()=>{
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, [])

    useEffect(()=>{
        const getCategories = async () => {
            const cList = await api.getCategories();
            setCategoriesList(cList);
        }
        getCategories();
    }, [])

    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 28
            });
            setRecentAds(json.ads);
        }
        getRecentAds();
    }, [])

    useEffect(()=>{
        const checkScroll = () => {
            if (window.scrollY == 0) {
                setToTopButton(false);
            } else if (window.scrollY > 0) {
                setToTopButton(true);
            }
        }
        checkScroll();
        window.addEventListener("scroll", checkScroll);
    },[])

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

    type Ad = {
        id: string,
        image:string,
        price:number,
        priceNegotiable: boolean,
        title:string
    }

    function goTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return(
        <>
            <SearchArea>
                <PageContainer>
                    {toTopButton &&
                        <div onClick={goTop} className="toTop">
                            <img src="src\media\arrowTop.png" alt="" />
                        </div>
                    }
                    
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                          <input type='text' name='q' placeholder='Estou procurando por...'/>
                          <select name='state'>
                            {stateList.map((i:State,k)=>
                            <option key={k} value={i._id}>{i.name}</option>
                            )}
                          </select> 
                          <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoriesList">
                        {categoriesList.map((i:Category,k)=>
                            <Link className="categoryItem" key={k} to={`/ads?cat=${i.slug}`}>
                                <img src={i.img} alt=''/>
                                <span>{i.name}</span>
                            
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <div className="list">
                        {recentAds.map((i:Ad,k)=>
                            <AdItem key={k} data={i}/>
                        )}
                    </div>
                    <Link to='/ads' className="seeAllLink">Ver todos</Link>
                    <hr/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit elit odio, vitae pulvinar tortor mollis a. Nunc volutpat mattis ante. Etiam cursus rutrum eleifend. Suspendisse imperdiet erat vel nisi luctus, sed posuere orci fringilla. Phasellus sit amet condimentum ex. Nam hendrerit arcu ex. In hac habitasse platea dictumst.
                </PageArea>
            </PageContainer>
        </>
    )
}

export default SignIn;