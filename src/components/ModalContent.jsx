// @ts-nocheck
import { useNavigate } from "react-router-dom";

const iconStyle={
    fontSize:'8em',
    position: "relative",
    padding: "0",
    margin: "0"
}

const buttonStyle={
    fontFamily: 'Roboto',
    textTransform: "uppercase",
    padding:"12px",
    color: "white",
    borderRadius: "4px",
    border: "none",
    margin:"15px",
    backgroundColor: "rgb(110, 133, 16)"
}

export default function ModalContent() {

    const navigate = useNavigate();
    const handleDialogClose = (e, type) => {
        let target;
        switch (type) {
            case "new":
                target = "/";
                break;
            case "list":
                target = "employee-list";
                break;
            default:
                /* console.error("unknown target"); */
        }
        e.preventDefault();
        /* setModalOpen(false); */
        navigate(`../${target}`, { replace: false });
    }
    
    return (
        <div className="modalContent">
            <h1 className="modalIcon" style={iconStyle}>🎉</h1>
            <h1> Nouvel employé ajouté!</h1>
        
            <button className="modalButton" style={buttonStyle} onClick={(e) => handleDialogClose(e, "new")}>Ajouter un nouvel employé</button>
    
            <button className="modalButton" style={buttonStyle} onClick={(e) => handleDialogClose(e, "list")}>Accéder à la liste des employés</button>
        </div>
    )
}
