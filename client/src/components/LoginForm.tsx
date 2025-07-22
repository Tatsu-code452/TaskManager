import React, { useState } from 'react';
import type { LoginFormProps } from '../types';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, errorMessage, isLoading }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userId, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ユーザID</label>
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
      </div>
      <div>
        <label>パスワード</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button type="submit" disabled={isLoading}>ログイン</button>
    </form>
  );
};

export default LoginForm;
