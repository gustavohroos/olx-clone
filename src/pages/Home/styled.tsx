import styled from "styled-components";

export const PageArea = styled.div`
    h2 {
        font-size: 20px;

    }
    .list {
        display: flex;
        flex-wrap: wrap;

        .item {
            width: 25%;
        }

    }

    .seeAllLink {
        color: #000;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin-top: 10px;

        &:hover {
            color: #6e0ad6;
        }
    }
`;

export const SearchArea = styled.div`
    background-color: #6e0ad6;
    border-bottom: #CCC;
    padding: 20px 0;

    .toTop{
        padding: 10px;
        padding-top: 14px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        position: fixed;
        right: 20px;
        bottom: 20px;
        background-color: #6e0ad6;
        z-index: 999;
        cursor: pointer;
        text-align: center;

        img {
            width: 30px;
        }
    }
    


    .searchBox {
        
        padding: 20px 15px;
        border-radius: 5px;
        display: flex;
    }

    form {
        flex: 1;
        display: flex;

        input, select {
            height: 50px;
            border: 0;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: #000;
            margin-right: 20px;
        }

        input {
            flex: 1;
            padding: 0 10px;
        }

        select {
            width: 100px;
        }

        button {
            background-color: #49AEEF;
            font-size: 15px;
            border: 0;
            border-radius: 5px;
            color: #FFF;
            height: 50px;
            padding: 0 20px;
            cursor: pointer;
        }
    }

    .categoriesList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        .categoryItem {
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FFF;
            text-decoration:none;
            height: 50px;
            margin-bottom: 10px;

            img {
                width: 45px;
                height: 45px;
                margin-bottom: 10px;
            }
        }
    }
`;