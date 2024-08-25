import {
    CircleStackIcon as OutlineCircleStackIcon,
    PresentationChartLineIcon as OutlinePresentationChartLineIcon,
    DocumentCheckIcon as OutlineDocumentCheckIcon,
    IdentificationIcon as OutlineIdentificationIcon,
    UsersIcon as OutlineUsersIcon,
    ArchiveBoxIcon as OutlineArchiveBoxIcon,
    OfficeBuildingIcon as OutlineOfficeBuildingIcon,
    UserGroupIcon as OutlineUserGroupIcon,
    CheckCircleIcon as OutlineCheckCircleIcon,
    DocumentTextIcon as OutlineDocumentTextIcon
} from '@heroicons/react/24/outline';
import {

    ArchiveBoxIcon,
    OfficeBuildingIcon,
    UserGroupIcon,
    CheckCircleIcon,
    DocumentTextIcon, MoonIcon, SunIcon, WindowIcon, CircleStackIcon, IdentificationIcon, DocumentCheckIcon, PresentationChartLineIcon, NumberedListIcon, AdjustmentsHorizontalIcon, ChartBarIcon, CalendarDaysIcon, UsersIcon
} from '@heroicons/react/24/solid';



const refunds = [
    {
      "whatsapp": "+1234567810",
      "numeroPrestamo": "LN021",
      "idSubFactura": "INV021",
      "tipoOrden": "Personal",
      "periodo": "2024-09",
      "estado": "no pagado",
      "nombreCliente": "Alice Walker",
      "etiquetaTarjetaCredito": "Visa",
      "numeroMovil": "+0987654341",
      "nuevoCliente": true,
      "montoReembolsable": 180.00,
      "montoPagado": 90.00,
      "notaRegistro": "Pendiente de revisión",
      "nombreProducto": "BEC",
      "fechaReembolso": "2024-09-20",
      "diasAtraso": 5,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-09-01",
      "fechaProcesoCaso": "2024-09-05",
      "nombreEmpresa": "ElectroGoods",
      "nombreUsuarioCobranza": "alice.w",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567811",
      "numeroPrestamo": "LN022",
      "idSubFactura": "INV022",
      "tipoOrden": "Auto",
      "periodo": "2024-10",
      "estado": "pagado",
      "nombreCliente": "Brian Lee",
      "etiquetaTarjetaCredito": "MasterCard",
      "numeroMovil": "+0987654342",
      "nuevoCliente": false,
      "montoReembolsable": 220.00,
      "montoPagado": 220.00,
      "notaRegistro": "Reembolso completado",
      "nombreProducto": "SPF",
      "fechaReembolso": "2024-10-15",
      "diasAtraso": 2,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-10-01",
      "fechaProcesoCaso": "2024-10-05",
      "nombreEmpresa": "Auto Hub",
      "nombreUsuarioCobranza": "brian.l",
      "accion": "Aprobar"
    },
    {
      "whatsapp": "+1234567812",
      "numeroPrestamo": "LN023",
      "idSubFactura": "INV023",
      "tipoOrden": "Hogar",
      "periodo": "2024-11",
      "estado": "no pagado",
      "nombreCliente": "Catherine Green",
      "etiquetaTarjetaCredito": "American Express",
      "numeroMovil": "+0987654343",
      "nuevoCliente": true,
      "montoReembolsable": 200.00,
      "montoPagado": 100.00,
      "notaRegistro": "Rechazado debido a discrepancias",
      "nombreProducto": "CRI",
      "fechaReembolso": "2024-11-10",
      "diasAtraso": 7,
      "fechaCancelacion": "2024-11-15",
      "fechaCreacionTarea": "2024-11-01",
      "fechaProcesoCaso": "2024-11-05",
      "nombreEmpresa": "Home Essentials",
      "nombreUsuarioCobranza": "catherine.g",
      "accion": "Rechazar"
    },
    {
      "whatsapp": "+1234567813",
      "numeroPrestamo": "LN024",
      "idSubFactura": "INV024",
      "tipoOrden": "Educación",
      "periodo": "2024-12",
      "estado": "no pagado",
      "nombreCliente": "David King",
      "etiquetaTarjetaCredito": "Discover",
      "numeroMovil": "+0987654344",
      "nuevoCliente": false,
      "montoReembolsable": 140.00,
      "montoPagado": 70.00,
      "notaRegistro": "Esperando confirmación",
      "nombreProducto": "DNP",
      "fechaReembolso": "2024-12-20",
      "diasAtraso": 3,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-12-01",
      "fechaProcesoCaso": "2024-12-05",
      "nombreEmpresa": "E-Books Inc.",
      "nombreUsuarioCobranza": "david.k",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567814",
      "numeroPrestamo": "LN025",
      "idSubFactura": "INV025",
      "tipoOrden": "Personal",
      "periodo": "2024-01",
      "estado": "pagado",
      "nombreCliente": "Emma Wright",
      "etiquetaTarjetaCredito": "Visa",
      "numeroMovil": "+0987654345",
      "nuevoCliente": true,
      "montoReembolsable": 250.00,
      "montoPagado": 250.00,
      "notaRegistro": "Reembolso emitido",
      "nombreProducto": "SPCA",
      "fechaReembolso": "2024-01-25",
      "diasAtraso": 1,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-01-01",
      "fechaProcesoCaso": "2024-01-05",
      "nombreEmpresa": "Tech World",
      "nombreUsuarioCobranza": "emma.w",
      "accion": "Aprobar"
    },
    {
      "whatsapp": "+1234567815",
      "numeroPrestamo": "LN026",
      "idSubFactura": "INV026",
      "tipoOrden": "Auto",
      "periodo": "2024-02",
      "estado": "no pagado",
      "nombreCliente": "Frank Harris",
      "etiquetaTarjetaCredito": "MasterCard",
      "numeroMovil": "+0987654346",
      "nuevoCliente": false,
      "montoReembolsable": 170.00,
      "montoPagado": 85.00,
      "notaRegistro": "Rechazado por problemas de política",
      "nombreProducto": "EFIN",
      "fechaReembolso": "2024-02-20",
      "diasAtraso": 4,
      "fechaCancelacion": "2024-02-25",
      "fechaCreacionTarea": "2024-02-01",
      "fechaProcesoCaso": "2024-02-05",
      "nombreEmpresa": "Vehicle World",
      "nombreUsuarioCobranza": "frank.h",
      "accion": "Rechazar"
    },
    {
      "whatsapp": "+1234567816",
      "numeroPrestamo": "LN027",
      "idSubFactura": "INV027",
      "tipoOrden": "Hogar",
      "periodo": "2024-03",
      "estado": "no pagado",
      "nombreCliente": "Grace Adams",
      "etiquetaTarjetaCredito": "American Express",
      "numeroMovil": "+0987654347",
      "nuevoCliente": true,
      "montoReembolsable": 190.00,
      "montoPagado": 95.00,
      "notaRegistro": "Procesando reembolso",
      "nombreProducto": "CESE",
      "fechaReembolso": "2024-03-15",
      "diasAtraso": 2,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-03-01",
      "fechaProcesoCaso": "2024-03-05",
      "nombreEmpresa": "Home Goods",
      "nombreUsuarioCobranza": "grace.a",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567817",
      "numeroPrestamo": "LN028",
      "idSubFactura": "INV028",
      "tipoOrden": "Educación",
      "periodo": "2024-04",
      "estado": "pagado",
      "nombreCliente": "Henry Scott",
      "etiquetaTarjetaCredito": "Discover",
      "numeroMovil": "+0987654348",
      "nuevoCliente": false,
      "montoReembolsable": 230.00,
      "montoPagado": 230.00,
      "notaRegistro": "Reembolso completado",
      "nombreProducto": "SPCR",
      "fechaReembolso": "2024-04-10",
      "diasAtraso": 0,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-04-01",
      "fechaProcesoCaso": "2024-04-05",
      "nombreEmpresa": "Certify Co.",
      "nombreUsuarioCobranza": "henry.s",
      "accion": "Aprobar"
    },
    {
      "whatsapp": "+1234567818",
      "numeroPrestamo": "LN029",
      "idSubFactura": "INV029",
      "tipoOrden": "Personal",
      "periodo": "2024-05",
      "estado": "no pagado",
      "nombreCliente": "Irene Johnson",
      "etiquetaTarjetaCredito": "Visa",
      "numeroMovil": "+0987654349",
      "nuevoCliente": true,
      "montoReembolsable": 210.00,
      "montoPagado": 105.00,
      "notaRegistro": "Reembolso pendiente",
      "nombreProducto": "CLPA",
      "fechaReembolso": "2024-05-15",
      "diasAtraso": 6,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-05-01",
      "fechaProcesoCaso": "2024-05-05",
      "nombreEmpresa": "Retail Co.",
      "nombreUsuarioCobranza": "irene.j",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567819",
      "numeroPrestamo": "LN030",
      "idSubFactura": "INV030",
      "tipoOrden": "Auto",
      "periodo": "2024-06",
      "estado": "pagado",
      "nombreCliente": "John Doe",
      "etiquetaTarjetaCredito": "MasterCard",
      "numeroMovil": "+0987654350",
      "nuevoCliente": false,
      "montoReembolsable": 260.00,
      "montoPagado": 260.00,
      "notaRegistro": "Reembolso completo",
      "nombreProducto": "MSFN",
      "fechaReembolso": "2024-06-20",
      "diasAtraso": 1,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-06-01",
      "fechaProcesoCaso": "2024-06-05",
      "nombreEmpresa": "Auto Experts",
      "nombreUsuarioCobranza": "john.d",
      "accion": "Aprobar"
    },
    {
      "whatsapp": "+1234567820",
      "numeroPrestamo": "LN031",
      "idSubFactura": "INV031",
      "tipoOrden": "Hogar",
      "periodo": "2024-07",
      "estado": "no pagado",
      "nombreCliente": "Karen Moore",
      "etiquetaTarjetaCredito": "American Express",
      "numeroMovil": "+0987654351",
      "nuevoCliente": true,
      "montoReembolsable": 175.00,
      "montoPagado": 87.50,
      "notaRegistro": "Pendiente de resolución",
      "nombreProducto": "FNIN",
      "fechaReembolso": "2024-07-15",
      "diasAtraso": 3,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-07-01",
      "fechaProcesoCaso": "2024-07-05",
      "nombreEmpresa": "Home Supplies",
      "nombreUsuarioCobranza": "karen.m",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567821",
      "numeroPrestamo": "LN032",
      "idSubFactura": "INV032",
      "tipoOrden": "Educación",
      "periodo": "2024-08",
      "estado": "pagado",
      "nombreCliente": "Louis Collins",
      "etiquetaTarjetaCredito": "Discover",
      "numeroMovil": "+0987654352",
      "nuevoCliente": false,
      "montoReembolsable": 195.00,
      "montoPagado": 195.00,
      "notaRegistro": "Reembolso procesado",
      "nombreProducto": "MSLO",
      "fechaReembolso": "2024-08-10",
      "diasAtraso": 0,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-08-01",
      "fechaProcesoCaso": "2024-08-05",
      "nombreEmpresa": "Study Corp.",
      "nombreUsuarioCobranza": "louis.c",
      "accion": "Aprobar"
    },
    {
      "whatsapp": "+1234567822",
      "numeroPrestamo": "LN033",
      "idSubFactura": "INV033",
      "tipoOrden": "Personal",
      "periodo": "2024-09",
      "estado": "no pagado",
      "nombreCliente": "Mona Evans",
      "etiquetaTarjetaCredito": "Visa",
      "numeroMovil": "+0987654353",
      "nuevoCliente": true,
      "montoReembolsable": 220.00,
      "montoPagado": 110.00,
      "notaRegistro": "Pendiente de aprobación",
      "nombreProducto": "GOCE",
      "fechaReembolso": "2024-09-25",
      "diasAtraso": 4,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-09-01",
      "fechaProcesoCaso": "2024-09-05",
      "nombreEmpresa": "Goods Center",
      "nombreUsuarioCobranza": "mona.e",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567823",
      "numeroPrestamo": "LN034",
      "idSubFactura": "INV034",
      "tipoOrden": "Auto",
      "periodo": "2024-10",
      "estado": "pagado",
      "nombreCliente": "Nina Foster",
      "etiquetaTarjetaCredito": "MasterCard",
      "numeroMovil": "+0987654354",
      "nuevoCliente": false,
      "montoReembolsable": 240.00,
      "montoPagado": 240.00,
      "notaRegistro": "Reembolso completado",
      "nombreProducto": "CLPA",
      "fechaReembolso": "2024-10-20",
      "diasAtraso": 2,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-10-01",
      "fechaProcesoCaso": "2024-10-05",
      "nombreEmpresa": "Car Solutions",
      "nombreUsuarioCobranza": "nina.f",
      "accion": "Aprobar"
    },
    {
      "whatsapp": "+1234567824",
      "numeroPrestamo": "LN035",
      "idSubFactura": "INV035",
      "tipoOrden": "Hogar",
      "periodo": "2024-11",
      "estado": "no pagado",
      "nombreCliente": "Oliver Harris",
      "etiquetaTarjetaCredito": "American Express",
      "numeroMovil": "+0987654355",
      "nuevoCliente": true,
      "montoReembolsable": 185.00,
      "montoPagado": 92.50,
      "notaRegistro": "Reembolso pendiente",
      "nombreProducto": "SPCR",
      "fechaReembolso": "2024-11-15",
      "diasAtraso": 5,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-11-01",
      "fechaProcesoCaso": "2024-11-05",
      "nombreEmpresa": "House Goods",
      "nombreUsuarioCobranza": "oliver.h",
      "accion": "Procesar"
    },
    {
      "whatsapp": "+1234567825",
      "numeroPrestamo": "LN036",
      "idSubFactura": "INV036",
      "tipoOrden": "Educación",
      "periodo": "2024-12",
      "estado": "pagado",
      "nombreCliente": "Paula Lee",
      "etiquetaTarjetaCredito": "Discover",
      "numeroMovil": "+0987654356",
      "nuevoCliente": false,
      "montoReembolsable": 255.00,
      "montoPagado": 255.00,
      "notaRegistro": "Reembolso completo",
      "nombreProducto": "SPCA",
      "fechaReembolso": "2024-12-10",
      "diasAtraso": 1,
      "fechaCancelacion": "N/A",
      "fechaCreacionTarea": "2024-12-01",
      "fechaProcesoCaso": "2024-12-05",
      "nombreEmpresa": "Learning Hub",
      "nombreUsuarioCobranza": "paula.l",
      "accion": "Aprobar"
    }
  ]









