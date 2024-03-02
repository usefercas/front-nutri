import { object, string } from 'yup';
import { useFormik } from 'formik';
import { register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

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
    <div className="container mt-5">
      <h1 className='text-center font-bold text-3xl mb-5'>Register your account</h1>
      <form onSubmit={formik.handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User name</label>
          <input
            id="username"
            name="username"
            type="text"
            className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
            placeholder="Ex: 'ejemplo'"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            placeholder="Ex: 'ejemplo@gmail.com'"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
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
          {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Create account</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
