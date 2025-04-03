import { useSelector } from "react-redux"

const InfoList = ()=> {
    const info = useSelector(state => state.info)

    const openModal = ()=> {
        const form = document.getElementById("info-form")
        form.classList.remove("hidden")
        form.classList.add("flex")
    }

    return (
        <div className="mx-3 my-6 border-2 border-[#696969] rounded-2xl md:mx-0 md:min-w-[400px]">
            <div className="w-full flex justify-between items-center bg-[#696969] text-white rounded-t-[12px] border-b-2 border-[#828282] md:text-lg">
                <p className="font-bold p-2 text-center w-full">Información del cliente</p>
                <button onClick={openModal} className="rounded-tr-2xl py-3 px-2 bg-[#01578F] hover:bg-white hover:text-[#01578F] transition-all font-bold cursor-pointer w-[100px] !text-sm md:!text-base">Editar</button>
            </div>
            <ul className="flex flex-col gap-x-3 gap-y-1 py-3 px-5 text-sm md:text-base font-medium">
                <li className="text-white"><b>Fecha</b>: {info.fecha}</li>
                <li className="text-white"><b>Nombre</b>: {info.cliente}</li>
                <li className="text-white"><b>Dirección</b>: {info.direccion}</li>
                <li className="text-white"><b>Vehículo</b>: {info.vehiculo}</li>
                <li className="text-white"><b>Pantente</b>: {info.patente}</li>
                <li className="text-white"><b>Kilometraje</b>: {info.kilometraje}</li>
            </ul>
        </div>
    )
}

export default InfoList