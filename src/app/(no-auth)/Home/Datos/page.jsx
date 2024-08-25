import React from 'react';

const PaymentInfoCard = () => {
    const paymentInfo = {
        clientId: 'f5d743b5ed45489798e0c445b030d5a4',
        orderId: '15160932',
        phone: '522201279963',
        rootStatus: null,
        auditors: null,
        productName: 'Buen Crédito',
        requestStatus: 'Pago exitoso',
        applicationTime: '',
        userLevel: 1,
        rejectionReasons: '',
        rejectionType: '',
        appPackageName: 'com.xmdeapp.mxgxlie',
        deviceBrand: 'HUAWEI',
        deviceModel: 'YAL-L21',
        platform: '',
        privateDataAuthorization: null,
        admissionTime: '',
        appChannel: '',
        appVersion: 3,
        isDeviceReplaced: 'NO',
        isEmulator: null,
        channelCode: 'SIP',
        isBlacklisted: 'Sí',
        systemRemarks: 'overdue day more than 5 day'
    };
    const personalInfo = {
        name: 'MIGUEL ANTONIO',
        idNumber: 'HESM900117HVZRLG04',
        idType: 'CURP',
        gender: 'femenino',
        educationLevel: 'Grado universitario/politécnica',
        maritalStatus: 'Soltero',
        childrenStatus: 0,
        age: 0,
        birthDate: '00-00-0000',
        religiousBelief: '',
        whatsappAccount: null,
        residenceTime: '',
        residentialAddress: '/ Las Choapas / Veracruz',
        companyAddress: '/ /',
        appLocation: ''
    };
    const companyInfo = {
        companyName: "Tech Innovations",
        jobType: "Desarrollador de Software",
        monthlyIncome: "Más de $15,000",
        businessScope: "Tecnología",
        companyPhone: "9876543210",
        startDate: "2022-01-15",
        jobNature: "Jornada completa",
        payFrequency: "Mensual",
        payDate: "5 de cada mes",
        incomeSource: "Salario",
        province: "Madrid",
        city: "Madrid",
        address: "Calle de la Innovación, 12"
    };
    const renderValue = (value, defaultValue = 'No disponible') => (value !== null && value !== '' ? value : defaultValue);
    const ocrRecognition = {
        result: "SUCCESS",
        ocrRecognitionName: "Reconocimiento de OCR",
        idNumber: "HESM900117HVZRLG04",
        clientName: "MIGUEL ANTONIO",
        clientId: "HESM900117HVZRLG04",
        ocrComparison: "Igual"
      };
    return (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 ">Información de Pago</h3>
                <div className="space-y-2 grid grid-cols-3">
                    <p><strong>ID de Cliente:</strong> {paymentInfo.clientId}</p>
                    <p><strong>ID de Pedido:</strong> {paymentInfo.orderId}</p>
                    <p><strong>Teléfono:</strong> {paymentInfo.phone}</p>
                    <p><strong>Rootear o no:</strong> {paymentInfo.rootStatus !== null ? paymentInfo.rootStatus : 'No disponible'}</p>
                    <p><strong>Auditores:</strong> {paymentInfo.auditors !== null ? paymentInfo.auditors : 'No disponible'}</p>
                    <p><strong>Nombre del Producto:</strong> {paymentInfo.productName}</p>
                    <p><strong>Estado de la Solicitud:</strong> {paymentInfo.requestStatus}</p>
                    <p><strong>Tiempo de Aplicación:</strong> {paymentInfo.applicationTime || 'No disponible'}</p>
                    <p><strong>Nivel de Usuario:</strong> {paymentInfo.userLevel}</p>
                    <p><strong>Razones para el Rechazo del Sistema:</strong> {paymentInfo.rejectionReasons || 'No disponible'}</p>
                    <p><strong>Tipo de Rechazo del Sistema:</strong> {paymentInfo.rejectionType || 'No disponible'}</p>
                    <p><strong>Nombre del Paquete APP:</strong> {paymentInfo.appPackageName}</p>
                    <p><strong>Marca del Dispositivo:</strong> {paymentInfo.deviceBrand}</p>
                    <p><strong>Modelo del Dispositivo:</strong> {paymentInfo.deviceModel}</p>
                    <p><strong>Plataforma Entrante:</strong> {paymentInfo.platform || 'No disponible'}</p>
                    <p><strong>Autorizar Datos Privados:</strong> {paymentInfo.privateDataAuthorization !== null ? paymentInfo.privateDataAuthorization : 'No disponible'}</p>
                    <p><strong>Hora de Admisión:</strong> {paymentInfo.admissionTime || 'No disponible'}</p>
                    <p><strong>Canal de Aplicación:</strong> {paymentInfo.appChannel || 'No disponible'}</p>
                    <p><strong>Número de Versión de la Aplicación:</strong> {paymentInfo.appVersion}</p>
                    <p><strong>¿Se ha Reemplazado el Equipo?:</strong> {paymentInfo.isDeviceReplaced}</p>
                    <p><strong>Si es un Emulador:</strong> {paymentInfo.isEmulator !== null ? paymentInfo.isEmulator : 'No disponible'}</p>
                    <p><strong>Código de Canal:</strong> {paymentInfo.channelCode}</p>
                    <p><strong>Lista Negra:</strong> {paymentInfo.isBlacklisted}</p>
                    <p><strong>Observaciones sobre el Apagón del Sistema:</strong> {paymentInfo.systemRemarks}</p>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
                <div className="space-y-2  grid grid-cols-3">
                    <p><strong>Nombre:</strong> {personalInfo.name}</p>
                    <p><strong>Número de Documento de Identidad:</strong> {personalInfo.idNumber}</p>
                    <p><strong>Tipo de Documento de Identidad:</strong> {personalInfo.idType}</p>
                    <p><strong>Género:</strong> {personalInfo.gender}</p>
                    <p><strong>Nivel Educativo:</strong> {personalInfo.educationLevel}</p>
                    <p><strong>Estado Civil:</strong> {personalInfo.maritalStatus}</p>
                    <p><strong>Situación de los Hijos:</strong> {personalInfo.childrenStatus}</p>
                    <p><strong>Edad:</strong> {personalInfo.age}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {personalInfo.birthDate}</p>
                    <p><strong>Creencia Religiosa:</strong> {personalInfo.religiousBelief || 'No disponible'}</p>
                    <p><strong>Cuenta WhatsApp:</strong> {personalInfo.whatsappAccount !== null ? personalInfo.whatsappAccount : 'No disponible'}</p>
                    <p><strong>Tiempo de Residencia:</strong> {personalInfo.residenceTime || 'No disponible'}</p>
                    <p><strong>Dirección Residencial:</strong> {personalInfo.residentialAddress}</p>
                    <p><strong>Dirección de la Empresa:</strong> {personalInfo.companyAddress}</p>
                    <p><strong>Ubicación de la Aplicación Móvil:</strong> {personalInfo.appLocation || 'No disponible'}</p>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Información de la Empresa</h3>
                <div className="space-y-2 grid grid-cols-3 gap-4">
                    <p><strong>Nombre de la Empresa:</strong> {companyInfo.companyName}</p>
                    <p><strong>Tipo de Trabajos:</strong> {companyInfo.jobType}</p>
                    <p><strong>Ingresos Mensuales:</strong> {companyInfo.monthlyIncome}</p>
                    <p><strong>Ámbito de Negocio de la Empresa:</strong> {companyInfo.businessScope}</p>
                    <p><strong>Teléfono de la Empresa:</strong> {companyInfo.companyPhone}</p>
                    <p><strong>Fecha de Inicio:</strong> {renderValue(companyInfo.startDate)}</p>
                    <p><strong>Naturaleza del Trabajo:</strong> {companyInfo.jobNature}</p>
                    <p><strong>Frecuencia de Nómina:</strong> {companyInfo.payFrequency}</p>
                    <p><strong>Fecha de Pago:</strong> {companyInfo.payDate}</p>
                    <p><strong>Fuente de Ingreso:</strong> {companyInfo.incomeSource}</p>
                    <p><strong>Provincia:</strong> {companyInfo.province}</p>
                    <p><strong>Ciudad:</strong> {companyInfo.city}</p>
                    <p><strong>Dirección:</strong> {companyInfo.address}</p>
                </div>
            </div>
            <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Resultados del Reconocimiento OCR</h3>
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <p><strong>Resultado del Reconocimiento:</strong> {ocrRecognition.result}</p>
          <p><strong>Nombre de Reconocimiento de OCR:</strong> {ocrRecognition.ocrRecognitionName}</p>
          <p><strong>Número de Documento de Identificación:</strong> {ocrRecognition.idNumber}</p>
          <p><strong>Nombre del Cliente Enviado:</strong> {ocrRecognition.clientName}</p>
          <p><strong>ID del Cliente Enviado:</strong> {ocrRecognition.clientId}</p>
          <p><strong>Resultado de Comparación de OCR:</strong> {ocrRecognition.ocrComparison}</p>
        </div>
      </div>
        </div>
    );
};

export default PaymentInfoCard;

