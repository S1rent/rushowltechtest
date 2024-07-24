import React, { useState } from "react";
import { useSubmitForm } from "./useSubmitForm";

export interface IFormStateProp {
  email: string;
  password: string;
}

const Form: React.FC = () => {
  const { data: responseData, submitData } = useSubmitForm();
  const [data, setData] = useState<IFormStateProp>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateData = () => {
    const trimmedEmail = data.email.trim();
    const trimmedPassword = data.password.trim();
    const atIndex = trimmedEmail.indexOf("@");
    const dotIndex = trimmedEmail.indexOf(".", atIndex);

    if (trimmedEmail.length === 0) {
      return "Email cannot be empty.";
    } else if (trimmedPassword.length === 0) {
      return "Password cannot be empty.";
    } else if (
      // Example Email validation
      atIndex < 0 || // At least one character before '@'
      trimmedEmail.split("").filter((x) => x === "@").length !== 1 || // Exactly one '@' symbol
      dotIndex < atIndex + 1 || // At least one character between '@' and '.'
      dotIndex > trimmedEmail.length - 1 // At least one character after the last '.'
    ) {
      return "Please input a valid email.";
    }
    return "";
  };

  const handleSubmit = async () => {
    const validationResult = validateData();
    const isError = validationResult?.length !== 0;

    setErrorMessage(validationResult);

    if (!isError) {
      await submitData(data);

      if (responseData?.statusCode === 200) {
        setSuccessMessage(responseData.message);
      }
    }
  };

  return (
    <div
      style={{
        height: "100%",
        position: "absolute",
        width: "100%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div>
        <h1>Email</h1>
        <input
          name="email"
          type="email"
          style={styles.textFieldStyle}
          value={data.email}
          onChange={(event) => {
            const value = event.target.value;
            setData({ ...data, email: value });
            setErrorMessage("");
            setSuccessMessage('');
          }}
        />
      </div>

      <div>
        <h1 style={{ padding: 0, margin: 0 }}>Password</h1>
        <input
          name="password"
          type="password"
          style={styles.textFieldStyle}
          value={data.password}
          onChange={(event) => {
            const value = event.target.value;
            setData({ ...data, password: value });
            setErrorMessage("");
            setSuccessMessage('');
          }}
        />
      </div>

      <button style={styles.buttonStyle} onClick={handleSubmit}>
        Login
      </button>

      {errorMessage !== "" && (
        <h3 style={{ margin: 0, color: "red" }}>{errorMessage}</h3>
      )}
      
      {successMessage !== "" && (
        <h3 style={{ margin: 0, color: "green" }}>{successMessage}</h3>
      )}
    </div>
  );
};

export default Form;

const styles = {
  textFieldStyle: {
    height: 32,
    borderRadius: 6,
    minWidth: 256,
    fontSize: 24,
    padding: 8,
  },
  buttonStyle: {
    marginTop: 32,
    height: 56,
    width: 312,
    borderRadius: 6,
    background: "black",
    color: "white",
    fontSize: 22,
    fontWeight: "bolder",
    border: 0,
    cursor: "pointer",
  },
};
