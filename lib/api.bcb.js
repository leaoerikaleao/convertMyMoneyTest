const axios = require('axios')

const url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2703-02-2021%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao'

const getQuoteApi = (data) => axios.get(url)
const extractQuote = res => res.data.value[0].cotacaoVenda
const getQuote = async() => {
    const res = await getQuoteApi('')
    const quote = extractQuote(res)
    return quote
}

module.exports = {
    
    getQuoteApi,
    extractQuote,
    getQuote,
}