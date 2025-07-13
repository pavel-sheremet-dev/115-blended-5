'use client';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // перевірка сессії на клієнті для того, щоб мати актуальний стан аутентифікації для подальшого відображення потрібного інтерфейсу.
  // стан isRefreshing ???

  return children;
};

export default AuthProvider;
