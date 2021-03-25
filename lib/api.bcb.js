const axios = require('axios')

const getURL = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getQuoteApi = (url) => axios.get(url)
const extractQuote = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}


const getQuote = ({ getToday, getURL, getQuoteApi, extractQuote }) => async () => {
    try {
        const today = getToday()
        const url = getURL(today)
        const res = await getQuoteApi(url)
        const quote = extractQuote(res)
        return quote
    } catch (err) {
        return ''
    }
}

module.exports = {
    getQuoteApi,
    extractQuote,
    //injeta as dependências
    getQuote: getQuote({ getToday, getURL, getQuoteApi, extractQuote }),
    getToday,
    getURL,
    //função pura
    pure: {
        getQuote
    }
}