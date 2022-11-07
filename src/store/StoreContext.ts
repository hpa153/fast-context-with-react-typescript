import { createContext } from "react";

import { useStoreDataReturnType } from "./StoreProvider";

const StoreContext = createContext<null | useStoreDataReturnType>(null);

export default StoreContext;