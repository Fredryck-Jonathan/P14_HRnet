
function modal() {

    // Fonction qui permet d'ajjouter ou enlever à une classlist la class "active"
    function toggleModalHome(e) {
        e.preventDefault();
        const modalDiv = e.currentTarget.closest('.modal-div');
        modalDiv.classList.toggle('active')
    }

    return (
        
        <div className="modal-div">
            <div className="modal-div-content">
                <p className="message-modal"></p>
                <button onClick={(e) => {toggleModalHome(e)}} className="button-modal"><ion-icon name="close-outline"></ion-icon></button>
            </div>
        </div>


    )



}

export default modal