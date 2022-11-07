import { 
  useRef, 
  useCallback, 
} from "react";

import StoreContext from "./StoreContext";

// Type for store
export type Store = {
  first: "",
  last: "",
};

const useStoreData = (): {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void;
} => {
  // UseRef to get the store but not re-render on changes
  const store = useRef<Store>({
    first: "",
    last: "",
  });

  // useCallback to avoid re-rendering upon changed returned object if put in dependency array
  const get = useCallback(() => store.current, []);

  // Use Set to avoid subscribing to same function multiple times
  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<Store>) => {
    store.current = {...store.current, ...value};

    // Call subscriber to actually set the store
    subscribers.current.forEach((callback) => callback());
  }, []);

  // Method to add a subscribe method to the Set and return a function to unsubscribe (delete)
  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe
  };
}

// Use the type returned by function as type for the context
export type useStoreDataReturnType = ReturnType<typeof useStoreData>;

// Provider
const StoreProvider = ({children} : {children: React.ReactNode}) => {
  return (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  )
}

export {
  StoreContext
}

export default StoreProvider;