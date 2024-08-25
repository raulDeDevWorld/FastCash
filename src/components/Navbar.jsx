'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import Modal from '@/components/Modal'
import { Arrow_Select } from '@/icons_SVG'
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
    DocumentTextIcon as OutlineDocumentTextIcon,
    ChatIcon 
} from '@heroicons/react/24/outline';
import {

    ArchiveBoxIcon,
    OfficeBuildingIcon,
    UserGroupIcon,
    CheckCircleIcon,
    DocumentTextIcon, MoonIcon, SunIcon, WindowIcon, CircleStackIcon, IdentificationIcon, DocumentCheckIcon, PresentationChartLineIcon, NumberedListIcon, AdjustmentsHorizontalIcon, ChartBarIcon, CalendarDaysIcon, UsersIcon
} from '@heroicons/react/24/solid';
import {menuArray} from '@/constants'
export default function BottomNavigation({ rol }) {
    const { user, userDB, modal, setModal, subItemNav, setSubItemNav, setUserProfile, businessData, setUserData, setUserProduct, setRecetaDB, setUserCart, setUserDistributorPDB, filter, setFilter, nav, setNav } = useAppContext()

    const router = useRouter()
    const [focus, setFocus] = useState('')

    const redirectHandler = (ref) => {
        router.push(ref)
    }

    const signOutHandler = () => {
        setModal('SignOut')
    }

    const redirectHandlerWindow = () => {
        window.open(`https://api.whatsapp.com/send?phone=${businessData.whatsapp.replaceAll(' ', '')}&text=hola%20necesito%20un%20implante%20de%20osteosintesis%20¿Pueden%20ayudarme?%20`, '_blank')
        setNav(false)
        // setWhatsapp(!whatsapp)
    }

    const Header = () => {
        return <li className="flex flex-col justify-center items-center px-[10px] py-5 border-b border-gray-[1px]  w-full">
            <img src="/logo.png" className='h-[70px] border-white border-[1px]' alt="" />
            <h1 className='16px font-medium text-center text-white py-[10px]'></h1>
            <h3 className='text-white text-center'>Bienvenido </h3>
            <h3 className='text-white text-center'>Super Administrador</h3>
        </li>
    }




    //     {
    //         icon: () => <CircleStackIcon className="h-6 w-6" />,
    //         hash: 'coleccion',
    //         title: "Colección de casos",
    //         options: [
    //             { subtitle: "Casos de Cobranza", icon: <NumberedListIcon className="h-5 w-5" /> },
    //             { subtitle: "Distribución de casos", icon: <AdjustmentsHorizontalIcon className="h-5 w-5" /> },
    //             { subtitle: "Incurrir en una estación de trabajo", icon: <ChartBarIcon className="h-5 w-5" /> },
    //             { subtitle: "Flujo de Clientes", icon: <CalendarDaysIcon className="h-5 w-5" /> },
    //             { subtitle: "Gestión de cuentas de Colección", icon: <UsersIcon className="h-5 w-5" /> },
    //             { subtitle: "Registro de SMS", icon: <CircleStackIcon className="h-5 w-5" /> }
    //         ],
    //         length: 'h-[210px]'
    //     },
    //     {
    //         icon: () => <PresentationChartLineIcon className="h-6 w-6" />,
    //         hash: 'auditoria',
    //         title: "Auditoría y control de calidad",
    //         options: [
    //             { subtitle: "Registro Histórico", icon: <DocumentCheckIcon className="h-5 w-5" /> },
    //             { subtitle: "Monitoreo de Transacciones", icon: <PresentationChartLineIcon className="h-5 w-5" /> },
    //             { subtitle: "Control de Cumplimiento", icon: <CheckCircleIcon className="h-5 w-5" /> },
    //             { subtitle: "Auditoria Periódica", icon: <DocumentCheckIcon className="h-5 w-5" /> },
    //             { subtitle: "Detección de Fraudes", icon: <PresentationChartLineIcon className="h-5 w-5" /> },
    //             { subtitle: "Atención al Cliente", icon: <UsersIcon className="h-5 w-5" /> }
    //         ],
    //         length: 'h-[210px] overflow-auto'
    //     },
    //     {
    //         icon: () => <DocumentCheckIcon className="h-6 w-6" />,
    //         hash: '#Verificacion',
    //         title: "Verificación de Créditos",
    //         options: [
    //             { subtitle: "Recolección y Validación de Datos", icon: <DocumentCheckIcon className="h-5 w-5" /> },
    //             { subtitle: "Lista final", icon: <DocumentCheckIcon className="h-5 w-5" /> }
    //         ],
    //         length: 'h-[70px]'
    //     },
    //     {
    //         icon: () => <IdentificationIcon className="h-6 w-6" />,
    //         hash: '#',
    //         title: "Usuario de Cobranza",
    //         options: [],
    //         length: 'h-[0px]'
    //     }
    // ];

    // const menuArray = [
    //     {
    //         icon: <CircleStackIcon className="h-6 w-6" />,
    //         hash: 'coleccion',
    //         title: "Colección de casos",
    //         options: [
    //             { subtitle: "Casos de Cobranza", icon: <NumberedListIcon className="h-5 w-5" /> },
    //             { subtitle: "Distribución de casos", icon: <AdjustmentsHorizontalIcon className="h-5 w-5" /> },
    //             { subtitle: "Incurrir en una estación de trabajo", icon: <OutlineUsersIcon className="h-5 w-5" /> },
    //             { subtitle: "Flujo de Clientes", icon: <OutlineUserGroupIcon className="h-5 w-5" /> },
    //             { subtitle: "Gestión de cuentas de Colección", icon: <OutlineCheckCircleIcon className="h-5 w-5" /> },
    //             { subtitle: "Registro de SMS", icon: <OutlineDocumentTextIcon className="h-5 w-5" /> }
    //         ],
    //         length: 'h-[245px]'
    //     },
    //     {
    //         icon: <PresentationChartLineIcon className="h-6 w-6" />,
    //         hash: 'auditoria',
    //         title: "Auditoría y control de calidad",
    //         options: [
    //             { subtitle: "Registro Histórico", icon: <OutlineDocumentCheckIcon className="h-5 w-5" /> },
    //             { subtitle: "Monitoreo de Transacciones", icon: <OutlinePresentationChartLineIcon className="h-5 w-5" /> },
    //             { subtitle: "Control de Cumplimiento", icon: <OutlineCheckCircleIcon className="h-5 w-5" /> },
    //             { subtitle: "Auditoria Periódica", icon: <OutlineDocumentCheckIcon className="h-5 w-5" /> },
    //             { subtitle: "Detección de Fraudes", icon: <OutlinePresentationChartLineIcon className="h-5 w-5" /> },
    //             { subtitle: "Atención al Cliente", icon: <OutlineUsersIcon className="h-5 w-5" /> }
    //         ],
    //         length: 'h-[230px] overflow-auto'
    //     },
    //     {
    //         icon: <DocumentCheckIcon className="h-6 w-6" />,
    //         hash: '#Verificacion',
    //         title: "Verificación de Créditos",
    //         options: [
    //             { subtitle: "Recolección y Validación de Datos", icon: <OutlineDocumentTextIcon className="h-5 w-5" /> },
    //             { subtitle: "Lista final", icon: <OutlineDocumentCheckIcon className="h-5 w-5" /> }
    //         ],
    //         length: 'h-[100px]'
    //     },
    //     {
    //         icon: <IdentificationIcon className="h-6 w-6" />,
    //         hash: '#',
    //         title: "Usuario de Cobranza",
    //         options: [],
    //         length: 'h-[0px]'
    //     }
    // ];

    switch (rol) {
        case 'SuperAdmin':
            return <ul className="space-y-3 text-[16px] flex flex-col  items-center text-gray-600 font-medium">
                <Header />
                {
                    menuArray.map((item, index) => {
                        const Icon = item.icon
                        console.log(Icon)
                        return <>
                            <button
                                type="button"
                                className="relative inline-flex justify-between w-[90%] rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-gray-100 text-[12px]  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => focus === item.title ? setFocus('') : setFocus(item.title)}
                            >
                                <span className='flex items-center w-full space-x-1.5'>
                                    {item.icon}
                                    <span className=''>
                                        {item.title}

                                    </span>
                                </span>

                                <Arrow_Select />
                            </button>

                            <div
                                className={`relative block w-[90%] right-0 mt-2  rounded-md transition-all shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none  overflow-hidden ${focus === item.title ? item.length : 'h-0 overflow-hidden'}`}>
                                <div
                                    className="py-1 ">
                                    {item.options.map((i, index) => {
                                        return <span
                                            onClick={() => router.replace(`/Home?seccion=${item.hash}&item=${i.subtitle}`)}
                                            className="block px-4 py-2 cursor-pointer text-[12px]  text-gray-700 hover:bg-gray-200"
                                        >
                                            <span className='flex items-center w-full space-x-1.5'>
                                                {i.icon}
                                                <span className=''>
                                                    {i.subtitle}

                                                </span>
                                            </span>
                                        </span>
                                    })}
                                </div>
                            </div>


                        </>
                    })
                }


            </ul>
            break





        default:
    }
}










