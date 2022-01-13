import { PageContainer } from "../../components/MainComponents";
import { Fake, PageArea } from "./styled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OlxAPI from "../../helpers/OlxAPI";

const PageAd = () => {

    const api = OlxAPI();
    type AdProps = {
        category?: {
            id: string,
            name: string,
            slug: string
        },
        dateCreated?: string,
        description?: string,
        id?: string,
        images?: string[],
        price?: number,
        priceNegotiable?: boolean,
        stateName?: string,
        title?: string,
        userInfo?: {
            name: string,
            email: string
        },
        views?: number
    }

    const  { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState<AdProps>({})

    useEffect(()=>{
        const getAdInfo = async (id:any) => {
            const json = await api.getAd(id, true);
            setAdInfo(json)
            setLoading(false)
        }
        getAdInfo(id)
    }, []);

    function formatDate(date:string) {
        let cDate = new Date(date);

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();


        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }


    return (
        <PageContainer>
            <PageArea>
                

                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300}/>}
                            {!loading &&
                                <img src={adInfo.images[0]} alt="" />
                                
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

                    <div className="box box--padding name--box">
                        {loading && <Fake height={20}/>}
                        {!loading &&
                                <div>
                                    nome: {adInfo.userInfo.name}
                                    email: {adInfo.userInfo.email}
                                </div>
                                
                                }
                    </div>
                    <div className="box box--padding">
                        {loading && <Fake height={40}/>}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    )
    

}

export default PageAd;

