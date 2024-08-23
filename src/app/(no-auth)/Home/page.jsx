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
import { estado as estadoCONST } from '@/constants/'
import ProgressBar from 'react-customizable-progressbar';
import CircleBar from '@/components/CircleBar'
import ReactSpeedometer from "react-d3-speedometer"

export default function Home() {

    const { user, userDB, setUserProfile, modal, subItemNav, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, destinatario, setDestinatario } = useAppContext()
    const [filter, setFilter] = useState({})
    const [state, setState] = useState({})
    const [remesasDB, setRemesasDB] = useState(undefined)
    const [modal2, setModal2] = useState(false)
    const refFirst = useRef(null);
    const [profileIMG, setProfileIMG] = useState('')
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











    console.log(subItemNav)







    function save() {


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
    return (
        <main className='w-full h-full'>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            {/* {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar la tasa de cambio de:  {item['currency']}</Modal>}
            {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas por {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
             */}

            {profileIMG.length > 0 && <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-40' onClick={closeProfileIMG}></div>}
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
                {subItemNav === 'Casos de Cobranza' && <div> 
                    <h3 className='font-medium text-[14px]'>Seccion:</h3>
                    <br />
                    <div className='grid grid-cols-3 gap-x-5 gap-y-2 w-[1050px]'>
                        <div className='w-[330px] space-y-2'>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Filtro 1:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='filtro' click={handlerSelectClick} defaultValue={filter['filtro']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Cobrador:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Cobrador 1' click={handlerSelectClick} defaultValue={filter['Cobrador 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Cobrador 2' click={handlerSelectClick} defaultValue={filter['Cobrador 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>

                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Dias vencidos:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Dias vencidos 1' click={handlerSelectClick} defaultValue={filter['Dias vencidos 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Dias vencidos 2' click={handlerSelectClick} defaultValue={filter['Dias vencidos 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Clientes nuevos y antiguos:
                                </label>
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Clientes nuevos y antiguos' click={handlerSelectClick} defaultValue={filter['Clientes nuevos y antiguos']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
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
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Factura a plazos' click={handlerSelectClick} defaultValue={filter['Factura a plazos']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
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
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Jumiah periode' click={handlerSelectClick} defaultValue={filter['Jumiah periode']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
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
                                <SelectSimple arr={['Opción 1', 'Opción 2']} name='Estado de reembolso' click={handlerSelectClick} defaultValue={filter['Estado de reembolso']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                            </div>
                            <div className='flex justify-between'>
                                <label htmlFor="" className="mr-5 text-[10px]">
                                    Fecha de rembolso:
                                </label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de rembolso 1' click={handlerSelectClick} defaultValue={filter['Fecha de rembolso 1']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                    <SelectSimple arr={['Opción 1', 'Opción 2']} name='Fecha de rembolso 2' click={handlerSelectClick} defaultValue={filter['Fecha de rembolso 2']} uuid='123' label='Filtro 1' position='absolute left-0 top-[25px]' bg='white' required />
                                </div>

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
                                    <input type="checkbox" />
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    ID de sub-factura
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    ----
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    ----
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
                                    Importe reembolso
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Apodo de usuario de cobro
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Operar
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Importe
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

                {subItemNav === 'Distribución de casos' && <div>
                    <h3 className='font-medium text-[14px]'>Seccion:</h3>




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

                {subItemNav === 'Flujo de Clientes' && <div>
                    <h3 className='font-medium text-[14px]'>Seccion:</h3>



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




                {subItemNav === 'Gestión de cuentas de Colección' && <div>
                    <h3 className='font-medium text-[14px]'>Seccion:</h3>




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

                        <button type="button"class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[10px] px-5 py-1.5 text-center me-2 mb-2">Consultar</button>
                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[10px]font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span class="relative w-full inline-block text-[10px] px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Restablecimiento
                            </span>
                        </button>
                        <button type="button" onClick={()=>setModal2(true)}  class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-[10px] px-5 py-1.5 text-center me-2 mb-2">Añadir cuenta</button>

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





























         { modal2 === true &&   <div className="h-screen w-screen flex justify-center items-center bg-[#000000c2] fixed top-0 left-0  z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0" onClick={()=>setModal2(false)}>
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow p-5 " onClick={(e)=>e.stopPropagation()}>

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

