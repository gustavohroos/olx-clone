import { PageContainer } from "../../components/MainComponents";
import { Fake, PageArea } from "./styled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OlxAPI from "../../helpers/OlxAPI";


const PageAd = () => {

    const api = OlxAPI();
    type Props = {
        id: string
    }

    const  { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState([])

    useEffect(()=>{
        const getAdInfo = async (id:string) => {
            const json = await api.getAd(id, true);
            setAdInfo(json)
            setLoading(false)
        }
        getAdInfo(id)
    }, []);



    return (
        <PageContainer>
            <PageArea>
                

                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300}/>}
                            {!loading &&
                                <img src={adInfo.images} alt="" />
                                
                                }
                        </div>

                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20}/>}
                                {!loading &&
                                <h1>{adInfo.title}</h1>
                                
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100}/>}
                                {!loading &&
                                <h1>{adInfo.description}</h1>
                                
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="rightSide">

                    <div className="box box--padding">
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

