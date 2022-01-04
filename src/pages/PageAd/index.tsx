import { PageContainer } from "../../components/MainComponents";
import { PageArea } from "./styled";
import { useParams } from "react-router-dom";
import { useState } from "react";

const PageAd = () => {


    const { id } = useParams();

    const [loading, setLoading] = useState(true)

    alert('ID'+id)

    return (
        <PageContainer>
            <PageArea>
                Algo
            </PageArea>
        </PageContainer>
    )

}

export default PageAd;

