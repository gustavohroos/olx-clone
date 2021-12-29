import { Item } from './styled'
import { Link } from 'react-router-dom'

type Props = {
    data: {
        id: string,
        image:string,
        price:number,
        priceNegotiable: boolean,
        title:string
    }
}

export default (props:Props) => {

    let price = '';

    if(props.data.priceNegotiable){
        price = `Preço negociável por volta de R$ ${props.data.price} `
    } else {
        price = `R$ ${props.data.price}`
    }
    return (
        <Item className='item'>
           <Link to={`/ad/${props.data.id}`}>
                <div>
                    <img className='itemImage' src={props.data.image} alt=''/>
                </div>
                <div className='itemName'>
                    {props.data.title.toUpperCase()}
                </div>
                <div className='itemPrice'>
                    {price}
                </div>
           </Link>
        </Item>
    )
}