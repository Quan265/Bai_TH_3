const DB_KEY = 'USERS_DATABASE';

export const getUsersFromDB = () => {
  const users = localStorage.getItem(DB_KEY);
  return users ? JSON.parse(users) : [];
};

export const registerUserToDB = (email, password) => {
  const users = getUsersFromDB();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return { success: false, message: 'Email này đã được đăng ký!' };
  }

  const newUser = { id: Date.now(), email, password };
  users.push(newUser);
  localStorage.setItem(DB_KEY, JSON.stringify(users));

  return { success: true, message: 'Đăng ký thành công!' };
};

export const loginUserFromDB = (email, password) => {
  const users = getUsersFromDB();
  const user = users.find((u) => u.email === email && u.password === password);
  
  if (user) {
    return { success: true, user: { id: user.id, email: user.email } };
  }
  return { success: false, message: 'Email hoặc mật khẩu không chính xác!' };
};