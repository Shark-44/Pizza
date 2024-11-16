import LoginCard from "../components/specificPageComponents/LoginCard";
import { useAuthContext } from "../contexts/authContexts";

const Admin = () => {
    const { user } = useAuthContext();

    return (
        <div>
            {user? (<h2>Bienvenu</h2>):(<LoginCard />)}
            
        </div>
    )

}

export default Admin;