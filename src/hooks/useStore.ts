import { 
  useContext, 
  useSyncExternalStore 
} from "react";

import StoreContext from "../store/StoreContext";
import { Store } from "../store/StoreProvider";

// Custom hook to simulate useState
// Use a function to update only 1 field instead of whole store
const useStore = function <SelectorOutput>(selector: (store: Store) => SelectorOutput): [SelectorOutput, (value: Partial<Store>) => void] {
  const store = useContext(StoreContext);

  if(!store) {
    throw new Error("Store not found");
  }

  // Replace state from useState
  // provide changes upon change like useEffect
  // and return clean-up funtion to unsubscribe
  // Same as:
  /*
    const [state, setState] = useState(store.get());

    useEffect(() => {
      return store.subscribe(() => setState(store.get()));
    }, []);
  */
  const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

  return [state, store.set];
}

export default useStore;