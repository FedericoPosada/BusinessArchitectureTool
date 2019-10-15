import {
    Document,
    Media,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    TableOfContents,
    WidthType,
    ShadingType,
    VerticalAlign,
    StyleLevel, TableRow, TableCell, Table, BorderStyle
} from "docx";
import React from "react";
import FinalDocuments from "../../api/FinalDocumentsCol";
import {Meteor} from "meteor/meteor";
import {bServicesContainer} from "../../api/bservices";
import BusinessService from "../BusinessModel/BusinessService";
import {bServicesOperationsContainer} from "../../api/bservoperations";
import {bSheetsContainer} from "../../api/bsheets";
import {incomeStatementsContainer} from "../../api/istatements";
import {cashFlowsContainer} from "../../api/cashflows";
import {motivCompContainer} from "../../api/motivcomp";
import {financialContainer} from "../../api/finindicators";
import {bStrategiesContainer} from "../../api/bstrategies";
import {objectivesContainer} from "../../api/objectives";
import {goalsContainer} from "../../api/goals";
import {tacticsContainer} from "../../api/tactics";
import {achIndicatorsContainer} from "../../api/achindicators";
import {strategiesContainer} from "../../api/strategies";

// Create document
export default class FinalDocument extends React.Component {

    constructor(props){
        super(props);
        this.state={
            docid:""
        }
        this.uploadIt=this.uploadIt.bind(this);
    }

    componentWillMount() {
        Meteor.subscribe('finaldocuments');
        Meteor.subscribe('bservices');
        Meteor.subscribe('bservoperations');
        Meteor.subscribe('bsheets');
        Meteor.subscribe('istatements');
        Meteor.subscribe('cashflows');
        Meteor.subscribe('motivcomp');
        Meteor.subscribe('finindicators');
        Meteor.subscribe('bstrategies');
        Meteor.subscribe('bstrategies');
        Meteor.subscribe('objectives');
        Meteor.subscribe('goals');
        Meteor.subscribe('tactics');
        Meteor.subscribe('strategies');
        Meteor.subscribe('achindicators');
        Tracker.autorun(()=> {
            let doc = FinalDocuments.collection.findOne({userId: Meteor.userId()});
            if (typeof doc !== "undefined")
                this.setState({
                    docid: doc._id
                });
        });
    }

    removeFinalDocument(){
        Meteor.call('RemoveFinalDocument', this.state.docid, function (err, res) {
            if (err)
                Materialize.toast("Ha ocurrido un error.",3000);
        })
        this.setState({
            docid:""
        })
    }

    uploadIt(e) {
        let self = this;
            let file = e;
            if (file) {
                let uploadInstance = FinalDocuments.insert({
                    file: file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true // If you see issues with uploads, change this to false
                }, false);

                // These are the event functions, don't need most of them, it shows where we are in the process
                uploadInstance.on('start', function () {
                    console.log('Starting');
                })

                uploadInstance.on('end', function (error, fileObj) {
                    console.log('On end File Object: ', fileObj);
                })

                uploadInstance.on('uploaded', function (error, fileObj) {
                    console.log('uploaded: ', fileObj);
                    // Reset our state for the next file
                    self.setState({
                        docid:fileObj._id
                    });
                })
                uploadInstance.start(); // Must manually start the upload
            }

    }

