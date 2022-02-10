import React, { useState, useRef, LegacyRef, useEffect } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { useNavigate } from 'react-router-dom';

import { PageArea } from './styled';
import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents";
import OlxAPI from '../../helpers/OlxAPI';

const AddAd = () => {

    type CategoryType = {
        name: string,
        _id: string
    }

    const navigate = useNavigate();

    const api = OlxAPI();

    const fileField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [categories, setCategories] = useState([]);

    const [title, setTitle] =  useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    async function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors: string[] = [];

        if(!title.trim()){
            errors.push('Sem título');
        }
        if(!category){
            errors.push('Sem categoria');
        }

        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable? 'true' : 'false');
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current.files!.length > 0){
                for(let i = 0; i < fileField.current.files!.length; i++){
                    fData.append('img', fileField.current.files![i]);
                }
            }

            const json = await api.addAd(fData);

            if(!json.error){
                navigate(`/ad/${json.id}`);
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join('\n'));
        }
        
        setDisabled(false);
        
    }

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return(
        <PageContainer>
            <PageTitle>Postar novo anúncio</PageTitle>
            <PageArea>
                {error &&
                <>
                    <ErrorMessage>{error}</ErrorMessage>
                </>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input
                            type="text"
                            disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                            disabled={disabled}
                            onChange={e=>setCategory(e.target.value)}
                            required
                            >
                                <option></option>
                                {categories && categories.map((item: CategoryType) => 
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                                mask= {priceMask}
                                placeholder='R$ '
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço é negociável?</div>
                        <div className="area--input ">
                            <input
                            className="check"
                            type="checkbox" 
                            disabled={disabled}
                            checked={priceNegotiable}
                            onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição do anúncio</div>
                        <div className="area--input">
                            <textarea 
                            disabled={disabled}
                            value={desc}
                            onChange={e=>setDesc(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                            <input
                                type='file'
                                disabled={disabled}
                                multiple
                                ref={fileField}
                            />
                        </div>
                    </label>
                    
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Publicar anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default AddAd;