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
import {transfActionsContainer} from "../../api/transfactions";
import {projectsContainer} from "../../api/projects";
import {supActivitiesContainer} from "../../api/supactivities";
import {processesContainer} from "../../api/processes";
import {applicationsContainer} from "../../api/applications";
import {opIndicatorsContainer} from "../../api/opindicators";
import {stIndicatorsContainer} from "../../api/stindicators";
import {exIndicatorsContainer} from "../../api/exindicators";
import {resourcesContainer} from "../../api/resources";
import {resServicesContainer} from "../../api/resservices";
import {tiResourcesContainer} from "../../api/tiresources";
import {positionsContainer} from "../../api/positions";
import {componentsContainer} from "../../api/components";
import {opItemsContainer} from "../../api/opitems";
import ProcessesImages from "../../api/ProcessesImagesCol";
import {packagesContainer} from "../../api/packages";
import {subpackagesContainer} from "../../api/subpackages";
import {capacitiesContainer} from "../../api/capacities";
import PrivateLoggedHeader from "../PrivateLoggedHeader";
import {channelsContainer} from "../../api/channels";
import {channelActivitiesContainer} from "../../api/chanactivities";

// Create document
export default class FinalDocument extends React.Component {

    constructor(props){
        super(props);
        this.state={
            docid:"",
            procimagesids:[],
            loaded:false
        }
        this.uploadIt=this.uploadIt.bind(this);
    }

