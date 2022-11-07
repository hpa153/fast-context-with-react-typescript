import useStore from "../hooks/useStore";

const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [fieldValue, setStore] = useStore((store) => store[value]);
  
  return (
    <div className="field">
      {value}: {""}
      <input
        value={fieldValue}
        onChange={(e) => setStore({[value]: e.target.value})}
      />
    </div>
  );
};

export default TextInput