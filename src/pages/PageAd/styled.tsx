import styled from "styled-components";

interface FakeProps {
    height: number
}

export const Fake = styled.div<FakeProps>`
    background-color: #DDD;
    height: ${props=>props.height || 20}px;
`;

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
    }

    .box--padding {
        padding: 10px;
    }

    .name--box {
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;
        
        .box {
            display: flex;
        }

        .adImage {
            width: 320px;
            height: 320px;
            margin-right: 20px;

            .each-slide img {
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;
            }
        }

        .each-slide {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }


        .adInfo {
            flex: 1;

            small {
                    color: #6e6e6e;
                }

            .adName {
                margin-bottom: 20px;

                h2 {
                    margin: 0;
                    margin-top: 20px;
                }
                
            }
            .adDescription {
                
            }
        }
    }

    .rightSide {
        min-width: 300px;

        .price span {
            color: #0000FF;
            display: block;
            font-size: 27px;
            font-weight: bold;
        }

        .contactSellerLink {
            background-color: #0000FF;
            height: 30px;
            border-radius: 5px;
            color: #fff;
            text-decoration: none;
            box-shadow: 0px 0px 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
        }

        .createdBy small {
            display: block;
            color: #999;
            margin-top: 10px;
        }

        .createdBy {
            padding: 20px;
        }
    }
`;

export const OthersArea = styled.div`
    h2 {
        font-size: 20px;
    }

    .list {
        display: flex;

        .item {
            max-width: 25%;
            min-width: 25%;
        }
    }
`;

export const BreadCrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0px 5px;
        text-decoration: underline;
        color: #000;
    }
`;