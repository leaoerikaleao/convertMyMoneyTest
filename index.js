const express = require('express')
const app = express()

const path = require('path')
const convert = require('./lib/convert')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cotacao', (req, res) => {
    const { quote, amount } = req.query

    if (quote && amount) {
        const conversion = convert.convert(quote, amount)
        res.render('quote', {
            error: false,
            quote: convert.toMoney(quote),
            amount: convert.toMoney(amount),
            conversion: convert.toMoney(conversion)
        })
    } else {
        res.render('quote', {
            error: 'Valores Inválidos'
        })
    }

})


app.listen(3000, err => {
    if (err) {
        console.log('Não foi possivel iniciar...')
    } else {
        console.log('ConvertMyMoney está online...')
    }
})