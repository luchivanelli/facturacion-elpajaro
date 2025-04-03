import { guardarInfo } from "../features/infoSlice"
import { useDispatch} from "react-redux"
import { useState } from "react"

const InfoForm = () => {
    const dispatch = useDispatch()
    const [info, setInfo] = useState({
        fecha: "",
        cliente: "",
        direccion: "",
        vehiculo: "",
        patente: "",
        kilometraje: ""
    })

    const handleChange = (e)=> {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = ()=> {
        // e.preventDefault()
        dispatch(guardarInfo(info))
        closeModal()
    }

    const closeModal = ()=> {
        const form = document.getElementById("info-form")
        form.classList.add("hidden")
        form.classList.remove("flex")
    }

    return (
        <div id="info-form" className="absolute justify-center items-center h-screen top-0 bg-[#000000e1] hidden w-full">
            <form action={handleSubmit} className="mx-3 my-6 bg-[#696969] rounded-2xl border-1 border-[#01578F] flex flex-col gap-2 items-center justify-center py-3 px-5 text-sm md:text-base">
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="fecha" className="text-white p-1 font-bold">Fecha:</label>
                    <input 
                        type="date" 
                        name="fecha" 
                        id="fecha"
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={info.fecha}
                    />
                </div>
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="cliente" className="text-white p-1 font-bold">Cliente:</label>
                    <input 
                        type="text" 
                        name="cliente" 
                        id="cliente" 
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={info.cliente}
                    />
                </div>
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="direccion" className="text-white p-1 font-bold">Dirección:</label>
                    <input 
                        type="text" 
                        name="direccion" 
                        id="direccion" 
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={info.direccion}
                    />
                </div>           
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="vehiculo" className="text-white p-1 font-bold">Vehículo:</label>
                    <input 
                        type="text" 
                        name="vehiculo" 
                        id="vehiculo" 
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={info.vehiculo}
                    />
                </div>           
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="patente" className="text-white p-1 font-bold">Patente:</label>
                    <input 
                        type="text" 
                        name="patente" 
                        id="patente" 
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={info.patente}
                    />
                </div>           
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="kilometraje" className="text-white p-1 font-bold">Kilometraje:</label>
                    <input 
                        type="text" 
                        name="kilometraje" 
                        id="kilometraje" 
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={info.kilometraje}
                    />
                </div>           
                <div className="flex gap-4">
                    <button onClick={closeModal} className="w-[90px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Atrás</button>
                    <button type="submit" className="w-[90px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default InfoForm