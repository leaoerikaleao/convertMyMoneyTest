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
    // sobrescreve o axios.get
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