    createDoc() {
        let self=this;
        let img="";
        let img2="";
        const doc = new Document({
            styles: {
                paragraphStyles: [
                    {
                        id: "SectionTitles",
                        name: "SectionTitles",
                        basedOn: "Heading1",
                        next: "Heading1",
                        quickFormat: true,
                        run: {
                            bold: true,
                            color: "000000",
                            font: "Segoe UI"
                        },
                    },
                    {
                        id: "SectionSubtitles",
                        name: "SectionSubtitles",
                        basedOn: "Heading2",
                        next: "Heading2",
                        quickFormat: true,
                        run: {
                            bold: true,
                            color: "000000",
                            font: "Segoe UI"
                        },
                    },
                    {
                        id: "SubSectionSubtitles",
                        name: "SubSectionSubtitles",
                        basedOn: "Heading3",
                        next: "Heading3",
                        quickFormat: true,
                        run: {
                            bold: true,
                            color: "000000",
                            font: "Segoe UI"
                        },
                    },
                    {
                        id: "TableText",
                        name: "TableText",
                        quickFormat: true,
                        run: {
                            bold: false,
                            color: "000000",
                            font: "Calibri"
                        },
                    },
                    {
                        id: "TableHeading",
                        name: "TableHeading",
                        quickFormat: true,
                        run: {
                            bold: true,
                            color: "000000",
                            font: "Calibri"
                        },
                    }
                ],
            },
        });
        Meteor.call(
            'getOntologicalModel',
            function(error, result){
                if(error){
                    console.log(error);
                } else {
                    img=result[0];
                    img2=result[1];
                    const image1 = Media.addImage(doc, img);
                    const image2 = Media.addImage(doc, img2);
                    let bservportfolio=self.createBServicesPortfolio();
                    let bsheet=self.createBalanceSheet();
                    let istatement=self.createIncomeStatement();
                    let cashflow=self.createCashFlow();
                    let motivcomp=self.createMotivComponent();
                    let finind=self.createFinancialIndicators();
                    let bstrats=self.createBusinessStrategies();
                    let stratTables=self.createStrategicPlan();
                    doc.addSection({
                        properties: {},
                        children: [
                            new TableOfContents("Summary", {
                                hyperlink: true,
                                headingStyleRange: "1-5",
                                stylesWithLevels: [new StyleLevel("SectionTitles", 1), new StyleLevel("SectionSubtitles", 2),
                                    new StyleLevel("SubSectionSubtitles", 3)]
                            }),
                            new Paragraph({
                                text: "1. Modelo de negocio",
                                style: "SectionTitles",
                                pageBreakBefore: true,
                            }),
                            new Paragraph({
                                text: "1.1. Portafolio de servicios",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            bservportfolio,
                            new Paragraph({
                                text: "2. Modelo financiero",
                                style: "SectionTitles",
                                pageBreakBefore: true,
                            }),
                            new Paragraph({
                                text: "2.1. Balance general",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            bsheet,
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "2.2. Ingresos y egresos",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            istatement,
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "2.3. Flujo de caja",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            cashflow,
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "2.4. Indicadores financieros",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            finind,
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3. Modelo estratégico",
                                style: "SectionTitles",
                                pageBreakBefore: true,
                            }),
                            new Paragraph({
                                text: "3.1. Componente motivacional",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            motivcomp,
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.2. Estrategias de negocio",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            bstrats,
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.3. Plan estratégico",
                                style: "SectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.3.1. Objetivos",
                                style: "SubSectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            stratTables[0],
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.3.2. Metas",
                                style: "SubSectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            stratTables[1],
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.3.3. Estrategias",
                                style: "SubSectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            stratTables[2],
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.3.4. Tácticas",
                                style: "SubSectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            stratTables[3],
                            new Paragraph({
                                text: "\n"
                            }),
                            new Paragraph({
                                text: "3.3.5. Indicadores de logro",
                                style: "SubSectionSubtitles"
                            }),
                            new Paragraph({
                                text: "\n"
                            }),
                            stratTables[4],
                        ],
                    });
                    let file;
                    Packer.toBlob(doc).then((blob) => {
                        // saveAs from FileSaver will download the file
                        file=new File([blob],Meteor.userId()+"FinalDoc.docx");
                        self.uploadIt(file);
                    });
                }
            }
        );
    }

    createBServicesPortfolio(){
        let bServices = bServicesContainer.find({owner:Meteor.userId()}).fetch();
        let servRows=[];
        servRows.push(new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        rowSpan:2
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Servicio de negocio",
                        style:"TableHeading",
                        rowSpan:2
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Objeto de negocio",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Tipo de cliente",
                        style:"TableHeading",
                        rowSpan:2
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Operaciones",
                        style:"TableHeading",
                        rowSpan:2
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        }));
        let bServiceOperations;
        let bServiceOperationsPars=[];
        let merging;
        let currentRow;
        bServices.map((val, index)=>{
            merging=1;
            bServiceOperationsPars=[];
            bServiceOperations = bServicesOperationsContainer.find({owner:Meteor.userId(),bserviceid:val._id}).fetch();
            bServiceOperations.map((valint, indexint)=> {
                bServiceOperationsPars.push(new Paragraph({
                    text:"-"+valint.customid+" "+valint.name+"\n",
                    style:"TableText"}))
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.object,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.client,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: bServiceOperationsPars
                    })
                ],
            });
            servRows.push(currentRow);
        });

