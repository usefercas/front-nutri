import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "./Login.css"; // Asegúrate de que la ruta del archivo CSS es correcta

// Esquema de validación
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      // Simula el proceso de inicio de sesión
      login(values)
        .then(() => navigate('/profile')) // Navega al perfil después de iniciar sesión
        .catch(error => console.error(error));
    },
  });

  return (
    <div className="login-page" style={{ backgroundImage: "url('/use.png')" }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <h3 className="mb-3">Login Now</h3>
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-left py-5 px-5">
                    <form onSubmit={formik.handleSubmit} className="row g-4">
                      <div className="col-12">
                        <label>Email<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-envelope-fill"></i></div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                      </div>

                      <div className="col-12">
                        <label>Password<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-lock-fill"></i></div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary px-4 float-end mt-4">Login</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-right">
                    <img src="/coci.png" alt="Welcome Back" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;