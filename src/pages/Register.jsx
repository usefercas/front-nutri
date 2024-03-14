import React from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Asegúrate de que la ruta del archivo CSS sea correcta

const userSchema = object({
  username: string().required('Required field'),
  email: string().email('Enter a valid email').required('Required field'),
  password: string().min(8, 'Password of at least 8 characters').required('Required field'),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      register(values)
        .then(() => navigate('/login'))
        .catch(err => console.error(err));
    },
    validationSchema: userSchema,
  });

  return (
    <div className="login-page bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <h3 className="mb-3">Register your account</h3>
          
                <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-left py-5 px-5">
                    <form onSubmit={formik.handleSubmit} className="row g-4">
                      <div className="col-12">
                        <label>User name<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                            placeholder="Ex: 'example'"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.username && formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
                      </div>
                      <div className="col-12">
                        <label>Email<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-envelope-fill"></i></div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                            placeholder="Ex: 'example@gmail.com'"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                      </div>
                      <div className="col-12">
                        <label>Password<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text"><i className="bi bi-lock-fill"></i></div>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                            placeholder="Ex: '12345678'"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary px-4 float-end mt-4">Create account</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-right">
                    <img src="/she.png" alt="Welcome Back" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
