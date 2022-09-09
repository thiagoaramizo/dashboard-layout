import { useMemo, useState } from "react"
import styled from "styled-components"

const CalculadoraEstatistica = () => {

    const [paginaAnalise, setPaginaAnalise] = useState(false)
    const [textInput, setTextInput] = useState('')
    const [valores, setValores] = useState<number[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextInput(e.target.value)
    }

    const handleAnaliseValores = () => {
        setValores(textInput.split(' ').map(i => Number(i)))
        setPaginaAnalise( !paginaAnalise )
    }

    const ordenar = () => {
        setValores(valores => valores.sort((a, b) => a - b))
        setTextInput(valores.join(' '))
    }

    const maior = ( numeros: number[] ) => {
        return Math.max( ...numeros )
    }

    const menor = ( numeros: number[] ) => {
        return Math.min( ...numeros )
    }

    const intervalo = ( numeros: number[] ) => {
        return maior(numeros) - menor(numeros)
    }

    const soma = (numeros: number[]) => {
        let somatorio = 0;
        numeros.forEach( numero => somatorio = somatorio + numero )
        return somatorio
    }

    const media = ( numeros: number[] ) => {
        return soma(numeros)/numeros.length
    }

    const frequencia = ( numeros: number[] ) => {
        const numerosUnicos = [ ... new Set(numeros)]
        let resultado: number[] = []
        numerosUnicos.forEach( n1 => {
            let contador = 0
            numeros.forEach( n2 => {
                contador = (n1 === n2) ? contador+1 : contador
            })
            resultado.push( contador )
        })
        const retorno = new Map()
        numerosUnicos.map( (value, i) => retorno.set( value, resultado[i]) )
        return retorno
    }

    const moda = ( numeros: number[] ) => {
        const mapaDeFrequencia = frequencia( numeros )
        let retorno: number[] = []
        const maiorFreq = Math.max( ... mapaDeFrequencia.values() )
        mapaDeFrequencia.forEach( (value, key) => {
            if ( value >= maiorFreq ) { retorno.push(key) }
        })
        return ( retorno.length === mapaDeFrequencia.size )? [] : retorno
    }

    const mediana = ( numeros: number[] ) => {
        const valoresOrdenados = numeros.sort( (a,b) => a-b )
        const metade = Math.floor(valoresOrdenados.length / 2)
        if( valoresOrdenados.length % 2 === 0 ){
            return (valoresOrdenados[metade-1] + valoresOrdenados[metade])/2
        } else {
            return valoresOrdenados[metade - 1]
        }
    }

    const tratarModa = ( resultado: number[] ) => {
        if( resultado.length === 0 ) {
            return 'A amostra é amodal.'
        }
        if (resultado.length === 1) {
            return `A moda é ${resultado[0]}.`
        }
        return `A amostra é plurimodal, com as modas ${ resultado.join(', ').
        replace(/(.*), (.*)/, '$1 e $2') }.`
    }
    
    const tratarFloat = ( n: number ) => {
        return ( n !== Math.floor(n) ) ? n.toFixed(2).replace( '.', ',') : n
    }

    return (
        <CalculadoraWrapper>

            {paginaAnalise ? '' : (
                <>
                    <TextArea value={textInput} onChange={e => handleChange(e)}></TextArea>
                    <Button onClick={e => handleAnaliseValores()}>Analisar Valores</Button>
                </>
            )}

            {paginaAnalise ? (
                <>
                    <Button onClick={e => handleAnaliseValores()}>Alterar Valores</Button>
                    <Button onClick={e => ordenar()}>Ordenar</Button>
                    <ValoresWrapper>
                        {valores.map((valor, index) => {
                            return (
                                <div key={index}>
                                    {valor}
                                </div>
                            )
                        })}
                    </ValoresWrapper>
                    <p>Análise:</p>
                    <p>A amostra tem o tamanho de {valores.length}.</p>
                    <p>A media dos valores é de { tratarFloat(media(valores))}.</p>
                    <p>{ tratarModa( moda(valores) ) }</p>
                    <p>A mediana da amostra é { tratarFloat(mediana(valores)) }.</p>
                    <p>O maior valor da amostra é {maior(valores)}, 
                    já o menor valor é {menor(valores)}, portanto, 
                    o intervalor de valores da amostra é de {intervalo(valores)}</p>
                </>
            ) : ''}
        </CalculadoraWrapper>
    )
}

const CalculadoraWrapper = styled.section`
    width: 500px;
    margin: 20px auto;
`

const TextArea = styled.textarea`
    width: 100%;
    min-height: 50px;
`

const ValoresWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    gap: 20px;
    padding-top: 20px;

    & div {
        display: block;
        border: 1px solid var(--primary-light);
        padding: 20px;
        border-radius: 5px;
    }
`

const Button = styled.button`
    
`

export default CalculadoraEstatistica