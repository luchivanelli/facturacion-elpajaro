import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { editItem } from "../features/itemsSlice"

const EditItem = ({ itemId }) => {
    const items = useSelector(state => state.items);
    const dispatch = useDispatch();
    const [item, setItem] = useState({  //Estado para el item a editar
        cantidad: "",
        detalle: "",
        precio_unitario: "",
        total: ""
    });

    useEffect(() => {
        //Buscar el item a editar y guardar en el estado local
        const foundItem = items.find(item => item.id === itemId);
        if (foundItem) setItem(foundItem);
    }, [itemId, items]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item.cantidad !== "" && item.precio_unitario !== "" && item.detalle !== "" && item.total !== "") {
            document.getElementById("edit-validacion").classList.add("hidden")
            dispatch(editItem(item));
            closeModal()
        } else {
            document.getElementById("edit-validacion").classList.remove("hidden")
        }
    };

    const closeModal = () => {
        const form = document.getElementById("edit-item");
        form.classList.add("hidden");
        form.classList.remove("flex");
    };

    return (
        <div id="edit-item" className="absolute h-screen left-0 top-0 w-full bg-[#000000e1] hidden items-center justify-center">
            <form onSubmit={handleSubmit} className="mx-3 my-6 bg-[#b6b6b669] card rounded-2xl border-1 border-[#01578F] flex flex-col gap-2 items-center justify-center py-3 px-5 text-sm md:text-base">
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="cantidad" className="text-white p-1 font-bold">Cantidad:</label>
                    <input
                        type="number"
                        name="cantidad"
                        id="cantidad"
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={item.cantidad || ""}
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
                        value={item.detalle || ""}
                    />
                </div>
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="precio_unitario" className="text-white p-1 font-bold w-50">Precio unitario:</label>
                    <input
                        type="number"
                        name="precio_unitario"
                        id="precio_unitario"
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={item.precio_unitario || ""}
                    />
                </div>
                <div className="flex gap-2 items-center w-full">
                    <label htmlFor="total" className="text-white p-1 font-bold">Total:</label>
                    <input
                        type="number"
                        name="total"
                        id="total"
                        className="border-b-1 border-white p-1 text-white focus:outline-0 w-full h-full"
                        onChange={handleChange}
                        value={item.total || ""}
                    />
                </div>
                <span id="edit-validacion" className="hidden font-medium">Debes completar todos los campos</span>
                <div className="flex gap-4">
                    <button onClick={closeModal} type="button" className="w-[90px] md:w-[100px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Atrás</button>
                    <button type="submit" className="w-[90px] md:w-[100px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default EditItem