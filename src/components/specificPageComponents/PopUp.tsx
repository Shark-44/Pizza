

interface PopUpProps {
  openPopUp: boolean;
  closePopUp: () => void;
}

const PopUp = ({ openPopUp, closePopUp }: PopUpProps) => {

  
  const handlelosePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; 
    if (target.id === 'ModelContainer') {
      closePopUp();
    }
  }

  if (!openPopUp) return null;

  return (
    <div
      id="ModelContainer"
      onClick={handlelosePopUp}
      className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm"
    >
      <div
        className="p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5"
      >
        <div className="w-full p-3 justify-center items-center">
          <h2 className="font-semibold py-3 text-center text-xl">
            Utilisateur a été créé
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
