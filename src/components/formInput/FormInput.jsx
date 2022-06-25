import './formInput.scss';

const FormInput = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div className='formInput'>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete='off'
        required
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
