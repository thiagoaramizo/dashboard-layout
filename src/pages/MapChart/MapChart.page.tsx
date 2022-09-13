import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import styled from "styled-components"
import topoJson from './data/mundo.json'
import topoJsonBrasil from './data/br-states.json'
import AppTitle from "../../components/AppTitle/AppTitle"
import axios from "axios"
import { useEffect, useState } from "react"


interface clienteMarkType {
    uf: string,
    cidade: string,
    quantidade: string,
    latitude: string,
    longitude: string
}


const MapChart = () => {

    const api = axios.create({
        baseURL: "https://klsn.digital/api/v1",
    });

    const [clientesMarker, setClientesMarker] = useState<clienteMarkType[]>([])

    useEffect(() => {
        api
            .get('/clientesporcidade')
            .then((response) => {
                setClientesMarker(response.data)
            })
            .catch((err) => console.log('ocorreu um erro'))
    }, [])



    const getCoord = (cmk: clienteMarkType) => {
        return [Number(cmk.longitude), Number(cmk.latitude)]
    }

    return (
        <>
            <AppTitle>Gráfico de mapa</AppTitle>

            <MapWrapper>
                <ComposableMap projection="geoMercator"
                    projectionConfig={{
                        rotate: [0, 0, 0],
                        center: [0, 0],
                        scale: 800,
                    }}>
                    <ZoomableGroup center={[-55, -15]} zoom={1}>
                        <Geographies
                            geography={topoJson}
                            fill="#ddd"
                            stroke="#fff"
                        >
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography key={geo.rsmKey} geography={geo} />
                                ))
                            }
                        </Geographies>
                        <Geographies
                            geography={topoJsonBrasil}
                            fill="#ddd"
                            stroke="#aaa"
                        >
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                    />
                                ))
                            }
                        </Geographies>
                        {
                            clientesMarker.map((cmk: clienteMarkType) => (
                                //@ts-ignore
                                <Marker coordinates={getCoord(cmk)}>
                                    <circle r={Number(cmk.quantidade) + 2} fill="rgba(0,0,0,0.5)" />
                                </Marker>
                            ))
                        }

                    </ZoomableGroup>
                </ComposableMap>
            </MapWrapper>

            <p>TO DO: Pegar dados populacionais de cada estado/ pegar dados de advogados de cada estado/ pegar dados de mercado de cada estado</p>
        </>
    )
}

const MapWrapper = styled.div`
    max-width: 600px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    background-color: #fafafa;
    margin-bottom: 20px;
`

export default MapChart