import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Đăng nhập thành công!</h1>
      <p>Xin chào: <strong>{currentUser?.email}</strong></p>
      <button onClick={logout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Đăng xuất
      </button>
    </div>
  );
}