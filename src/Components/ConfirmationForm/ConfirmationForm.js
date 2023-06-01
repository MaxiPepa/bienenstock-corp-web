import { useContext } from "react";
import { StatesContext } from "../../Assets/Contexts";

const ConfirmationForm = ({functionFather}) => {
    
    const { setShowModal } = useContext(StatesContext);

    const handleConfirmation = () =>  functionFather() ; 
  
    return (
        <>
        <div>
            <h6>Desea confirmar la operación</h6>
            <button type="button" onClick={() => handleConfirmation(true)}>SI</button>
            <button type="button" onClick={() => setShowModal(false)}>NO</button>
        </div>
        </>
    )
}

export default ConfirmationForm;