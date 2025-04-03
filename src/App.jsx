import logo from "./assets/logo.png"
import InfoForm from "./components/InfoForm"
import InfoList from "./components/InfoList"
import ItemsList from "./components/ItemsList"
import ItemsForm from "./components/ItemsForm"
import generetaInvoice from "./components/generateInvoice"
import { useSelector } from "react-redux"

const App = ()=> {
  const info = useSelector(state=> state.info)
  const items = useSelector(state=> state.items)

  return (
    <div className="relative bg bg-cover bg-top pb-6 min-h-screen">
      <footer className="h-26 flex justify-between md:justify-center gap-10 items-center px-2 border-b-2 border-[#ffffff33]">
        <p className="text-[26px] md:text-[30px] px-2 text-white">Sistema de facturación</p>
        <img src={logo} alt="logo" className="min-w-10 max-w-[200px] md:max-w-[220px]"/>
      </footer>

      <InfoForm/>
      <div className="md:flex items-center max-w-[900px] mx-auto gap-6">
        <InfoList/>
        <ItemsForm/>
      </div>
      <ItemsList/>

      <div className="text-sm md:text-base flex justify-center">
        <button onClick={()=> generetaInvoice(info,items)} className="w-[140px] md:w-[150px] py-1.5 border-2 border-[#fff] text-[#fff] bg-[#01578F] font-bold rounded-2xl !mt-4 cursor-pointer hover:bg-white hover:text-[#01578F] transition-all">Generar factura</button>
      </div>
    </div>
  )
}

export default App
