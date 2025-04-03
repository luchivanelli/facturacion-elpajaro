import { useSelector } from "react-redux"
import { useState } from "react";
import EditItem from "./EditItem"
import DeleteModal from "./DeleteModal";
import pencil from "../assets/pencil.svg"
import trash from "../assets/trash.svg"

const ItemsList = () => {
    const items = useSelector(state => state.items);
    const [selectedId, setSelectedId] = useState(null); // Estado para almacenar el ID
    let total = 0

    const openModal = (idItem, idModal) => {
        setSelectedId(idItem); // Guardar el ID del item seleccionado
        const modal = document.getElementById(idModal);
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    };

    const deleteItem = (id)=> {
        openModal(id, "delete-item")
    }

    //Definir el total de todos los items
    items.forEach(item => {
        total += parseInt(item.total) || 0;
    });

    return (
        <div className="text-white px-3">
            <table className="bg-[#696969] text-sm w-full table-auto border-collapse max-w-[900px] md:mx-auto md:text-base">
                <thead>
                    <tr className="text-center bg-[#01578F]">
                        <td className="p-1 md:py-1.5">Cant.</td>
                        <td className="p-1 md:py-1.5">Detalle</td>
                        <td className="p-1 md:py-1.5">Precio</td>
                        <td className="p-1 md:py-1.5">Total</td>
                        <td className="p-1 md:py-1.5 w-12"></td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="text-center leading-4">
                            <td className="p-1 md:py-1.5">{item.cantidad}</td>
                            <td className="whitespace-normal break-words p-1 md:py-1.5">{item.detalle}</td>
                            <td className="p-1 md:py-1.5"><span className="text-white">$</span>{item.precio_unitario}</td>
                            <td className="p-1 md:py-1.5"><span className="text-white">$</span>{item.total}</td>
                            <td className="p-1 md:py-1.5 w-14 md:w-20">
                                <img
                                    src={pencil}
                                    onClick={() => openModal(item.id, "edit-item")}
                                    className="w-5 md:w-6 inline mr-1 cursor-pointer"
                                />
                                <img 
                                    src={trash} 
                                    className="w-5 md:w-6 inline cursor-pointer" 
                                    onClick={()=> deleteItem(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-[#01578F] text-end">
                        <td colSpan="5" className="p-1 md:py-1.5">TOTAL: ${total}</td>
                    </tr>
                </tbody>
            </table>


            <EditItem itemId={selectedId} />
            <DeleteModal itemId={selectedId}/>
        </div>
    );
};

export default ItemsList