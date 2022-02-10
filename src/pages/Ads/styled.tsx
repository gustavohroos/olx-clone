import styled from "styled-components";

export const PageArea = styled.div`
    
    display: flex;
    margin: 20px 0;

    .leftSide {
        width: 250px;
        margin-right: 10px;
        height: 100%;
        background-color: #6e0ad6;
        padding: 20px;
        border-radius: 10px;
        color: #FFF;
        box-shadow: 0px 0px 3px #999;

        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }

        input, select {
            width: 100%;
            height: 40px;
            border: 2px solid #9BB83C;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: #000;
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .categoryItem {
            display: flex;
            align-items: center;
            margin: 3px;
            margin-left: 0px;
            padding: 10px 10px 10px 0px;
            border-radius: 5px;
            cursor: pointer;

            img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }

            span {
                font-size: 14px;
            }
        }
        .categoryItem:hover,
        .categoryItem.active {
            background-color: #9BB83C;
            color: #6e0ad6;
        }
    }

    .rightSide {
        flex: 1;
        
        .list {
        display: flex;
        flex-wrap: wrap;

        .item {
            width: 25%;
        }

    }
    }
`;
