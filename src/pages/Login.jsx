import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const userSchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required('Required field'),
    password: Yup.string().min(8, 'Password of at least 8 characters').required('Required field')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      login(values).then(() => navigate('/profile'))
    }
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sign in to your account</h1>
      <form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ex: 'ejemplo@gmail.com'"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ex: '12345678'"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Sign in</button>
      </form>
    </div>
  );
}

export default Login;
