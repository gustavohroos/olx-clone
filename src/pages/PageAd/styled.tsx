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

        .adImage {

        }

        .adInfo {
            padding: 10px;
            .adName {
                margin: 20px;
            }
            .adDescription {
            
            }
        }
    }

    .rightSide {
        min-width: 300px;
    }
`;