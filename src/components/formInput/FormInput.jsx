import './formInput.scss';

const FormInput = ({ onChange, errorMessage, ...inputProps }) => {
  return (
    <div className='formInput'>
      <input {...inputProps} onChange={onChange} autoComplete='off' />
      <span>{errorMessage && errorMessage}</span>
    </div>
  );
};

export default FormInput;
