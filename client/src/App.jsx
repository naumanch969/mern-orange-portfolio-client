import { useStateContext } from "./contexts/ContextProvider"

import Admin from "./Admin/Admin"
import User from "./User/User"

const App = () => {

  const { mode } = useStateContext()

  return (
    <div className="bg-black " >

      {
        mode == 'admin'
          ?
          <Admin />
          :
          <User />
      }

    </div>
  );
};

export default App;