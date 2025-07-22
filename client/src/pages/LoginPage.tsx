import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userId: string, password: string) => {
    setIsLoading(true);
    // TODO: 認証API呼び出し
    setIsLoading(false);
    // 成功時は遷移、失敗時はsetErrorMessage
  };

  return (
    <div>
      <h2>ログイン</h2>
      <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
