import styled from "styled-components";

export const Item = styled.div`
    a{
        display: block;
        background-color: #fff;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;

        &:hover {
            border: 1px solid #CCC;
            transition: all ease .2s;
        }

        .itemImage {
            width: 100%;
            border-radius: 5px;
        }

        .itemName {
            color: #000;
            font-weight: bold;
        }
    }

`;