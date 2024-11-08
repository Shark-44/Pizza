import {useState} from "react"

function AdminPanel() {
  const [code, setCode] = useState('');
  const correctCode = '1234'; 

  const handleAccess = () => {
    if (code === correctCode) {
      return <AdminComponent />; 
    } else {
      return <Redirect to="/home" />; 
    }
  };

  return (
    <div>
      <h2>Accès Administrateur</h2>
      <input
        type="password"
        placeholder="Entrez le code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleAccess}>Entrer</button>
    </div>
  );
}

export default AdminPanel;
