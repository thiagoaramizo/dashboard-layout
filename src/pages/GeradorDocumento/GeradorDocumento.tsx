import AppTitle from "../../components/AppTitle/AppTitle"
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, UnderlineType, TextRun, Header, NumberFormat, ImageRun, Table, TableRow, TableCell, BorderStyle } from 'docx'
import * as fs from 'fs'
import { saveAs } from 'file-saver'
import { useState } from "react"

const GeradorDocumento = () => {

    const [image, setImage] = useState<Uint8Array>()

    const styles = {
        default: {
            heading1: {
                run: {
                    size: 48,
                    bold: true,
                    color: "CC00CC",
                },
                paragraph: {
                    spacing: {
                        line: 260
                    },
                    border: {
                        bottom: {
                            color: "auto",
                            space: 1,
                            style: "single",
                            size: 6,
                        },
                    },
                },
            },
            heading2: {
                run: {
                    size: 40,
                    bold: true,
                    underline: {
                        type: UnderlineType.DOUBLE,
                    },
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                },
            },
        },
        paragraphStyles: [
            {
                id: "Citacao",
                name: "Citacao",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: {
                },
                paragraph: {
                    indent: {
                        left: 1440,
                    },
                },
            },
            {
                id: "Normal",
                name: "Normal",
                next: "Normal",
                quickFormat: true,
                run: {
                    size: 22,
                    font: 'Helvetica',
                },
                paragraph: {
                    spacing: { line: 300, before: 300, after: 300 },
                    alignment: AlignmentType.JUSTIFIED,
                },
            },
        ]
    }

    const titulo1 = (texto: string): Paragraph => {
        return new Paragraph({
            text: texto,
            heading: HeadingLevel.HEADING_1
        })
    }

    const titulo2 = (texto: string): Paragraph => {
        return new Paragraph({
            text: texto,
            heading: HeadingLevel.HEADING_2
        })
    }

    const citacao = (texto: string): Paragraph => {
        return new Paragraph({
            text: texto,
            style: 'Citacao'
        });
    }

    const imagem = (img: Uint8Array): Paragraph => {
        const paragraph = new Paragraph({
            children: [
                new ImageRun({
                    data: img,
                    transformation: {
                        width: 568,
                        height: 568,
                    }
                })
            ]
        })
        return paragraph
    }

    const normal = (texto: string): Paragraph => {

        const formatarNegritos = (texto: string): TextRun[] => {
            const textoSeparado = texto.split('*')
            let i = 0
            const retorno = textoSeparado.map((textoParcial) => {
                if (i % 2 === 0) {
                    i++
                    return (
                        new TextRun({
                            text: textoParcial
                        })
                    )
                } else {
                    i++
                    return (
                        new TextRun({
                            text: textoParcial,
                            bold: true
                        })
                    )
                }
            })
            return retorno
        }

        return new Paragraph({
            children: formatarNegritos(texto)
        });
    }

    const tabelaCelulaTexto = (conteudo: string): TableCell => {
        return new TableCell({
            children: [
                new Paragraph({
                    text: conteudo,
                    spacing: {
                        before: 0,
                        after: 0
                    },
                })
            ],
            borders: {
                top: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "ffffff",
                },
                bottom: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "ffffff",
                },
                left: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "ffffff",
                },
                right: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "ffffff",
                },
            },
        })
    }

    const clausula = (texto: string): Table => {
        return new Table({
            rows: [
                new TableRow({
                    children: [
                        tabelaCelulaTexto('Clausula 1'),
                        tabelaCelulaTexto(texto)
                    ]
                })
            ]
        });
    }

    const gerarDocumento = () => {
        const doc = new Document({
            background: {
                color: "FFFFFF",
            },
            styles: styles,
            sections: [
                {
                    properties: {
                        page: {
                            pageNumbers: {
                                start: 1,
                                formatType: NumberFormat.DECIMAL,
                            },
                            margin: {
                                right: 1700,
                                left: 1700,
                            },
                        },
                    },
                    headers: {
                        default: new Header({ // The standard default header on every page or header on odd pages when the 'Different Odd & Even Pages' option is activated
                            children: [
                                normal('Texto normal'),
                            ],
                        }),
                    },
                    children: [
                        titulo1('Hello Word'),
                        normal('Esse é um *parágrafo* normal'),
                        citacao('Essa é uma citação!'),
                        titulo2('Título 2'),
                        imagem(image as Uint8Array),
                        normal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus massa libero, mattis at est id, venenatis tempus sem. Ut dapibus pellentesque sollicitudin. Mauris dapibus in nisl eget imperdiet. Sed gravida purus erat, sed vehicula sapien sagittis quis. Cras volutpat lacus vel ipsum lacinia, non volutpat nunc dapibus. Vivamus at lorem auctor, consectetur lectus sed, luctus magna. Mauris velit est, scelerisque id facilisis et, ornare id nunc. Aenean auctor eros ut risus scelerisque rutrum. Nulla facilisi. Pellentesque lorem nunc, rhoncus non lectus ut, volutpat feugiat purus. Vivamus pretium nulla odio, ornare feugiat eros venenatis sed. Sed pretium mauris bibendum enim mattis, vitae ultricies ligula varius. Etiam mauris nunc, dapibus vitae tincidunt cursus, dictum id lorem. In hac habitasse platea dictumst. Vestibulum venenatis elementum velit sed tristique. Aliquam dapibus purus mauris, porttitor hendrerit odio varius et.'),
                        clausula('Texto da clausula')
                    ]
                },
            ]
        });

        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            const file = e.target.files[0]
            console.log(file)
            const fileBuffer = await convertBuffer(file) as ArrayBuffer
            let x = new Uint8Array(fileBuffer)
            //console.log(x)
            setImage(x)
        }
    }

    const convertBuffer = (file: File) => {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = () => {
                resolve(fileReader.result as ArrayBuffer);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <>
            <AppTitle>Gerador de documento</AppTitle>
            <input type="file" multiple accept="image/*" onChange={(e) => onImageChange(e)} />
            <button onClick={(e) => { gerarDocumento() }}>Gerar Documento</button>
        </>
    )
}

export default GeradorDocumento