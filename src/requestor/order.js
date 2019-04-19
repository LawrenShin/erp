const list = () => {
    return new Promise( (res) => {
        setTimeout( () => {
            res([{
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    style_name: 'Susanna',
                    color: 'Black',
                    gender_age: 'Baby 0-2, Маленький, Большой, Детский',
                    size_range: 'S-XL',
                    category: 'Accsessories, Jewellery, PU, Textile, Denim, Heavy Knit, Jersey, Lengerie, Outwear, Shoes, Socks, Sport, Swimwear, Woven',
                    price: '2 500 667',
                    currency: 'USD',
                    comparable_price: '2 500 667',
                    qnty: 12345,
                    total_order_amount: '4 000',                
                    responsible_manager: 'Jessiaca Sipson',
                    status: 'CLOSED'
                },
                {
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    style_name: 'Susanna',
                    color: 'Black',
                    gender_age: 'Baby 0-2, Маленький, Большой, Детский',
                    size_range: 'S-XL',
                    category: 'Accsessories, Jewellery, PU, Textile, Denim, Heavy Knit, Jersey, Lengerie, Outwear, Shoes, Socks, Sport, Swimwear, Woven',
                    price: '2 500 667',
                    currency: 'USD',
                    comparable_price: '2 500 667',
                    qnty: 12345,
                    total_order_amount: '4 000',                
                    responsible_manager: 'Jessiaca Sipson',
                    status: 'OPEN'
                },
                {                
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    style_name: 'Susanna',
                    color: 'Black',
                    gender_age: 'Baby 0-2, Маленький, Большой, Детский',
                    size_range: 'S-XL',
                    category: 'Accsessories, Jewellery, PU, Textile, Denim, Heavy Knit, Jersey, Lengerie, Outwear, Shoes, Socks, Sport, Swimwear, Woven',
                    price: '2 500 667',
                    currency: 'USD',
                    comparable_price: '2 500 667',
                    qnty: 12345,
                    total_order_amount: '4 000',                
                    responsible_manager: 'Jessiaca Sipson',
                    status: 'CANCELED'
                },
                {                
                    year: 2018,
                    season: 'SS',
                    theme: 'Theme1',
                    brand: 'Independent',
                    style_name: 'Susanna',
                    color: 'Black',
                    gender_age: 'Baby 0-2, Маленький, Большой, Детский',
                    size_range: 'S-XL',
                    category: 'Accsessories, Jewellery, PU, Textile, Denim, Heavy Knit, Jersey, Lengerie, Outwear, Shoes, Socks, Sport, Swimwear, Woven',
                    price: '2 500 667',
                    currency: 'USD',
                    comparable_price: '2 500 667',
                    qnty: 12345,
                    total_order_amount: '4 000',                
                    responsible_manager: 'Jessiaca Sipson',
                    status: 'IN TRANSIT'
                }])
        }, 700);
    })
}

export default {
    list
}