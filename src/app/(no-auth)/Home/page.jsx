'use client';
import { useAppContext } from '@/context/AppContext'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import SelectSimple from '@/components/SelectSimple'
import ProgressBar from 'react-customizable-progressbar';
import CircleBar from '@/components/CircleBar'
import ReactSpeedometer from "react-d3-speedometer"
import { useSearchParams } from 'next/navigation'
import {
    refunds,
    menuArray, filtro_1, rangesArray, cobrador, filterCliente, factura, Jumlah, estadoRembolso
} from '@/constants/index'
import { useRouter } from 'next/navigation';
import { ChatIcon } from '@heroicons/react/24/outline';
export default function Home() {
    const router = useRouter()

    const { user, userDB, setUserProfile, modal, subItemNav, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, exchange, setExchange, destinatario, setDestinatario } = useAppContext()
    const [filter, setFilter] = useState({})
    const [state, setState] = useState({})
    const [remesasDB, setRemesasDB] = useState(undefined)
    const [modal2, setModal2] = useState(false)
    const refFirst = useRef(null);
    const [profileIMG, setProfileIMG] = useState('')
    const searchParams = useSearchParams()
    const seccion = searchParams.get('seccion')
    const item = searchParams.get('item')
    let menu = menuArray.filter(i => i.hash === seccion)
    function onChangeFilter(e) {
        setFilter(e.currentTarget.value)
    }
    // function handlerProfileIMG(img) {
    //     setProfileIMG(img)
    // }
    function closeProfileIMG() {
        setProfileIMG('')
    }
    function sortArray(x, y) {
        if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
        if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
        return 0
    }
    function handlerSelect(name, i, uuid) {
        setState({ ...state, [uuid]: { [name]: i } })
    }

    const prev = () => {
        requestAnimationFrame(() => {
            if (refFirst.current) {
                const scrollLeft = refFirst.current.scrollLeft;
                console.log(scrollLeft);
                const itemWidth = screen.width - 50;
                refFirst.current.scrollLeft = scrollLeft - itemWidth;
            }
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            if (refFirst.current) {
                const scrollLeft = refFirst.current.scrollLeft;
                console.log(scrollLeft);
                const itemWidth = screen.width - 50;
                console.log(itemWidth);
                refFirst.current.scrollLeft = scrollLeft + itemWidth;
            }
        });
    };
    function handlerSelectClick(name, i, uuid) {
        setFilter({ ...filter, [name]: i })
    }
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    function getDay(dias) {
        var dt = new Date();
        console.log('Fecha Actual: ' + dt);
        //restando los dias deseados
        dt.setDate(dt.getDate() - dias);
        //mostrando el resultado
        return formatDate(dt)
    }
    //fecha actual
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);

    const handleCheckboxChange = (index) => {
        setSelectedCheckbox(index);
    };
    const [isGreen, setIsGreen] = useState(true);
    const handleClick = () => {
        setIsGreen(!isGreen);
    };
    return (
        <main className='w-full h-full'>
            <nav>
                {menu.length === 1 && <ul className='flex justify-between pb-3'>
                    {menu[0].options.map((i, index) => {
                        return <li className='text-gray-300 flex items-center text-[12px] cursor-pointer' onClick={() => router.replace(`/Home?seccion=${menu[0].hash}&item=${i.subtitle}`)}
                        >
                            <span
                                className={`inline-block w-[8px] h-[8px] mr-2 rounded-full cursor-pointer transition-colors duration-300 ${i.subtitle === item ? 'bg-green-500' : 'bg-gray-500'}`}
                            ></span>
                            <span className={` ${i.subtitle === item ? 'text-gray-900' : 'text-gray-400'}`}>{i.subtitle}</span> </li>
                    })}
                </ul>}

            </nav>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            {/* {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar la tasa de cambio de:  {item['currency']}</Modal>}
            {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas por {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
             */}

            {profileIMG.length > 0 && <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-40' onClick={closeProfileIMG}></div>}
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-gray-50 min-h-[80vh] scroll-smooth" ref={refFirst}>
                {item === 'Casos de Cobranza' && <div>

                    <br />
                    <div className='grid grid-cols-3 gap-x-5 gap-y-2 w-[1050px]'>
                        <div className='w-[330px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Nombre del producto:
                                </label>
                                <SelectSimple arr={filtro_1} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Cobrador:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={rangesArray} name='Cobrador 1' click={handlerSelectClick} defaultValue={filter['Cobrador 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={cobrador} name='Cobrador 2' click={handlerSelectClick} defaultValue={filter['Cobrador 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>

                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Dias vencidos:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Nombre del cliente' click={handlerSelectClick} defaultValue={filter['Nombre del cliente']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Nombre del cliente' click={handlerSelectClick} defaultValue={filter['Nombre del cliente']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Clientes nuevos y antiguos:
                                </label>
                                <SelectSimple arr={filterCliente} name='Clientes nuevos y antiguos' click={handlerSelectClick} defaultValue={filter['Clientes nuevos y antiguos']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <button type="button" class="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-[10px] px-5 py-2 text-center me-2 mb-2">Distribuir</button>

                        </div>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Número de teléfono:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Número de teléfono' click={handlerSelectClick} defaultValue={filter['Número de teléfono']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>

                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Factura a plazos:
                                </label>
                                <SelectSimple arr={factura} name='Factura a plazos' click={handlerSelectClick} defaultValue={filter['Factura a plazos']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Numero de páginas:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Numero de páginas' click={handlerSelectClick} defaultValue={filter['Numero de páginas']} uuid='123' label='Numero de páginas' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>

                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Jumiah periode:
                                </label>
                                <SelectSimple arr={Jumlah} name='Jumiah periode' click={handlerSelectClick} defaultValue={filter['Jumiah periode']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                        </div>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Nombre del cliente:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Nombre del cliente' click={handlerSelectClick} defaultValue={filter['Nombre del cliente']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Estado de reembolso:
                                </label>
                                <SelectSimple arr={estadoRembolso} name='Estado de reembolso' click={handlerSelectClick} defaultValue={filter['Estado de reembolso']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Fecha de rembolso:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <input type='date' className="h-[25px] max-w-[173px] w-full px-2 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Nombre del cliente' click={handlerSelectClick} defaultValue={filter['Nombre del cliente']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <input type='date' className="h-[25px] max-w-[173px] w-full px-2 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='Nombre del cliente' click={handlerSelectClick} defaultValue={filter['Nombre del cliente']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>

                            </div>



                            <div className='flex justify-between flex space-x-3'>
                                <button type="button" class="w-full text-white bg-gradient-to-br from-blue-600 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[10px] px-5 py-1.5 text-center me-2 mb-2">Consultar</button>
                                <button type="button" class="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-[10px] px-5 py-2 text-center me-2 mb-2">Restablecer</button>
                            </div>
                        </div>
                    </div>
                    {/* <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar por remitente, destinatario o DNI' /> */}
                    {/* <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]">Estado</h3>
                    <div className="grid grid-cols-4 gap-4 w-[700px] ">
                        {estadoCONST.map((i, index) => {
                            return <Tag theme={estado == i ? 'Primary' : 'Secondary'} click={() => setEstado(estado == i ? '' : i)}>{i}</Tag>
                        })}
                    </div>
                </div> */}

                    <br />
                    <table className="w-full min-w-[2500px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
                        <thead className="text-[10px] text-gray-700 uppercase bg-white">
                            <tr className=''>
                                <th scope="col" className="w-[50px] px-3 py-3">
                                    WhatsApp
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    <input type="checkbox" />
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Numero de prestamo
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    ID de sub-factura
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Tipo de orden
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Período
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Estado de reembolso
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Nombre del cliente
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Label of C card
                                </th >
                                <th scope="col" className=" px-3 py-3">
                                    Número de teléfono móvil
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Clientes nuevos
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Importe reembolsable(Rp)
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Importe pagado(Rp)
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Registro de notas
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    nombre del producto
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Fecha de reembolso
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Dias Vencidos
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Fecha de cancelacion a cuenta
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Fecha de la creacion de la tarea
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Fecha de tramitacion del caso
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Nombre de la empresa
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Apodo de usuario de cobro
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Operar
                                </th>
                            </tr>
                        </thead>
                        <tbody>


                            {refunds.map((item, index) => (
                                <tr key={index} className='text-[12px]'>
                                    {/* <td className="px-3 py-2">{item.whatsapp}</td> */}
                                    <td className="px-3 py-2">
                                        <a
                                            href={`https://wa.me/${item.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center text-green-500 hover:text-green-600"
                                        >
                                            {/* SVG icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                                            </svg>
                                            {item.whatsapp}
                                        </a>
                                    </td>
                                    <td className="px-3 py-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-3 py-2">{item.numeroPrestamo}</td>
                                    <td className="px-3 py-2">{item.idSubFactura}</td>
                                    <td className="px-3 py-2">{item.tipoOrden}</td>
                                    <td className="px-3 py-2">{item.periodo}</td>
                                    <td className={`px-3 py-2 ${item.estado === 'pagado'? 'text-green-500':'text-orange-600'}`}>{item.estado}</td>
                                    <td className="px-3 py-2">{item.nombreCliente}</td>
                                    <td className="px-3 py-2">{item.etiquetaTarjetaCredito}</td>
                                    <td className="px-3 py-2">{item.numeroMovil}</td>
                                    <td className={`px-3 py-2 ${item.nuevoCliente ? 'text-green-500':'text-orange-600'}`}>{item.nuevoCliente ? 'Sí' : 'No'}</td>
                                    <td className="px-3 py-2">{item.montoReembolsable}</td>
                                    <td className="px-3 py-2">{item.montoPagado}</td>
                                    <td className="px-3 py-2">{item.notaRegistro}</td>
                                    <td className="px-3 py-2">{item.nombreProducto}</td>
                                    <td className="px-3 py-2">{item.fechaReembolso}</td>
                                    <td className="px-3 py-2">{item.diasAtraso}</td>
                                    <td className="px-3 py-2">{item.fechaCancelacion}</td>
                                    <td className="px-3 py-2">{item.fechaCreacionTarea}</td>
                                    <td className="px-3 py-2">{item.fechaProcesoCaso}</td>
                                    <td className="px-3 py-2">{item.nombreEmpresa}</td>
                                    <td className="px-3 py-2">{item.nombreUsuarioCobranza}</td>
                                    <td className="px-3 py-2">{item.accion}</td>
                                </tr>
                            ))}
                            {/* {remesasDB && remesasDB !== undefined && Object.values(remesasDB).map((i, index) => {
                            return ((i.destinatario !== undefined && i.destinatario.toLowerCase().includes(filter.toLowerCase())) ||
                                (i.remitente !== undefined && i.remitente.toLowerCase().includes(filter.toLowerCase())) ||
                                (i.dni !== undefined && i.dni.toLowerCase().includes(filter.toLowerCase())) ||
                                (i['dni remitente'] !== undefined && i['dni remitente'].toLowerCase().includes(filter.toLowerCase()))) &&
                                (i.estado !== undefined && i.estado.toLowerCase().includes(estado.toLowerCase())) && i.operacion === 'Envio' &&
                                <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                                    <td className="px-3 py-4  flex  ">
                                        <span className='h-full flex py-2'>{index + 1}</span>
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        <Select arr={['En verficación', 'Transfiriendo', 'Exitoso', 'Rechazado']} name='estado' uuid={i.uuid} defaul={i.estado} click={handlerSelect} />
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['dni remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['pais remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['cuenta transferidora']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['banco de transferencia']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['destinatario']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['dni']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['direccion']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['celular']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cuenta destinatario']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['nombre de banco']}
                                    </td>
                                    <td className="px-3 py-4  ">
                                        {i['importe']}
                                    </td>
                                    <td className=" p-3">
                                        {i['divisa de envio']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cambio']}
                                    </td>
                                    <td className=" p-3">
                                        {i['divisa de receptor']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['uuid']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['fecha']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cuenta transferidora']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['banco de transferencia']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        <img src={i.url} className={`${i.url === profileIMG ? 'fixed right-0 left-0 top-0 bottom-0 m-auto portrait:w-[100vw] landscape:h-[100vh] z-50' : 'h-[150px] w-[150px] object-contain'}`} onClick={() => handlerProfileIMG(i.url)} alt="" />
                                    </td>
                                    <td className="px-3 py-4">
                                        {state && state !== undefined && state[i.uuid] && state[i.uuid] !== undefined
                                            ? <Button theme={"Success"} click={() => save(i, i.uuid)}>Guardar</Button>
                                            : <Button theme={"Disable"}>Desabilitado</Button>
                                        }
                                    </td>
                                </tr>
                        })
                        } */}
                        </tbody>
                    </table>
                </div>}

                {item === 'Incurrir en una estación de trabajo' && <div>





                    <div className='flex flex-wrap justify-around bg-[#EFEFEF]'>

                        <div className='bg-[#EFEFEF] p-5'>

                            <div style={{
                                width: "300px",
                                height: "200px",
                                background: "#EFEFEF",
                            }}>
                                <ReactSpeedometer
                                    ringWidth={20}
                                    fluidWidth={true}
                                    minValue={0}
                                    segments={10}
                                    maxValue={100}
                                    value={10}
                                    needleColor="steelblue"
                                />
                            </div>
                            <h4 className='text-center text-[14px] text-[steelblue] m-0 p-0 pb-2'>Tasa de finalizacion hoy</h4>

                            <div className='grid grid-cols-3 w-[300px]'>
                                <p className='col-span-2 text-center text-[10px] text-gray-500'>0 <br />El número de recordatorios en el dia que se asigna en el día.</p>
                                <p className='col-span-1 text-center text-[10px] text-gray-500'>0 <br />Añadir el número hoy.</p>
                            </div>
                        </div>
                        <div className='bg-[#EFEFEF] p-5'>
                            <div style={{
                                width: "300px",
                                height: "200px",
                                background: "#EFEFEF",
                            }}>
                                <ReactSpeedometer
                                    ringWidth={20}
                                    fluidWidth={true}
                                    minValue={0}
                                    segments={10}
                                    maxValue={100}
                                    value={20}
                                    needleColor="steelblue"
                                />
                            </div>
                            <h4 className='text-center text-[14px] text-[steelblue] m-0 p-0 pb-2'>Tasa de recuperación de caso</h4>

                            <div className='grid grid-cols-3 w-[300px]'>
                                <p className='col-span-2 text-center text-[10px] text-gray-500'>0 <br />Cobro de hoy.</p>
                                <p className='col-span-1 text-center text-[10px] text-gray-500'>0 <br />Número total de casos.</p>
                            </div>
                        </div>
                        <div className='bg-[#EFEFEF] p-5'>

                            <div style={{
                                width: "300px",
                                height: "200px",
                                background: "#EFEFEF",
                            }}>
                                <ReactSpeedometer
                                    ringWidth={20}
                                    fluidWidth={true}
                                    minValue={0}
                                    segments={10}
                                    maxValue={100}
                                    value={30}
                                    needleColor="steelblue"
                                />
                            </div>
                            <h4 className='text-center text-[14px] text-[steelblue] m-0 p-0 pb-2'>Tasa de recuperación de grupo</h4>

                            <p className='col-span-2 text-center text-[10px] text-gray-500'>0 <br />Taza de recuperación de grupos.</p>
                        </div>



                    </div>















                    <br />
                    <div className='grid grid-cols-3 gap-x-[50px] gap-y-2 w-[950px]'>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Producto del proyecto:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Producto del proyecto' click={handlerSelectClick} defaultValue={filter['Producto del proyecto']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Número de teléfono:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['Número de teléfono']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Estado de reembolso:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Dias vencidos 1' click={handlerSelectClick} defaultValue={filter['Dias vencidos 1']} uuid='123' label='Filtro 2' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Angsuran:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Clientes nuevos y antiguos' click={handlerSelectClick} defaultValue={filter['Clientes nuevos y antiguos']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                        </div>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Número de prestamos:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Número de prestamos' click={handlerSelectClick} defaultValue={filter['Número de prestamos']} uuid='123' label='Filtro 3' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>

                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Nombre del cliente:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='filtro 4' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Fecha de cancelación a cuenta:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de cancelación a cuenta 1' click={handlerSelectClick} defaultValue={filter['Fecha de cancelación a cuenta 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de cancelación a cuenta 2' click={handlerSelectClick} defaultValue={filter['Fecha de cancelación a cuenta 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Número de etapas:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Número de etapas' click={handlerSelectClick} defaultValue={filter['Número de etapas']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                        </div>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    ID de sub-factura:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Dias vencidos:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Dias vencidos 1' click={handlerSelectClick} defaultValue={filter['Dias vencidos 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Dias vencidos 2' click={handlerSelectClick} defaultValue={filter['Dias vencidos 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Fecha de asignación:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de asignación 1' click={handlerSelectClick} defaultValue={filter['Fecha de asignación 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de asignación 2' click={handlerSelectClick} defaultValue={filter['Fecha de asignación 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Collected employee ID:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Collected employee ID' click={handlerSelectClick} defaultValue={filter['Collected employee ID']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                        </div>
                    </div>

                    {/* <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar por remitente, destinatario o DNI' /> */}
                    {/* <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]">Estado</h3>
                    <div className="grid grid-cols-4 gap-4 w-[700px] ">
                        {estadoCONST.map((i, index) => {
                            return <Tag theme={estado == i ? 'Primary' : 'Secondary'} click={() => setEstado(estado == i ? '' : i)}>{i}</Tag>
                        })}
                    </div>
                </div> */}
                    <br />
                    <br />
                    <table className="w-full min-w-[2000px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
                        <thead className="text-[10px] text-gray-700 uppercase bg-white">
                            <tr className=''>
                                <th scope="col" className="w-[50px] px-3 py-3">
                                    WhatsApp
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Número de prestamo
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    ID de sub-factura
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Tipo de orden
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Estado n
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Estado de reembolso
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Nombre del cliente
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Label of C card
                                </th >
                                <th scope="col" className=" px-3 py-3">
                                    Número de teléfono móvil
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Clientes nuevos
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Importe adecuado(MXN)
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Importe pagado(MXN)
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Registro de notas
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    -----
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Operar
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    ------
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {/* {remesasDB && remesasDB !== undefined && Object.values(remesasDB).map((i, index) => {
                            return ((i.destinatario !== undefined && i.destinatario.toLowerCase().includes(filter.toLowerCase())) ||
                                (i.remitente !== undefined && i.remitente.toLowerCase().includes(filter.toLowerCase())) ||
                                (i.dni !== undefined && i.dni.toLowerCase().includes(filter.toLowerCase())) ||
                                (i['dni remitente'] !== undefined && i['dni remitente'].toLowerCase().includes(filter.toLowerCase()))) &&
                                (i.estado !== undefined && i.estado.toLowerCase().includes(estado.toLowerCase())) && i.operacion === 'Envio' &&
                                <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                                    <td className="px-3 py-4  flex  ">
                                        <span className='h-full flex py-2'>{index + 1}</span>
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        <Select arr={['En verficación', 'Transfiriendo', 'Exitoso', 'Rechazado']} name='estado' uuid={i.uuid} defaul={i.estado} click={handlerSelect} />
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['dni remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['pais remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['cuenta transferidora']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['banco de transferencia']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['destinatario']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['dni']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['direccion']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['celular']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cuenta destinatario']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['nombre de banco']}
                                    </td>
                                    <td className="px-3 py-4  ">
                                        {i['importe']}
                                    </td>
                                    <td className=" p-3">
                                        {i['divisa de envio']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cambio']}
                                    </td>
                                    <td className=" p-3">
                                        {i['divisa de receptor']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['uuid']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['fecha']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cuenta transferidora']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['banco de transferencia']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        <img src={i.url} className={`${i.url === profileIMG ? 'fixed right-0 left-0 top-0 bottom-0 m-auto portrait:w-[100vw] landscape:h-[100vh] z-50' : 'h-[150px] w-[150px] object-contain'}`} onClick={() => handlerProfileIMG(i.url)} alt="" />
                                    </td>
                                    <td className="px-3 py-4">
                                        {state && state !== undefined && state[i.uuid] && state[i.uuid] !== undefined
                                            ? <Button theme={"Success"} click={() => save(i, i.uuid)}>Guardar</Button>
                                            : <Button theme={"Disable"}>Desabilitado</Button>
                                        }
                                    </td>
                                </tr>
                        })
                        } */}
                        </tbody>
                    </table>
                </div>}

                {item === 'Flujo de Clientes' && <div>




                    <br />
                    <br />
                    <table className="w-full min-w-[1000px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
                        <thead className="text-[10px] text-gray-700 uppercase bg-white">
                            <tr className=''>
                                <th scope="col" className="w-[50px] px-3 py-3">
                                    Operación
                                </th>

                                <th scope="col" className=" px-3 py-3 text-center">
                                    {getDay(5)}
                                </th>
                                <th scope="col" className=" px-3 py-3 text-center">
                                    {getDay(4)}
                                </th>
                                <th scope="col" className=" px-3 py-3 text-center">
                                    {getDay(3)}
                                </th>
                                <th scope="col" className=" px-3 py-3 text-center">
                                    {getDay(2)}
                                </th>
                                <th scope="col" className=" px-3 py-3 text-center">
                                    {getDay(1)}
                                </th>
                                <th scope="col" className=" px-3 py-3 text-center">
                                    {getDay(0)}
                                </th >




                            </tr>
                        </thead>
                        <tbody>
                            {/* {remesasDB && remesasDB !== undefined && Object.values(remesasDB).map((i, index) => {
                            return ((i.destinatario !== undefined && i.destinatario.toLowerCase().includes(filter.toLowerCase())) ||
                                (i.remitente !== undefined && i.remitente.toLowerCase().includes(filter.toLowerCase())) ||
                                (i.dni !== undefined && i.dni.toLowerCase().includes(filter.toLowerCase())) ||
                                (i['dni remitente'] !== undefined && i['dni remitente'].toLowerCase().includes(filter.toLowerCase()))) &&
                                (i.estado !== undefined && i.estado.toLowerCase().includes(estado.toLowerCase())) && i.operacion === 'Envio' &&
                                <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                                    <td className="px-3 py-4  flex  ">
                                        <span className='h-full flex py-2'>{index + 1}</span>
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        <Select arr={['En verficación', 'Transfiriendo', 'Exitoso', 'Rechazado']} name='estado' uuid={i.uuid} defaul={i.estado} click={handlerSelect} />
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['dni remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['pais remitente']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['cuenta transferidora']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['banco de transferencia']}
                                    </td>
                                    <td className="min-w-32 px-3 py-4  ">
                                        {i['destinatario']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['dni']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['direccion']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['celular']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cuenta destinatario']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['nombre de banco']}
                                    </td>
                                    <td className="px-3 py-4  ">
                                        {i['importe']}
                                    </td>
                                    <td className=" p-3">
                                        {i['divisa de envio']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cambio']}
                                    </td>
                                    <td className=" p-3">
                                        {i['divisa de receptor']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['uuid']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['fecha']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['cuenta transferidora']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        {i['banco de transferencia']}
                                    </td>
                                    <td className="min-w-32 p-3">
                                        <img src={i.url} className={`${i.url === profileIMG ? 'fixed right-0 left-0 top-0 bottom-0 m-auto portrait:w-[100vw] landscape:h-[100vh] z-50' : 'h-[150px] w-[150px] object-contain'}`} onClick={() => handlerProfileIMG(i.url)} alt="" />
                                    </td>
                                    <td className="px-3 py-4">
                                        {state && state !== undefined && state[i.uuid] && state[i.uuid] !== undefined
                                            ? <Button theme={"Success"} click={() => save(i, i.uuid)}>Guardar</Button>
                                            : <Button theme={"Disable"}>Desabilitado</Button>
                                        }
                                    </td>
                                </tr>
                        })
                        } */}
                        </tbody>
                    </table>
                </div>}




                {item === 'Gestión de cuentas de Colección' && <div>





                    <br />
                    <div className='grid grid-cols-3 gap-x-[50px] gap-y-2 w-[950px]'>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Cuenta:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Situación laboral:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Cobrador 1' click={handlerSelectClick} defaultValue={filter['Cobrador 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>

                        </div>
                        <div className='w-[300px] space-y-2'>


                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Nombre del cliente:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Nombre del cliente' click={handlerSelectClick} defaultValue={filter['Nombre del cliente']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    ------:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de cancelación a cuenta 1' click={handlerSelectClick} defaultValue={filter['Fecha de cancelación a cuenta 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />

                            </div>

                        </div>
                        <div className='w-[300px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Nombre del rol:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='ID de sub-factura' click={handlerSelectClick} defaultValue={filter['ID de sub-factura']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>

                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    -------:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Collected employee ID' click={handlerSelectClick} defaultValue={filter['Collected employee ID']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                        </div>
                    </div>
                    <div className='py-5 flex space-x-3'>

                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[10px] px-5 py-1.5 text-center me-2 mb-2">Consultar</button>
                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[10px]font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span class="relative w-full inline-block text-[10px] px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Restablecimiento
                            </span>
                        </button>
                        <button type="button" onClick={() => setModal2(true)} class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-[10px] px-5 py-1.5 text-center me-2 mb-2">Añadir cuenta</button>

                    </div>


                    <div className='pb-5 flex space-x-3'>


                        <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-[10px] px-5 py-2 text-center me-2 mb-2">-------------</button>


                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-[10px] px-5 py-2 text-center me-2 mb-2">Eliminar cuentas por lotes</button>
                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-[10px] px-5 py-2 text-center me-2 mb-2">Restablecimiento masivo de contraseñas</button>

                    </div>


                    {/* <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar por remitente, destinatario o DNI' /> */}
                    {/* <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]">Estado</h3>
                <div className="grid grid-cols-4 gap-4 w-[700px] ">
                    {estadoCONST.map((i, index) => {
                        return <Tag theme={estado == i ? 'Primary' : 'Secondary'} click={() => setEstado(estado == i ? '' : i)}>{i}</Tag>
                    })}
                </div>
            </div> */}
                    <br />
                    <br />
                    <table className="w-full min-w-[1500px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
                        <thead className="text-[10px] text-gray-700 uppercase bg-white">
                            <tr className=''>
                                <th scope="col" className=" px-3 py-3">
                                    Cuenta de usuario
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Apodo del usuario
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Nombre del producto
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Codificación de roles
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Tanda Koleksi
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Nombre del rol
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Situación laboral
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Nombre del grupo
                                </th >
                                <th scope="col" className=" px-3 py-3">
                                    Origen de la cuenta
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Fecha de creación
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Operar
                                </th>



                            </tr>
                        </thead>
                        <tbody>
                            {/* {remesasDB && remesasDB !== undefined && Object.values(remesasDB).map((i, index) => {
                        return ((i.destinatario !== undefined && i.destinatario.toLowerCase().includes(filter.toLowerCase())) ||
                            (i.remitente !== undefined && i.remitente.toLowerCase().includes(filter.toLowerCase())) ||
                            (i.dni !== undefined && i.dni.toLowerCase().includes(filter.toLowerCase())) ||
                            (i['dni remitente'] !== undefined && i['dni remitente'].toLowerCase().includes(filter.toLowerCase()))) &&
                            (i.estado !== undefined && i.estado.toLowerCase().includes(estado.toLowerCase())) && i.operacion === 'Envio' &&
                            <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                                <td className="px-3 py-4  flex  ">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    <Select arr={['En verficación', 'Transfiriendo', 'Exitoso', 'Rechazado']} name='estado' uuid={i.uuid} defaul={i.estado} click={handlerSelect} />
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['remitente']}
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['dni remitente']}
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['pais remitente']}
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['cuenta transferidora']}
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['banco de transferencia']}
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['destinatario']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['dni']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['direccion']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['celular']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['cuenta destinatario']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['nombre de banco']}
                                </td>
                                <td className="px-3 py-4  ">
                                    {i['importe']}
                                </td>
                                <td className=" p-3">
                                    {i['divisa de envio']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['cambio']}
                                </td>
                                <td className=" p-3">
                                    {i['divisa de receptor']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['uuid']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['fecha']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['cuenta transferidora']}
                                </td>
                                <td className="min-w-32 p-3">
                                    {i['banco de transferencia']}
                                </td>
                                <td className="min-w-32 p-3">
                                    <img src={i.url} className={`${i.url === profileIMG ? 'fixed right-0 left-0 top-0 bottom-0 m-auto portrait:w-[100vw] landscape:h-[100vh] z-50' : 'h-[150px] w-[150px] object-contain'}`} onClick={() => handlerProfileIMG(i.url)} alt="" />
                                </td>
                                <td className="px-3 py-4">
                                    {state && state !== undefined && state[i.uuid] && state[i.uuid] !== undefined
                                        ? <Button theme={"Success"} click={() => save(i, i.uuid)}>Guardar</Button>
                                        : <Button theme={"Disable"}>Desabilitado</Button>
                                    }
                                </td>
                            </tr>
                    })
                    } */}
                        </tbody>
                    </table>
                </div>}















            </div>





























            {modal2 === true && <div className="h-screen w-screen flex justify-center items-center bg-[#000000c2] fixed top-0 left-0  z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0" onClick={() => setModal2(false)}>
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow p-5 " onClick={(e) => e.stopPropagation()}>

                        <h3 className='relative bg-[#FF9600] text-white px-5 py-3 mb-5'>Añadir cuenta</h3>

                        <div className='w-[400px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Cuenta:
                                </label>
                                <input className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Contraseña:
                                </label>
                                <input type='password' className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>




                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Apodo:
                                </label>
                                <input type='password' className="h-[25px] max-w-[173px] w-full px-5 border border-[#cfcfcf] rounded-[5px] text-[10px]  " arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Origen de la cuenta
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de cancelación a cuenta 1' click={handlerSelectClick} defaultValue={filter['Fecha de cancelación a cuenta 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />

                            </div>



                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Codificación de roles:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='ID de sub-factura' click={handlerSelectClick} defaultValue={filter['ID de sub-factura']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>

                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    situación laboral
                                </label>
                                <div className='flex space-x-3'>
                                    <label className='text-[10px]'>
                                        <input
                                            className='mr-5'

                                            type="checkbox"
                                            checked={selectedCheckbox === 1}
                                            onChange={() => handleCheckboxChange(1)}
                                        />
                                        En el trabajo
                                    </label>
                                    <br />
                                    <label className='text-[10px]'>
                                        <input
                                            className='mr-5'
                                            type="checkbox"
                                            checked={selectedCheckbox === 2}
                                            onChange={() => handleCheckboxChange(2)}
                                        />
                                        Dimitir
                                    </label>
                                    <br />
                                    <label className='text-[10px]'>
                                        <input
                                            className='mr-5'

                                            type="checkbox"
                                            checked={selectedCheckbox === 3}
                                            onChange={() => handleCheckboxChange(3)}
                                        />
                                        Reposo
                                    </label>
                                </div>                            </div>
                        </div>


                    </div>
                </div>
            </div>}



















        </main>
    )
}

