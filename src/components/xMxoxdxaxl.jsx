// @ts-nocheck
import { useNavigate } from 'react-router-dom';

const backStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    zIndex: "2",
    overflow: "hidden"
}

const modalStyle={
    border: "1px solid black",
    backgroundColor:'white',
    fontSize:"15px",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:'translate(-50%,-50%)',
    width: "50%",
    maxWidth: "800px",
    minHeight: "30%",
    zIndex: "10",
    textAlign: "center",
    padding: "50px",
    overflow: "auto"
}

const closeStyle = {
    position: "absolute",
    top: "-25px",
    right: "10px",
    fontWeight: "100",
    color: "black",
    padding: "15px",
    cursor: "pointer",
    fontSize: "1.5em"
}

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

export default function Modal__x(props) {

    const {modalOpen, setModalOpen, content} = props;

    const navigate = useNavigate();

    const handleClick = () => {
        setModalOpen(false);
    }

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
        setModalOpen(false);
        navigate(`../${target}`, { replace: false });
    }

    const dynamicBackStyle = {...backStyle, ...{display: modalOpen ? "block":"none"}};

    if (!modalOpen) {
        return (<></>)
    } else {
    return (
        <div className="backModal" style={dynamicBackStyle} onClick={handleClick}>
        <div className="modal" style={modalStyle}>
            <p className="close" style={closeStyle} onClick={handleClick}>x</p>
            {props.content}
            {/* <h1 className="modalIcon" style={iconStyle}>🎉</h1>
            <h1> Nouvel employé ajouté!</h1>
            <button className="modalButton" style={buttonStyle} onClick={(e) => handleDialogClose(e, "new")}>Ajouter un nouvel employé</button>
            <button className="modalButton" style={buttonStyle} onClick={(e) => handleDialogClose(e, "list")}>Accéder à la liste des employés</button> */}
        </div>
        </div>
    )
    }
}