import LoginCard from "../components/specificPageComponents/LoginCard";
import TextWelcome from "../components/specificPageComponents/TextWelcome";
import { useAuthContext } from "../contexts/authContexts";

const Admin = () => {
    const { user } = useAuthContext();

    return (
        <div>
            {user? (<TextWelcome />):(<LoginCard />)}
            
        </div>
    )

}

export default Admin;