import styled from "styled-components";

export const HeaderArea = styled.div`
    padding-left: 24px;
    background-color: #FFF;
    height: 80px;
    border-bottom: #CCC;
    
    
    .container{
        max-width: 1272px;
        margin: auto;
        display: flex;
        align-items: center;
    }

    a {
        text-decoration: none;
    }

    .logo {
        flex: 1;
        display: flex;
        align-items: center;
        width: 48px;
        height: 48px;

        .logo-1,
        .logo-2,
        .logo-3 {
            font-size: 27px;
            font-weight: bold;
        }
        .logo-1 {
            color: #6e0ad6;
        }
        .logo-2 {
            color: #8ce563;
        }
        .logo-3 {
            color: #f28000;
        }
    }

    nav{
        padding-top: 10px;
        padding-bottom: 10px;

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            display: flex;
            align-items: center;
            height: 60px;
        }
        li {
            margin-left: 20px;
            margin-right: 20px;

            a {
                color: rgb(74, 74, 74);
                line-height: 21px;
                font-size: 14px;
                font-weight: 600;

                &:hover{
                    color: #6e0ad6;
                }

                &.button{
                    width: 120px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgb(247, 131, 35);
                    color: rgb(255, 255, 255);
                    border-radius: 30px;
                    line-height: 21px;
                    font-size: 14px;
                    font-weight: 700;
                    text-align: center;
                    user-select: none;
                    border: 1px solid transparent;
                }

                &.button:hover{
                    background-color: rgb(249, 157, 83)
                }
            }
        }
    }
`;