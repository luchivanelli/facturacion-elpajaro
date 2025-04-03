import { deleteItem } from "../features/itemsSlice";
import { useDispatch, useSelector } from "react-redux";

const DeleteModal = ({itemId})=> {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)

    const handleDelete = ()=> {
        const foundItem = items.find(item => item.id == itemId)
        if (foundItem) {
            dispatch(deleteItem(itemId));
            closeModal();
        }
    }

    const closeModal = () => {
        const form = document.getElementById("delete-item");
        form.classList.add("hidden");
        form.classList.remove("flex");
    };

    return (
        <div id="delete-item" className="absolute hidden justify-center items-center h-screen left-0 top-0 bg-[#000000e1] w-full">
            <div className="mx-3 my-6 bg-[#696969] rounded-2xl border-1 border-[#01578F] flex flex-col gap-2 items-center justify-center py-3 px-5 text-sm md:text-base">
                <p className="text-base md:text-lg">¿Está seguro de eliminar el elemento?</p>
                <div  className="flex gap-4">
                    <button onClick={closeModal} className="w-[90px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Cancelar</button>
                    <button onClick={handleDelete} className="w-[90px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Aceptar</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal