import React, { useEffect, useState } from "react";
import { PageArea } from './styled'
import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents";
import OlxAPI from '../../helpers/OlxAPI'
import { doLogin } from "../../helpers/authHandler";

const SignIn = () => {

    const api = OlxAPI();


    const [name, setName] = useState('')
    const [stateLoc, setStateLoc] = useState('')
    const [stateList, setStateList] = useState([]) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword){
            setError('As senhas não são iguais');
            setDisabled(false);
            return;
        }

        const json = await api.register(
            name,
            email,
            password,
            stateLoc
        );

        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = '/'
        }

        setDisabled(false);
    }

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, [])

    type State = {
        _id: number,
        name: string
    }

    return(
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                <>
                    <ErrorMessage>{error}</ErrorMessage>
                </>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome</div>
                        <div className="area--input">
                            <input
                            type="text"
                            disabled={disabled}
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select 
                            required
                            disabled={disabled}
                            value={stateLoc}
                            onChange={e=>{setStateLoc(e.target.value)}}
                            >
                            <option></option>
                            {stateList.map((i:State,k)=>
                            <option key={k} value={i._id}>{i.name}</option>
                            )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                            type="email"
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input
                            type="password" 
                            disabled={disabled}
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Confirmar senha</div>
                        <div className="area--input">
                            <input
                            type="password"
                            disabled={disabled}
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default SignIn;