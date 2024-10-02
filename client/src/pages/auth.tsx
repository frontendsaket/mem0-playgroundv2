import { GoogleLogin } from "@react-oauth/google";

const Auth = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
      ;
    </div>
  );
};

export default Auth;
