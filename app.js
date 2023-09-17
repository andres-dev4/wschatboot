const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowSecundario = addKeyword(['2', 'siguiente'])
.addAnswer(['🤩 🤗'])
.addAnswer([' Muchas gracias, me comunicare  con  usted tan pronto como  pueda'])
const flowSecundarioRegistrar  = addKeyword(['si'])
.addAnswer(
    [' 🤗 Por favor apoyame  con tus  datos 📎',
    ' Numero de telefono',
    ' Nombre completo',
    ' Curso en el  que  te  encuentres interesado',
    '😃 😃'
    ],
    {
        capture:true
    },
    async(ctx,{endflow,gotoFlow}) =>{
        if(ctx.body != "" || ctx.body != null){
            gotoFlow(flowSecundario)
        }
    }
    )
const flowinformatica = addKeyword(['informatica', 'infor']).addAnswer(
    [
        '🙌 Aquí encontras nuesta lista de cursos  de informatica',
        'https://capacitaciondigital.mx/capdigmx2021/cursos_presenciales/',
        '\n*2* Para siguiente paso.',
        '\n*si* Para solicitar inscripción al curso.',
    ],
    null,
    null,
    [flowSecundario,flowSecundarioRegistrar]
)

const flowCocina = addKeyword(['cocin', 'pasteles']).addAnswer(
    [
        '🚀 Aqui encontraras nuestra lista de cursos de cocina',
        '[*Proximos Cursos*]',
        'https://www.cursosdecocina.com.mx/index.php?proximoscursos',
        '[*Cursos Personalizados*]',
        'https://www.cursosdecocina.com.mx/index.php?cursospersonalizados',
        '\n*2* Para siguiente paso.',
        '\n*si* Para solicitar inscripción al curso.',
    ],
    null,
    null,
    [flowSecundario,flowSecundarioRegistrar]
)



const flowPrincipal = addKeyword(['hola', 'ole', 'alo','buenas','onda'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot* de Capacitación digital MX')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto 🤗',
            '👉 *Informatica* para saber sobre nuestros cursos',
            '👉 *Pasteles*  para saber sobre nuestros cursos',
        ],
        null,
        null,
        [flowinformatica, flowCocina]
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
