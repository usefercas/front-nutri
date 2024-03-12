import React from "react";
import { useFormik } from 'formik';
import { string, object } from 'yup';
import Button from "../components/Button";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importa tu archivo CSS si es necesario

const userSchema = object({
  email: string().email('Enter a valid email').required('Required field'),
  password: string().min(8, 'Password of at least 8 characters').required('Required field')
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      login(values)
        .then(() => navigate('/profile'))
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-header">
              <h1 className="text-primary text-center mb-0">Sign in your account</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <Button extraClassName="mt-4 btn btn-primary btn-block" disabled={!isValid} text="Sign in" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
