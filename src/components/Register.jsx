import { useState } from 'react';
import { registerUserToDB } from '../utils/db';

export default function Register({ switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Vui lòng nhập Email';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email không hợp lệ!';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập Mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải từ 6 ký tự trở lên!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = registerUserToDB(email, password);
    if (result.success) {
      setMessage('Đăng ký thành công! Hãy chuyển sang Đăng nhập.');
      setEmail('');
      setPassword('');
      setErrors({});
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div style={{ maxWidth: '350px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Đăng ký</h2>
      {message && <p style={{ color: message.includes('thành công') ? 'green' : 'red' }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Mật khẩu:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Đăng ký
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Đã có tài khoản? <button onClick={switchToLogin}>Đăng nhập</button>
      </p>
    </div>
  );
}