const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flownota = addKeyword(['nota','dejar'])
.addAnswer([
    'A continuación escriba por favor la nota que desea dejar..',
],{capture:true})
.addAnswer('Muchas gracias, Devolveremos el mensaje tan pronto sea posible...')

const flowAgenda =  addKeyword(['agenda','agendar','Agendar','cita'])
.addAnswer('A continuación comenzamos con la agenda de su cita')
.addAnswer('¿Cual es el nombre del paciente?',{capture:true})
.addAnswer('¿En donde se encuentra? \n Villahermosa o Macuspna',{capture:true})
.addAnswer('¿Cual es el motivo de su cita? \n Dolor de muela, Extracción , Tratamiento de Brackets etc..',{capture:true})
.addAnswer('🖇️ Perfecto muchas gracias por su confianza, nos comunicaremos con usted lo antes posible para confirmar su cita... 📅')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo','buenas','onda'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot* Dr.Ezpino! de su consultorio dental 🪥 🦷')
    .addAnswer([
        'Ofrecemos tratamientos de ortodoncia,',
        'extracciones y limpiezas dentales en dos ubicaciones',
        '*Macuspana* (viernes y sábado) y *Villahermosa* (resto de la semana).'
    ])
    .addAnswer(
        [
            'te comparto las siguientes opciones 🤗',
            '👉 *nota* para dejar alguna nota a nuestro amigo Ezpino',
            '👉 *Agendar*  para solicitar una cita',
            '✍️ Por favor escribe alguna  de ellas ✍️'
        ],
        null,
        null,
        [flownota, flowAgenda]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
