"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignin = () => {
    router.push("/signin");
  };
  if (session && session.user)
    return (
      <>
        <p>{session.user.name}</p>
        <button className="btn btn-danger">SignOut</button>
      </>
    );
  return (
    <>
      <button onClick={handleSignin} className="btn btn-success">
        SignIn
      </button>
    </>
  );
};
export default SigninButton;
