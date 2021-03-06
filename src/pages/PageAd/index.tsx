import { BreadCrumb, Fake, OthersArea, PageArea } from "./styled";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import OlxAPI from "../../helpers/OlxAPI";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/AdItem";

type AdItemProps = {
    id: string,
    image:string,
    price:number,
    priceNegotiable: boolean,
    title:string
}

const PageAd = () => {

    const api = OlxAPI();
    type AdProps = {
        category: {
            id: string,
            name: string,
            slug: string
        },
        dateCreated: string,
        description: string,
        id: string,
        images: [string],
        others: [AdItemProps],
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

    const  { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState<AdProps>({} as AdProps)

    useEffect(()=>{
        const getAdInfo = async (id: string) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id as string)
    }, [id]);

    function formatDate(date: string) {
        let cDate = new Date(date);

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();


        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }


    return (
        <PageContainer>
            {adInfo.category &&
                <BreadCrumb>
                Você está aqui:
                <Link to='/'>Home</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                /
                {` ${adInfo.title}`}
            </BreadCrumb>
            }
            
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300}/>}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) => (
                                        <div className="each-slide" key={k}>
                                            <img src={img} alt=''/>
                                        </div>
                                    ))}
                                </Slide> 
                            }
                        </div>

                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20}/>}
                                {adInfo.title &&
                                <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100}/>}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="rightSide">

                    <div className="box box--padding">
                        {loading && <Fake height={20}/>}
                        {adInfo.priceNegotiable &&
                            "Preço negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>
                    {loading && <Fake height={40}/>}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className="contactSellerLink">Fale com o vendedor</a>
                            <div className="createdBy box box--padding">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>Email: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>
        </PageArea>
        <OthersArea>
            {adInfo.others &&
                        <>
                        {adInfo.others.length > 0 &&
                            <>
                            <h2>Outras ofertas do vendedor</h2>
                            <div className="list" onClick={()=>{}}>
                                {adInfo.others
                                .filter((r: AdItemProps) => (r.image !== 'http://alunos.b7web.com.br:501/media/default.jpg') && (r.title !== 'Robson Careca'))
                                .slice(-4)
                                .map((i, k)=> (
                                    <AdItem key={k} data={i} />
                                ))}
                            </div>
                            </>
                        }
                            
                        </>
            }
        </OthersArea>
        
        </PageContainer>
    )
    

}

export default PageAd;