    componentWillMount() {
        let self=this;
        Meteor.call('getProcsImages',function(error, result){
            if(result.length > 0){
                self.setState({
                        procimagesids: result,
                    loaded:true
                    }
                )
            }
            else {
                Materialize.toast("No se han encontrado imágenes de procesos",3000);
                self.setState({
                        procimagesids: result,
                        loaded:true
                    }
                )
            }
        });
        Meteor.subscribe('finaldocuments');
        Meteor.subscribe('bservices');
        Meteor.subscribe('opitems');
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
        Meteor.subscribe('transfactions');
        Meteor.subscribe('projects');
        Meteor.subscribe('transfactions');
        Meteor.subscribe('supactivities');
        Meteor.subscribe('processes');
        Meteor.subscribe('applications');
        Meteor.subscribe('stindicators');
        Meteor.subscribe('opindicators');
        Meteor.subscribe('exindicators');
        Meteor.subscribe('resservices');
        Meteor.subscribe('resources');
        Meteor.subscribe('tiresources');
        Meteor.subscribe('positions');
        Meteor.subscribe('components');
        Meteor.subscribe('processes');
        Meteor.subscribe('processesimages');
        Meteor.subscribe('capacities');
        Meteor.subscribe('subpackages');
        Meteor.subscribe('packages');
        Meteor.subscribe('channels');
        Meteor.subscribe('channelactivities');

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
        let img3="";
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
            'getImagesDoc',
            function(error, result){
                if(error){
                    console.log(error);
                } else {
                    if(result !== "") {
                        img = result[1];
                        img2 = result[0];
                        img3 = result[2];
                        let image1="";
                        let image2="";
                        let image3="";
                        if(img !== "")
                         image1 = Media.addImage(doc, img, 600, 500);
                        if(img2 !== "")
                         image2 = Media.addImage(doc, img2, 600, 500);
                        if(img3 !== "")
                         image3 = Media.addImage(doc, img3, 600, 350);
                        let procCatalog=self.createProcessCatalog(doc);
                        let bservportfolio = self.createBServicesPortfolio();
                        let cModel=self.createChannelModel();
                        let OpChanCrossing=self.createOpChanCrossing();
                        let bsheet = self.createBalanceSheet();
                        let istatement = self.createIncomeStatement();
                        let cashflow = self.createCashFlow();
                        let motivcomp = self.createMotivComponent();
                        let finind = self.createFinancialIndicators();
                        let bstrats = self.createBusinessStrategies();
                        let stratTables = self.createStrategicPlan();
                        let transfAct = self.createTransfActions();
                        let projCatalog = self.createProjectsPortfolio();
                        let opinds = self.createOperativeIndicators();
                        let stinds = self.createStrategicIndicators();
                        let extinds = self.createExternalIndicators();
                        let appCatalog = self.createAppCatalog();
                        let valuechain = self.createValueChain();
                        let resModel = self.createResourcesModel();
                        let resTIModel = self.createTIResourcesModel();
                        let posCatalog = self.createPositionCatalog();
                        let compsCatalog = self.createComponentsCatalog();
                        let opModel = self.createOperativeModel();
                        let capMap=self.createCapacitiesMap();
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
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "1.2. Modelo ontológico",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph(image1),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "1.3. Estructura de negocio",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph(image3),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "1.4. Modelo de canales",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                cModel,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "1.5. Cruce de canales y servicios",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph(image1),
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
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "3.4. Mapa de proyectos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "3.4.1. Acciones de transformación",
                                    style: "SubSectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                transfAct,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "3.4.2. Portafolio de proyectos",
                                    style: "SubSectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                projCatalog,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "4. Mapa de capacidades",
                                    style: "SectionTitles",
                                    pageBreakBefore: true,
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                capMap,
                                new Paragraph({
                                    text: "5. Estructura organizacional",
                                    style: "SectionTitles",
                                    pageBreakBefore: true,
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "5.1. Catálogo de cargos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                posCatalog,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "5.2. Organigrama",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph(image2),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "6. Modelo de procesos",
                                    style: "SectionTitles",
                                    pageBreakBefore: true,
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "6.1. Cadena de valor",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                valuechain,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "6.2. Catálogo de procesos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                procCatalog,
                                new Paragraph({
                                    text: "7. Modelo de recursos",
                                    style: "SectionTitles",
                                    pageBreakBefore: true,
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "7.1. Modelo de recursos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                resModel,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "7.2. Modelo de recursos TI",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                resTIModel,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "7.3. Catálogo de componentes tecnológicos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                compsCatalog,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "7.4. Catálogo de aplicaciones",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                appCatalog,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "7.5. Modelo operativo",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                opModel,
                                new Paragraph({
                                    text: "8. Modelo de información",
                                    style: "SectionTitles",
                                    pageBreakBefore: true,
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "8.1. Indicadores operativos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                opinds,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "8.2. Indicadores estratégicos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                stinds,
                                new Paragraph({
                                    text: "\n"
                                }),
                                new Paragraph({
                                    text: "8.3. Indicadores externos",
                                    style: "SectionSubtitles"
                                }),
                                new Paragraph({
                                    text: "\n"
                                }),
                                extinds,
                            ],

                        });
                        let file;
                        Packer.toBlob(doc).then((blob) => {
                            // saveAs from FileSaver will download the file
                            file = new File([blob], Meteor.userId() + "FinalDoc.docx");
                            self.uploadIt(file);
                        });
                    }
                    else
                        Materialize.toast("No se ha completa")
                }
            }
        );
    }

    createBServicesPortfolio(){
        try{
        let bServices = bServicesContainer.find({owner:Meteor.userId()}).fetch();
        let servRows=[];
        servRows.push(new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        alignment: AlignmentType.CENTER,
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
                        alignment: AlignmentType.CENTER,
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
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.object,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.client,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: bServiceOperationsPars,
                        verticalAlign: VerticalAlign.CENTER,
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createChannelModel(){
        try{
            let currentTable;
            let currentRow;
            let rows=[];
            let opInd = channelsContainer.find({owner:Meteor.userId()}).fetch();
            let currentActivities=[];
            let activitiesPars=[];
            opInd.map((val, index)=>{
                currentActivities=[];
                console.log(val.customid);
                currentActivities=channelActivitiesContainer.find({owner:Meteor.userId(),channelcustomid:val.customid}).fetch();
                console.log(currentActivities);
                activitiesPars=[];
                currentActivities.map((valP, indexP)=>{
                    console.log(" - "+valP.customid+" "+valP.name);
                    activitiesPars.push(new Paragraph({
                        text:" - "+valP.customid+" "+valP.name+"\n",
                        style:"TableText"
                    }))
                });
                currentTable = new Table({
                    rows: [
                        new TableRow({
                            children:[
                                new TableCell({
                                    children:[
                                                new Paragraph({
                                                text:val.customid+"-"+val.name,
                                                style:"TableHeading"
                                            })

                                    ],
                                    shading: {
                                        fill: "B3B4B5",
                                        val: ShadingType.CLEAR,
                                        color: "auto",
                                    },
                                 columnSpan:2
                                })
                            ]
                        }),
                        new TableRow({
                            children:[
                                new TableCell({
                                    children:[
                                        new Paragraph({
                                        text:"Actividades",
                                        style:"TableText"
                                    })],
                                }),
                                new TableCell({
                                    children:activitiesPars
                                }),
                            ]
                        }),
                    ],
                    width: {
                        size:100,
                        type: WidthType.PERCENTAGE,
                    },
                    margins: {
                        top: 75,
                        bottom: 75,
                        right: 75,
                        left: 75,
                    },
                });
                currentRow=new TableRow({
                    children: [
                        new TableCell({
                            children: [currentTable],
                            borders: {
                                top: {
                                    style: BorderStyle.NONE,
                                    size: 1,
                                    color: "white",
                                },
                                bottom: {
                                    style: BorderStyle.NONE,
                                    size: 1,
                                    color: "white",
                                },
                                left: {
                                    style: BorderStyle.NONE,
                                    size: 1,
                                    color: "white",
                                },
                                right: {
                                    style: BorderStyle.NONE,
                                    size: 1,
                                    color: "white",
                                },
                            },
                        })
                    ],
                });
                rows.push(currentRow);
            });
            let table = new Table({
                rows: rows,
                width: {
                    size:100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 75,
                    bottom: 75,
                    right: 75,
                    left: 75,
                },
            });
            return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createOpChanCrossing(){}

    createBalanceSheet(){
        try{
        let bSheet = bSheetsContainer.findOne({owner:Meteor.userId()});
        if(typeof bSheet !== 'undefined') {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Activos",
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    text: Number(bSheet.cash).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',    
                                }),
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
                                    text: Number(bSheet.accountspayable).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.marketablesecurities).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.financialliabilities).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.inventories).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.unearnedrevenue).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.accountspayable).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.totalcurrentl).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.totalcurrent).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
                                    style: "TableHeading"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Pasivos no corrientes",
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    text: Number(bSheet.longtermdebt).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.property).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.otherlongtermliabilities).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.intangible).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.totalnoncurrentl).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.investment).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
                                    style: "TableText"
                                })],
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Patrimonio",
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    text: Number(bSheet.otherassets).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.treasuryshares).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.totalnoncurrent).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.additionalpaidin).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.comprehensiveloss).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.retainedearnings).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.totalequity).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.totalassets).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
                                    text: Number(bSheet.total).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
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
            return "";}
    catch (e) {
        return new Paragraph("");
    }
    }

    createIncomeStatement(){
        try{
        let iStatement = incomeStatementsContainer.findOne({owner:Meteor.userId()});
        if(typeof iStatement !== 'undefined') {
            const table = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text: "Estado de ingresos y egresos",
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
                                    text: Number(iStatement.productnetsales).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.servicenetsales).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.totalnetsales).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.salescost).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.marketing).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.technology).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.adminexpenses).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.otheropexpenses).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.totalopexpenses).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.operationalincome).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.interestincome).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.interestexpense).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.othernetincome).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.incomebeftaxes).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.taxes).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.investmentincome).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
                                    text: Number(iStatement.netincome).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
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
            return "";}
    catch (e) {
        return new Paragraph("");
    }
    }

    createCashFlow(){
        try {
            let cashFlow = cashFlowsContainer.findOne({owner: Meteor.userId()});
            if (typeof cashFlow !== 'undefined') {
                const table = new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        text: "Flujo de caja",
                                        style: "TableHeading",
                                        alignment: AlignmentType.CENTER,
                                    })],
                                    columnSpan: 2,
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
                                        text: Number(cashFlow.cashbeginning).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                    columnSpan: 2,
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
                                        text: Number(cashFlow.netincome).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.depreciation).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.stockcompensation).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.opexpense).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.deferredinc).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                    columnSpan: 2,
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
                                        text: Number(cashFlow.inventories).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.accreceivable).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.accpayable).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.otherliabilities).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.cashoperativeactivities).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                    columnSpan: 2,
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
                                        text: Number(cashFlow.purchasesproperty).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.purchasesproperty).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.purchasesmarketablesecurities).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.salesmarketablesecurities).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.cashinvestmentactivities).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                    columnSpan: 2,
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
                                        text: Number(cashFlow.proceedslongterm).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.repaymentslongterm).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.leasespayments).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.cashfinancingactivities).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.cashincrease).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
                                        text: Number(cashFlow.finalcash).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }),
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
            } else
                return "";
        }
    catch (e) {
        return new Paragraph("");
    }
    }

    createFinancialIndicators(){
        try{
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
                        style: "TableHeading",
                        alignment: AlignmentType.CENTER,
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
                            style: "TableHeading",
                            alignment: AlignmentType.CENTER,
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
                            style: "TableHeading",
                            alignment: AlignmentType.CENTER,
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
                            style: "TableHeading",
                            alignment: AlignmentType.CENTER,
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
        return table;}
    catch (e) {
        return new Paragraph("");
    }
    }

    createMotivComponent(){
        try{
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
                                    style: "TableHeading",
                                    alignment: AlignmentType.CENTER,
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
            return "";}
        catch (e) {
            return new Paragraph("");
        }
    }

    createBusinessStrategies(){
        try{
        var bStrategies = bStrategiesContainer.find({owner:Meteor.userId()}).fetch();
        let rows=[];
        rows.push(new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        alignment: AlignmentType.CENTER,
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
                        alignment: AlignmentType.CENTER,
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createStrategicPlan(){
        try{
        let currentRow;
        let objectives = objectivesContainer.find({owner:Meteor.userId()}).fetch();
        let goals = goalsContainer.find({owner:Meteor.userId()}).fetch();
        let tacs = tacticsContainer.find({owner:Meteor.userId()}).fetch();
        let achinds = achIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
        let strats = strategiesContainer.find({owner:Meteor.userId()}).fetch();
        let goalsrows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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

        return [tableObj,tableGoals,tableStrats,tableTacs,tableAch];}
        catch (e) {
            return [new Paragraph(""),new Paragraph(""),new Paragraph(""),new Paragraph(""),new Paragraph("")];
        }

    }

    createTransfActions(){
        try{
        let currentRow;
        let actions = transfActionsContainer.find({owner:Meteor.userId()}).fetch();
        let rows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Nombre",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Costo",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Riesgo",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Modelo",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Artefacto",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];

        actions.map((val, index)=>{
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
                            text:val.artifact,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.model,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:""+val.cost,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:""+val.risk,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })]
                    }),
                ],
            });
            rows.push(currentRow);
        });

        let table = new Table({
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createProjectsPortfolio(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let projects = projectsContainer.find({owner:Meteor.userId()}).fetch();
        let currentActions=[];
        let actionsPars=[];
        projects.map((val, index)=>{
            actionsPars=[];
            currentActions=val.actions;
            currentActions.map((valA, indexA)=>{
                actionsPars.push(new Paragraph({
                    text:"- "+valA.customid+" "+valA.name+"\n",
                    style:"TableText"
                }))
            });
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Nombre",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.name,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.description,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Prioridad",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.priority,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Fecha límite",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.deadline,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Acciones de transformación",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:actionsPars,
                            }),
                        ]
                    }),
                ],
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
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createCapacitiesMap(){
        try{
        let currentRow;
        let childrenRow=[];
        let packs = packagesContainer.find({owner:Meteor.userId()}, {sort:{customid:1}}).fetch();
        let rows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"Paquete",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Subpaquete",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Capacidad",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Tipo",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        packs.map((val, index)=>{
            let firstOfPackage=true;
            let subpacks = subpackagesContainer.find({owner: Meteor.userId(), "customid": new RegExp(val.customid)}, {sort: {customid: 1}}).fetch();
            subpacks.map((valS,indexS)=>{
                let firstOfSubPack=true;
                let caps= capacitiesContainer.find({owner: Meteor.userId(), "customid": new RegExp(valS.customid)}, {sort: {customid: 1}}).fetch();
                caps.map((valC,indexC)=>{
                    let cellPack="";
                    let borderPack={top: {
                        style: BorderStyle.NONE,
                            size: 1,
                            color: "white",
                    },
                    bottom: {
                        style: BorderStyle.NONE,
                            size: 1,
                            color: "white",
                    }};
                    let borderSubPack={top: {
                            style: BorderStyle.NONE,
                            size: 1,
                            color: "white",
                        },
                        bottom: {
                            style: BorderStyle.NONE,
                            size: 1,
                            color: "white",
                        }};
                    let cellSubPack="";
                    if(firstOfPackage){
                        cellPack=val.customid+" "+val.name;
                        firstOfPackage=false;
                        borderPack={
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            }};
                    }
                    if(firstOfSubPack){
                        cellSubPack=valS.customid+" "+valS.name;
                        firstOfSubPack=false;
                        borderSubPack={
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            }};
                    }
                    if(indexC === caps.length-1)
                    {
                        borderSubPack={
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            }};
                    }
                    currentRow=new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({
                                    text:cellPack,
                                    style:"TableText",
                                    borders:borderPack
                                })]
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text:cellSubPack,
                                    style:"TableText",
                                    borders:borderSubPack
                                })]
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text:valC.customid+" "+valC.name,
                                    style:"TableText"
                                })]
                            }),
                            new TableCell({
                                children: [new Paragraph({
                                    text:valC.category,
                                    style:"TableText"
                                })]
                            }),
                        ],
                    });
                    rows.push(currentRow);
                })
            });

        });

        let table = new Table({
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createProcessCatalog(doc){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let images=this.state.procimagesids;
        let queryimages=ProcessesImages.collection.find({userId:Meteor.userId()}).fetch();
        let opInd = processesContainer.find({owner:Meteor.userId()}).fetch();
        let index=-1;
        let image;
        let currentActivities=[];
        let activitiesPars=[];
        opInd.map((val, index)=>{
            index=-1;
            image="";
            activitiesPars=[""];
            currentActivities=val.activities;
            currentActivities.map((valP, indexP)=>{
                activitiesPars.push(new Paragraph({
                    text:valP.customid+" "+valP.name+" - "+valP.capacitycustomid+" "+valP.capacityname+"\n",
                    style:"TableText"
                }))
            });
            if(typeof queryimages !== "undefined") {
                for (let i = 0; i < queryimages.length;i++){
                    if(queryimages[i]._id === val.imageid)
                        index=i;
                }
            }
            if(index > -1 && images.length>0) {
                image = Media.addImage(doc, images[index], 575, 250);
            }

            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Nombre",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.name,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Tipo de proceso",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.category,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Actividades del proceso",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:activitiesPars,
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Imagen del proceso",
                                    style:"TableHeading",
                                    alignment: AlignmentType.CENTER,
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                                columnSpan:2
                            })
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph(image)],
                                columnSpan:2
                            })
                        ]
                    }),
                ],
                width: {
                    size:100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 75,
                    bottom: 75,
                    right: 75,
                    left: 75,
                },
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createValueChain(){
        try{
        let supactivities;
        let rowChildren=[];
        let activitiespars=[];
        let supcategories=["Infraestructura","Recursos humanos","Tecnología","Compras"];
        let pcategories=["Logística de entrada","Operaciones","Logística de salida","Marketing","Servicios"];
        let rows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text: "Actividades de soporte",
                        style: "TableHeading"
                    })],
                    columnSpan:5,
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                    verticalAlign: VerticalAlign.CENTER
                }),
            ],
        }),
        ];
        for(let i=0;i<supcategories.length;i++)
        {
            activitiespars=[];
            supactivities = supActivitiesContainer.find({category:supcategories[i],owner:Meteor.userId()}).fetch();
            supactivities.map((valA, indexA)=>{
                activitiespars.push(new Paragraph({
                    text:"- "+valA.customid+" "+valA.name+"\n",
                    style:"TableText"
                }))
            });
            rows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text: supcategories[i],
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
                        children: activitiespars,
                        columnSpan:4,
                    }),
                ],
            }));
        }
        rows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text: "Actividades primarias",
                            style: "TableHeading"
                        })],
                        columnSpan:5,
                        shading: {
                            fill: "B3B4B5",
                            val: ShadingType.CLEAR,
                            color: "auto",
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                ],
            }),
        );
        rows.push(new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text: "Logística",
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
                            text: "Operaciones",
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
                            text: "Logística de salida",
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
                            text: "Marketing",
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
                            text: "Servicios",
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
            }),
        );
        for(let i=0;i<pcategories.length;i++)
        {
            activitiespars=[];
            supactivities = processesContainer.find({category:pcategories[i],owner:Meteor.userId()}).fetch();
            supactivities.map((valA, indexA)=>{
                activitiespars.push(new Paragraph({
                    text:"- "+valA.customid+" "+valA.name+"\n",
                    style:"TableText"
                }))
            });
            rowChildren.push(new TableCell({
                children: activitiespars
            }));
        }
        rows.push(new TableRow({
            children:rowChildren
        }));

        let table = new Table({
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createPositionCatalog(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let opInd = positionsContainer.find({owner:Meteor.userId()}).fetch();
        let currentCapacities=[];
        let capacitiesPars=[];
        let currentDeps=[];
        let depsPars=[];
        opInd.map((val, index)=>{
            depsPars=[""];
            capacitiesPars=[""];
            currentCapacities=val.capacities;
            currentDeps=val.dependents;
            currentCapacities.map((valP, indexP)=>{
                capacitiesPars.push(new Paragraph({
                    text:"- "+valP.customid+" "+valP.name+"\n",
                    style:"TableText"
                }))
            });
            currentDeps.map((valPr, indexPr)=>{
                depsPars.push(new Paragraph({
                    text:"- "+valPr.customid+" "+valPr.name+"\n",
                    style:"TableText"
                }))
            });
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Nombre",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.name,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Salario",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:Number(val.salary).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Número de empleados",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.number,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Capacidades implementadas",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:capacitiesPars,
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Cargos dependientes",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:depsPars,
                            }),
                        ]
                    }),
                ],
                width: {
                    size:100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 75,
                    bottom: 75,
                    right: 75,
                    left: 75,
                },
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createResourcesModel(){
        try{
        let resources = resourcesContainer.find({owner:Meteor.userId()}).fetch();
        let resRows=[];
        resRows.push(new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Nombre",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Costo mensual",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Servicios",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        }));
        let resourceServices;
        let resourceServicesPars=[];
        let merging;
        let currentRow;
        resources.map((val, index)=>{
            merging=1;
            resourceServicesPars=[];
            resourceServices = resServicesContainer.find({owner:Meteor.userId(),resourcecustomid:val.customid}).fetch();
            resourceServices.map((valint, indexint)=> {
                resourceServicesPars.push(new Paragraph({
                    text:"-"+valint.customid+" "+valint.name+"\n",
                    style:"TableText"}))
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.customid,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.name,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:val.description,
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text:Number(val.cost).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }),
                            style:"TableText",
                            alignment: AlignmentType.CENTER,
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: resourceServicesPars,
                        verticalAlign: VerticalAlign.CENTER,
                    })
                ],
            });
            resRows.push(currentRow);
        });

        const table = new Table({
            rows: resRows,
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createTIResourcesModel(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let opInd = tiResourcesContainer.find({owner:Meteor.userId()}).fetch();
        let currentServices=[];
        let servicesPars=[];
        let currentComps=[];
        let compsPars=[];
        opInd.map((val, index)=>{
            servicesPars=[""];
            compsPars=[""];
            currentServices=resServicesContainer.find({owner:Meteor.userId(),resourcecustomid:val.customid}).fetch();;
            currentComps=val.components;
            currentServices.map((valP, indexP)=>{
                servicesPars.push(new Paragraph({
                    text:"- "+valP.customid+" "+valP.name+"\n",
                    style:"TableText"
                }))
            });
            currentComps.map((valPr, indexPr)=>{
                compsPars.push(new Paragraph({
                    text:"- "+valPr+"\n",
                    style:"TableText"
                }))
            });
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"ID",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                }
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Nombre",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.name,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.description,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Costo mensual",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:Number(val.cost).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }),
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Servicios",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:servicesPars,
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Componentes tecnológicos",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:compsPars,
                            }),
                        ]
                    }),
                ],
                width: {
                    size:100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 75,
                    bottom: 75,
                    right: 75,
                    left: 75,
                },
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createComponentsCatalog(){
        try{
        let currentRow;
        let actions = componentsContainer.find({owner:Meteor.userId()}).fetch();
        let rows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"ID",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Nombre",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
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
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        actions.map((val, index)=>{
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
                ],
            });
            rows.push(currentRow);
        });

        let table = new Table({
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createAppCatalog(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let apps = applicationsContainer.find({owner:Meteor.userId()}).fetch();
        let currentCapacities=[];
        let capsPars=[];
        let currentComps=[];
        let compsPars=[];
        apps.map((val, index)=>{
            compsPars=[];
            capsPars=[];
            currentCapacities=val.capacities;
            currentComps=val.components;
            currentCapacities.map((valCa, indexCa)=>{
                capsPars.push(new Paragraph({
                    text:"- "+valCa.customid+" "+valCa.name+"\n",
                    style:"TableText"
                }))
            });
            currentComps.map((valC, indexC)=>{
                compsPars.push(new Paragraph({
                    text:"- "+valC.customid+" "+valC.name+"\n",
                    style:"TableText"
                }))
            });
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Nombre",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.name,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Costo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:Number(val.cost).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Capacidades implementadas",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:capsPars,
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Componentes tecnológicos relacionados",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:compsPars,
                            }),
                        ]
                    }),
                ],
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
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createOperativeModel(){
        try{
        let currentRow;
        let currentPositions=[];
        let positionsPars=[];
        let currentRes=[];
        let resPars=[];
        let opitems = opItemsContainer.find({owner:Meteor.userId()}, {sort: {capacitycustomid: 1}}).fetch();
        let rows=[new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        text:"Capacidad",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Cargos",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
                new TableCell({
                    children: [new Paragraph({
                        text:"Recursos",
                        style:"TableHeading",
                        alignment: AlignmentType.CENTER,
                    })],
                    shading: {
                        fill: "B3B4B5",
                        val: ShadingType.CLEAR,
                        color: "auto",
                    },
                }),
            ],
        })];
        opitems.map((val, index)=>{
            currentPositions=[];
            positionsPars=[];
            currentRes=[];
            resPars=[];
            currentPositions=val.positions;
            currentPositions.map((valP, indexP)=>{
                positionsPars.push(new Paragraph({
                    text:"- "+valP.customid+"\n",
                    style:"TableText"
                }))
            });
            currentRes=val.resources;
            currentRes.map((valP, indexP)=>{
                resPars.push(new Paragraph({
                    text:"- "+valP.customid+"\n",
                    style:"TableText"
                }))
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text:val.capacitycustomid+" "+val.capacityname,
                            style:"TableText"
                        })]
                    }),
                    new TableCell({
                        children: positionsPars
                    }),
                    new TableCell({
                        children: resPars
                    }),
                ],
            });
            rows.push(currentRow);
        });

        let table = new Table({
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
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createOperativeIndicators(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let opInd = opIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
        let currentPositions=[];
        let positionsPars=[];
        let currentProcs=[];
        let procsPars=[];
        opInd.map((val, index)=>{
            positionsPars=[""];
            procsPars=[""];
            currentPositions=val.positions;
            currentProcs=val.processes;
            currentPositions.map((valP, indexP)=>{
                positionsPars.push(new Paragraph({
                    text:"- "+valP.customid+" "+valP.name+"\n",
                    style:"TableText"
                }))
            });
            currentProcs.map((valPr, indexPr)=>{
                procsPars.push(new Paragraph({
                    text:"- "+valPr.customid+" "+valPr.name+"\n",
                    style:"TableText"
                }))
            });
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.description,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Forma de cálculo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.calculation,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Frecuencia de cálculo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.calcfrequency,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Dimensiones",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.dimensions,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Cargos responsables",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:positionsPars,
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Procesos asociados",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:procsPars,
                            }),
                        ]
                    }),
                ],
                width: {
                    size:100,
                    type: WidthType.PERCENTAGE,
                },
                margins: {
                    top: 75,
                    bottom: 75,
                    right: 75,
                    left: 75,
                },
            });
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createStrategicIndicators(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let opInd = stIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
        opInd.map((val, index)=>{
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.description,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Forma de cálculo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.calculation,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Frecuencia de cálculo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.calcfrequency,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Dimensiones",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.dimensions,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Asociado a",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.type,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"ID asociada",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.associatedId,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                ],
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
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],

            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
    }

    createExternalIndicators(){
        try{
        let currentTable;
        let currentRow;
        let rows=[];
        let opInd = exIndicatorsContainer.find({owner:Meteor.userId()}).fetch();
        opInd.map((val, index)=>{
            currentTable = new Table({
                rows: [
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.customid,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
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
                                children:[new Paragraph({
                                    text:val.description,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Forma de cálculo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.calculation,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Frecuencia de cálculo",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.calcfrequency,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Dimensiones",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.dimensions,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                    new TableRow({
                        children:[
                            new TableCell({
                                children:[new Paragraph({
                                    text:"Categoría",
                                    style:"TableHeading"
                                })],
                                shading: {
                                    fill: "B3B4B5",
                                    val: ShadingType.CLEAR,
                                    color: "auto",
                                },
                            }),
                            new TableCell({
                                children:[new Paragraph({
                                    text:val.category,
                                    style:"TableText"
                                })],
                            }),
                        ]
                    }),
                ],
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
            currentRow=new TableRow({
                children: [
                    new TableCell({
                        children: [currentTable],
                        borders: {
                            top: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            bottom: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            left: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                            right: {
                                style: BorderStyle.NONE,
                                size: 1,
                                color: "white",
                            },
                        },
                    })
                ],
            });
            rows.push(currentRow);
        });
        let table = new Table({
            rows: rows,
            width: {
                size:100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: 75,
                bottom: 75,
                right: 75,
                left: 75,
            },
        });
        return table;}
        catch (e) {
            return new Paragraph("");
        }
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
                <PrivateLoggedHeader/>
            <div style={{"background-color":"#E1E8F0","height":"100vh"}}>
                <div className="row">
                    <div className="input-field col s4">
                    <h4 style={{"marginLeft":"20px"}}>Documento entregable:</h4>
                    </div>
                </div>
                <div className="row">
                { this.state.loaded && cursor !== "" &&
                <div className="input-field col s4">
                    <a className="waves-effect waves-light btn red" onClick={this.removeFinalDocument.bind(this)} style={{"marginLeft":"20px"}}><i className="material-icons left">delete</i>Borrar</a>
                    <a className="waves-effect waves-light btn" href={cursor} download={true} style={{"marginLeft":"20px"}}><i className="material-icons left">file_download</i>Descargar</a>
                </div>
                }
                { this.state.loaded && cursor === "" &&
                <div className="input-field col s4">
                    <a className="waves-effect waves-light btn light-green" onClick={this.createDoc.bind(this)}
                       style={{"marginLeft":"20px"}}><i className="material-icons left">library_add</i>Crear documento</a>
                </div>
                }
                { !this.state.loaded  &&
                <div className="input-field col s4">
                    <h4 style={{"marginLeft":"20px"}}>Cargando...</h4>
                </div>
                }
                    <div className="input-field col s4">
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