const menuArray = [
    {
        icon: <CircleStackIcon className="h-6 w-6" />,
        hash: 'coleccion',
        title: "Colección de casos",
        options: [
            { subtitle: "Casos de Cobranza", icon: <NumberedListIcon className="h-5 w-5" /> },
            { subtitle: "Distribución de casos", icon: <AdjustmentsHorizontalIcon className="h-5 w-5" /> },
            { subtitle: "Incurrir en una estación de trabajo", icon: <OutlineUsersIcon className="h-5 w-5" /> },
            { subtitle: "Flujo de Clientes", icon: <OutlineUserGroupIcon className="h-5 w-5" /> },
            { subtitle: "Gestión de cuentas de Colección", icon: <OutlineCheckCircleIcon className="h-5 w-5" /> },
            { subtitle: "Registro de SMS", icon: <OutlineDocumentTextIcon className="h-5 w-5" /> }
        ],
        length: 'h-[245px]'
    },
    {
        icon: <PresentationChartLineIcon className="h-6 w-6" />,
        hash: 'auditoria',
        title: "Auditoría y control de calidad",
        options: [
            { subtitle: "Registro Histórico", icon: <OutlineDocumentCheckIcon className="h-5 w-5" /> },
            { subtitle: "Monitoreo de Transacciones", icon: <OutlinePresentationChartLineIcon className="h-5 w-5" /> },
            { subtitle: "Control de Cumplimiento", icon: <OutlineCheckCircleIcon className="h-5 w-5" /> },
            { subtitle: "Auditoria Periódica", icon: <OutlineDocumentCheckIcon className="h-5 w-5" /> },
            { subtitle: "Detección de Fraudes", icon: <OutlinePresentationChartLineIcon className="h-5 w-5" /> },
            { subtitle: "Atención al Cliente", icon: <OutlineUsersIcon className="h-5 w-5" /> }
        ],
        length: 'h-[230px] overflow-auto'
    },
    {
        icon: <DocumentCheckIcon className="h-6 w-6" />,
        hash: '#Verificacion',
        title: "Verificación de Créditos",
        options: [
            { subtitle: "Recolección y Validación de Datos", icon: <OutlineDocumentTextIcon className="h-5 w-5" /> },
            { subtitle: "Lista final", icon: <OutlineDocumentCheckIcon className="h-5 w-5" /> }
        ],
        length: 'h-[100px]'
    },
    {
        icon: <IdentificationIcon className="h-6 w-6" />,
        hash: '#',
        title: "Usuario de Cobranza",
        options: [],
        length: 'h-[0px]'
    }
];

const filtro_1 = [
    'Todo',
    'BEC',
    'PRF',
    'CRI',
    'DNP',
    'SPF',
    'SPCA',
    'EFIN',
    'CESE',
    'SPCR',
    'GOCE',
    'CLPA',
    'MSFN',
    'FNIN',
    'MSLO']
const rangesArray = [
    'D1(-1,-1)',
    'D2(-2,-2)',
    'D0(0,0)',
    'S1(1,7)',
    'S2(8,15)',
    'S3(16,30)',
    'S4(31,60)',
    'S5(61,999)'
];
const cobrador = [
    'Elige por favor',
    'Por asignar',
    'Mine',
];
const filterCliente = [
    'Por favor elige',
    'Cliente nuevo',
    'Cliente antiguo']

const factura = [
    'No', 'Si', 'Todo'
]

const Jumlah = [
    'Por favor elige',
    '1',
    '2'
]

const estadoRembolso = [
    'Por favor elige',
    'Pagado',
    'No pagado'

]

const estado = ['En verficación', 'Transfiriendo', 'Exitoso', 'Rechazado']



export { refunds,
 estado,menuArray,
    filtro_1, rangesArray,cobrador, filterCliente, factura, Jumlah, estadoRembolso
}