        const table = new Table({
            rows: servRows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        return table;
    }

    createBalanceSheet(){
        let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
        if(typeof bSheet !== 'undefined') {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Activos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Pasivos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Activos corrientes",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Pasivos corrientes",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Caja y equivalentes de caja",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.cash,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Cuentas por pagar",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.accountspayable,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Valores negociables",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.marketablesecurities,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Gastos acumulados",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.financialliabilities,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Inventarios",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.inventories,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos no devengados",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.unearnedrevenue,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Cuentas por cobrar",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.accountspayable,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total pasivos corrientes",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.totalcurrentl,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total activos corrientes",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.totalcurrent,
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Pasivos no corrientes",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            })
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Activos fijos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Deuda a largo plazo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.longtermdebt,
                                    style: "TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Propiedades y equipos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.property,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otros pasivos a largo plazo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.otherlongtermliabilities,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Activos intangibles",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.intangible,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total pasivos no corrientes",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.totalnoncurrentl,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Inversiones",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.investment,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Patrimonio",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan: 2,
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otros activos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.otherassets,
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Autocartera",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.treasuryshares,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total activos fijos",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.totalnoncurrent,
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Capital pagado adicional",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.additionalpaidin,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [],
                                columnSpan:2
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otra pérdida integral acumulada",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.comprehensiveloss,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [],
                                columnSpan:2
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Utilidades retenidas",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.retainedearnings,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [],
                                columnSpan:2
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total patrimonio",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.totalequity,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total activos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.totalassets,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total pasivos y patrimonio",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+bSheet.total,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                ],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 50,
                    bottom: 50,
                    right: 50,
                    left: 50,
                },
            });
            return table;
        }
        else
            return "";
    }

    createIncomeStatement(){
        let iStatement = incomeStatementsContainer.findOne({owner:Meteor.userId()});
        if(typeof iStatement !== 'undefined') {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Estado de ingresos y egresos",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ventas netas de productos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.productnetsales,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ventas netas de servicios",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.servicenetsales,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ventas netas",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.totalnetsales,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Costos por ventas",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.salescost,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Publicidad",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.marketing,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Tecnología y contenido",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.technology,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Gastos administrativos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.adminexpenses,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otros gastos operativos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.otheropexpenses,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Total gastos operativos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.totalopexpenses,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos operacionales",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.operationalincome,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos operacionales",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.interestincome,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Gastos por intereses",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.interestexpense,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otros ingresos netos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.othernetincome,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos antes de impuestos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.incomebeftaxes,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Impuestos sobre la renta",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.taxes,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos por inversiones",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.investmentincome,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos netos",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+iStatement.netincome,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                        ],
                    }),

                ],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 50,
                    bottom: 50,
                    right: 50,
                    left: 50,
                },
            });
            return table;
        }
        else
            return "";
    }

    createCashFlow(){
        let cashFlow = cashFlowsContainer.findOne({owner:Meteor.userId()});
        if(typeof cashFlow !== 'undefined'){
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Flujo de caja",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Efectivo y equivalentes de efectivo al inicio del periodo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.cashbeginning,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Actividades de operación",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Utilidad neta del ejercicio",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.netincome,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Depreciación",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.depreciation,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Compensación basada en acciones",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.stockcompensation,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otros gastos operativos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.opexpense,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Impuestos diferidos sobre la renta",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.deferredinc,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Cambios en activos y pasivos",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Inventarios",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.inventories,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Cuentas por cobrar",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.accreceivable,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Cuentas por pagar",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.accpayable,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Otros pasivos",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.otherliabilities,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Efectivo neto provisto por actividades de operación",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.cashoperativeactivities,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Actividades de inversión",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Adquisición de propiedad, planta y equipo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.purchasesproperty,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Venta de propiedad, planta y equipo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.purchasesproperty,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Compra de valores negociables",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.purchasesmarketablesecurities,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Venta de valores negociables",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.salesmarketablesecurities,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Efectivo neto provisto por actividades de inversión",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.cashinvestmentactivities,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Actividades de financiación",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Ingresos por deudas a largo plazo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.proceedslongterm,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Pago de deudas a largo plazo",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.repaymentslongterm,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Pago por arrendamientos financieros y de capital",
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.leasespayments,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Efectivo neto provisto por actividades de financiación:",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.cashfinancingactivities,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Incremento neto sobre el efectivo:",
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.cashincrease,
                                    style: "TableHeading"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Efectivo y equivalentes de efectivo al final del periodo",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "$ "+cashFlow.finalcash,
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                        ],
                    }),

                ],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 50,
                    bottom: 50,
                    right: 50,
                    left: 50,
                },
            });
            return table;
        }
        else
            return "";
    }

    createFinancialIndicators(){
        let cashratio=financialContainer.findOne({name:"Razón de efectivo",owner:Meteor.userId()});
        let currentratio=financialContainer.findOne({name:"Razón corriente",owner:Meteor.userId()});
        let acidtest=financialContainer.findOne({name:"Prueba ácida",owner:Meteor.userId()});
        let row;
        let text;
        let indicatorsRows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text: "Indicadores financieros",
                        style: "TableHeading"
                    })],
                    columnSpan:3,
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                    verticalAlign: VerticalAlign.CENTER
                }),
            ],
        }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text: "Nombre",
                            style: "TableHeading"
                        })],
                        shading: {
                            fill: "D1D1D1",
                            val: ShadingType.CLEAR,
                            color: "auto",
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Valor",
                            style: "TableHeading"
                        })],
                        shading: {
                            fill: "D1D1D1",
                            val: ShadingType.CLEAR,
                            color: "auto",
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Significado",
                            style: "TableHeading"
                        })],
                        shading: {
                            fill: "D1D1D1",
                            val: ShadingType.CLEAR,
                            color: "auto",
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                ],
            })];
        if(typeof cashratio !== 'undefined') {
            text=""+cashratio.value;
            if(text.length > 4){
                text=text.substring(0,4);
            }
            row = new TableRow({
                children:[
                    new TableCell({
                        children: [new Paragraph({
                            text: cashratio.name,
                            style: "TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: text,
                            style: "TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: cashratio.meaning,
                            style: "TableText"
                        })]
                    }),
                ]
            });
            indicatorsRows.push(row);
        }
        if(typeof currentratio !== 'undefined') {
            text=""+currentratio.value;
            if(text.length > 4){
                text=text.substring(0,4);
            }
            row = new TableRow({
                children:[
                    new TableCell({
                        children: [new Paragraph({
                            text: currentratio.name,
                            style: "TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: text,
                            style: "TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: currentratio.meaning,
                            style: "TableText"
                        })]
                    }),
                ]
            });
            indicatorsRows.push(row);
        }
        if(typeof acidtest !== 'undefined') {
            text=""+acidtest.value;
            if(text.length > 4){
                text=text.substring(0,4);
            }
            row = new TableRow({
                children:[
                    new TableCell({
                        children: [new Paragraph({
                            text: acidtest.name,
                            style: "TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: text,
                            style: "TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: acidtest.meaning,
                            style: "TableText"
                        })]
                    }),
                ]
            });
            indicatorsRows.push(row);
        }
        const table = new Table({
            rows: indicatorsRows,
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        return table;
    }

    createMotivComponent(){
        let motivC = motivCompContainer.findOne({owner:Meteor.userId()});

        if(typeof motivC !== 'undefined'){
            let values= motivC.values;
            let valuesPars=[];
            values.map((val, index)=> {
                valuesPars.push(new Paragraph({
                    text:"-"+val+"\n",
                    style:"TableText"
                }))
            });
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Componente motivacional",
                                    style: "TableHeading"
                                })],
                                columnSpan:2,
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                verticalAlign: VerticalAlign.CENTER
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Propósito superior",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: ""+motivC.superiorpurpose,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Objetivo retador",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: ""+motivC.challengingobjective,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Visión",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: ""+motivC.vision,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Misión",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: ""+motivC.mision,
                                    style: "TableText"
                                })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Valores y principios",
                                    style: "TableHeading"
                                })],
                                shading: {
                                    fill: "D1D1D1",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children: valuesPars
                            }),
                        ],
                    }),
                ],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 50,
                    bottom: 50,
                    right: 50,
                    left: 50,
                },
            });
            return table;
        }
        else
            return "";
    }

    createBusinessStrategies(){
        var bStrategies = bStrategiesContainer.find({owner:Meteor.userId()}).fetch();
        let rows=[];
        rows.push(new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Estrategia",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Descripción",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Categoría",
                        style:"TableHeading",
                        rowSpan:2
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"ID asociada",
                        style:"TableHeading",
                        rowSpan:2
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        }));
        let currentRow;
        bStrategies.map((val, index)=>{
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.description,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.category,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.associatedid,
                            style:"TableText"
                        })]
                    })
                ],
            });
            rows.push(currentRow);
        });

        const table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        return table;
    }

    createStrategicPlan(){
        let currentRow;
        let objectives = objectivesContainer.find({owner:Meteor.userId()}).fetch();
        let goals = goalsContainer.find({owner:Meteor.userId()}).fetch();
        let tacs = tacticsContainer.find({}).fetch();
        let achinds = achIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
        let strats = strategiesContainer.find({owner:Meteor.userId()}).fetch();
        let goalsrows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Meta",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Objetivo",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Fecha límite",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        let tacsrows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Táctica",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Estrategia",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        let stratsrows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Estrategia",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Objetivo",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        let achindsrows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Descripción",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Meta",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Fecha límite",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        let objrows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Objetivo",
                        style:"TableHeading"
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        objectives.map((val, index)=>{
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText"
                        })]
                    }),
                ],
            });
            objrows.push(currentRow);
        });
        goals.map((val, index)=>{
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.objective,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.deadline,
                            style:"TableText"
                        })]
                    }),
                ],
            });
            goalsrows.push(currentRow);
        });
        strats.map((val, index)=>{
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.objective,
                            style:"TableText"
                        })]
                    }),
                ],
            });
            stratsrows.push(currentRow);
        });
        tacs.map((val, index)=>{
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.strategy,
                            style:"TableText"
                        })]
                    }),
                ],
            });
            tacsrows.push(currentRow);
        });
        achinds.map((val, index)=>{
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.description,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.goal,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.deadline,
                            style:"TableText"
                        })]
                    }),
                ],
            });
            achindsrows.push(currentRow);
        });

        let tableObj = new Table({
            rows: objrows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        let tableGoals = new Table({
            rows: goalsrows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        let tableStrats = new Table({
            rows: stratsrows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        let tableTacs = new Table({
            rows: tacsrows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });
        let tableAch = new Table({
            rows: achindsrows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 50,
                bottom: 50,
                right: 50,
                left: 50,
            },
        });

        return [tableObj,tableGoals,tableStrats,tableTacs,tableAch];

    }





    render(){
        let query=FinalDocuments.findOne({_id:this.state.docid});
        let cursor;
        if(typeof query !== "undefined")
            cursor=query.link();
        else
            cursor="";
        return(
            <div>
                { cursor !== "" &&
                <div className="input-field col s10">
                    <a className="waves-effect waves-light btn red" onClick={this.removeFinalDocument.bind(this)} style={{"marginLeft":"14px"}}><i className="material-icons left">delete</i>Borrar</a>
                    <a className="waves-effect waves-light btn" href={cursor} download={true} style={{"marginLeft":"14px"}}><i className="material-icons left">file_download</i>Descargar</a>
                </div>
                }
                { cursor === "" &&
                <div className="input-field col s8">
                    <a className="waves-effect waves-light btn light-green" onClick={this.createDoc.bind(this)}
                       style={{"marginLeft":"14px"}}><i className="material-icons left">library_add</i>Crear documento</a>
                </div>
                }
            </div>
        )
    }
}
