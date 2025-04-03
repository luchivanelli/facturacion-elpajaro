import { useDispatch} from "react-redux"
import { useState } from "react"
import { addItem } from "../features/itemsSlice"
import { v4 as uuid } from 'uuid';

const ItemsForm = ()=> {   
    const dispatch = useDispatch()
    const [item, setItem] = useState({
        cantidad: "",
        detalle: "",
        precio_unitario: "",
        total: ""
    })

    const handleChange = (e) => {
        setItem((prev) => {
            //Guardar los datos del estado previo y actualizamos el valor correspondiente
            const newItem = {
                ...prev,
                [e.target.name]: e.target.value
            };
    
            //Funcion para autocompletar el campo "total"
            if (newItem.cantidad !== "" && newItem.precio_unitario !== "") {
                newItem.total = (parseInt(newItem.cantidad) * parseInt(newItem.precio_unitario)).toString();
            } else {
                newItem.total = ""
            }
    
            return newItem;
        });
    };

    const handleSubmit = (e)=> {
        e.preventDefault()

        //Verificar que no hayan campos incompletos
        if (item.cantidad !== "" && item.precio_unitario !== "" && item.detalle !== "" && item.total !== "") {
            document.getElementById("form-validacion").classList.add("hidden")
            //Agregar item + id
            dispatch(addItem({
                ...item,
                id: uuid()
            }))
            //Limpiar formulario
            setItem({
                cantidad: "",
                detalle: "",
                precio_unitario: "",
                total: ""
            })
        } else {
            document.getElementById("form-validacion").classList.remove("hidden")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-3 my-6 bg-[#696969] flex flex-col gap-2 items-center justify-center py-3 px-5 text-sm md:mx-0 md:w-full md:text-base">
            <div className="flex gap-2 items-center w-full">
                <label htmlFor="cantidad" className="text-white p-1 font-bold">Cantidad:</label>
                <input 
                    type="number" 
                    name="cantidad" 
                    id="cantidad"
                    className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                    onChange={handleChange}
                    value={item.cantidad}
                />
            </div>
            <div className="flex gap-2 items-center w-full">
                <label htmlFor="detalle" className="text-white p-1 font-bold">Detalle:</label>
                <input 
                    type="text" 
                    name="detalle" 
                    id="detalle" 
                    className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                    onChange={handleChange}
                    value={item.detalle}
                />
            </div>
            <div className="flex gap-2 items-center w-full">
                <label htmlFor="precio_unitario" className="text-white p-1 font-bold min-w-30 md:min-w-34">Precio unitario:</label>
                <span className="text-white font-bold">$</span>
                <input 
                    type="number" 
                    name="precio_unitario" 
                    id="precio_unitario" 
                    className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                    onChange={handleChange}
                    value={item.precio_unitario}
                />
            </div>           
            <div className="flex gap-2 items-center w-full">
                <label htmlFor="total" className="text-white p-1 font-bold">Total:</label>
                <span className="text-white font-bold">$</span>
                <input 
                    type="number" 
                    name="total" 
                    id="total" 
                    className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                    onChange={handleChange}
                    value={item.total}
                />
            </div>     
            <span id="form-validacion" className="hidden font-medium text-white">Debes completar todos los campos</span>          
            <div className="flex gap-4">
                <button type="submit" className="w-[150px] md:w-[160px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Agregar a la lista</button>
            </div>
        </form>
    )
}

export default ItemsForm