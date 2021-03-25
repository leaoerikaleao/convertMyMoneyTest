const api = require('./api.bcb')
const axios = require('axios')

// "esconder" o axios quando for chamado, uma versão diferente é executada
jest.mock('axios')

test('getQuoteAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.49 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getQuoteApi('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('extractQuote', () => {
    const quote = api.extractQuote({
        data: {
            value: [
                { cotacaoVenda: 5.49 }
            ]
        }
    })
    expect(quote).toBe(5.49)
})

// agrupar vários testes 
//fixar a data e devolver a data real depois do teste 
describe('getToday', () => {
    // cópia da data
    const RealDate = Date

    //fixar a data que eu quero 
    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                //sobrescreve a data original
                return new RealDate(date)
            }
        }
    }
    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2021-03-21T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('3-21-2021')
    })
})

test('getURL', () => {
    const url = api.getURL('data')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27data%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getQuote', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.49 }
            ]
        }
    }

    const getToday = jest.fn()
    getToday.mockReturnValue('3-21-2021')

    const getURL = jest.fn()
    getURL.mockReturnValue('url')

    const getQuoteApi = jest.fn()
    getQuoteApi.mockResolvedValue(res)

    const extractQuote = jest.fn()
    extractQuote.mockReturnValue('5.49')

    api.pure
        .getQuote({ getToday, getURL, getQuoteApi, extractQuote })()
        .then(res => {
            expect(res).toBe(5.49)
        })
})