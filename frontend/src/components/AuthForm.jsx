const AuthForm = ({
    formUsername,
    setFormUsername,
    formPassword,
    setFormPassword,
    handleRegister,
    handleLogin,
    errorMsg,
}) => (
    <div>
    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    <input
      type='text'
      placeholder='Username'
      value={formUsername}
      onChange={(e) => setFormUsername(e.target.value)}
    />
    <input
      type='password'
      placeholder='Password'
      value={formPassword}
      onChange={(e) => setFormPassword(e.target.value)}
    />
    <button onClick={handleRegister} disabled={!formUsername || !formPassword}>Sign Up</button>
    <button onClick={handleLogin} disabled={!formUsername || !formPassword}>Login</button>
  </div>
);

export default AuthForm;