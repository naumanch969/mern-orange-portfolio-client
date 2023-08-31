import { useStateContext } from "./contexts/ContextProvider"

// import Admin from "./Admin/Admin"
// import User from "./User/User"
import Hover from "./utils/Hover/Hover";

const App = () => {

  const { mode } = useStateContext()

  return (
    <div className="bg-black flex justify-center items-center h-[20rem] " >


      {/* {
        mode == 'admin'
          ?
          <Admin />
          :
          <User />
      } */}

    </div>
  );
};

export default App;