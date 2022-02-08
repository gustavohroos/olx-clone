import styled from "styled-components";

export const PageArea = styled.div`
   form {
       background-color: #FFF;
       border-radius: 3px;
       padding: 10px;
       box-shadow: 0px 0px 3px #999;

       .area {
           display: flex;
           align-items: center;
           padding: 10px;
           max-width: 500px;
       }

       .area--title {
           width:200px;
           text-align: right;
           padding-right: 20px;
           font-weight: bold;
           font-size: 14px;
       }

       .area--input {
            flex: 1;

            input, select, textarea {
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #DDD;
                border-radius: 3px;
                outline: 0;
                transition: all ease .4s;

                &:focus {
                border: 1px solid #333;
                }
                &.check {
                    width: 13px;
                    float: left;
                    margin-left: 0;
                }
            }

            textarea {
                height: 150px;
                resize: none;
            }
        
            button{
                width: 120px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgb(247, 131, 35);
                color: rgb(255, 255, 255);
                border-radius: 5px;
                line-height: 21px;
                font-size: 14px;
                font-weight: 700;
                text-align: center;
                user-select: none;
                border: 1px solid transparent;
                cursor: pointer;

                &:hover{
                    background-color: rgb(249, 157, 83)
                }
            }
            
            
       }
   } 
`;