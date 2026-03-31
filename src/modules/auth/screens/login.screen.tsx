import { Link } from "react-router-dom";

function LoginSceen() {
  return (
    <fieldset className="fieldset">
      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" />
      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" />
      <div>
        <a className="link link-hover">Forgot password?</a>
      </div>
      <button className="btn btn-neutral mt-4">
        <Link to="/dashboard">Login</Link>
      </button>
    </fieldset>
  );
}

export default LoginSceen;
