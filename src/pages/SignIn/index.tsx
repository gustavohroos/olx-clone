import React, { useState } from "react";
import { PageArea } from './styled'
import { PageContainer, PageTitle } from "../../components/MainComponents";
import OLXApi from '../../helpers/OLXApi'
import { doLogin } from "../../helpers/authHandler";

const SignIn = () => {

    const api = OLXApi();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        setDisabled(true);

        const json = await api.login(email, password)

        if(json.error){
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword)
            window.location.href = '/';
        }
        
    }

    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                            type="email"
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
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
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar senha</div>
                        <div className="area--input">
                            <input
                            className='check'
                            type="checkbox"
                            disabled={disabled}
                            checked={rememberPassword}
                            onClick={()=>setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default SignIn;