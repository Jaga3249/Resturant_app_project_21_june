import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

import { MainContainer } from "./components/index";
import { CreateContainer } from "./components/index";
import { useEffect } from "react";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";

const App = () => {
  const [{ FoodItems }, dispatch] = useStateValue();

  const FetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        FoodItems: data,
      });
    });
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <AnimatePresence existBeforeEnter>
      {/* bg-primary  */}
      <div className="w-screen h-auto flex flex-col">
        <Header />

        <main className="mt-16 w-full p-6">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/CreateItem" element={<CreateContainer />} />
            <Route />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
