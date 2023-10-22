"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "1234",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resp = await signIn("credentials", {
      redirect: false,
      username: formValue.username,
      password: formValue.password,
      callbackUrl: "/",
    });

    if (resp?.ok) {
      router.push("/");
    } else {

      router.back();
    }
  };


  return (
    <>
      <div className="text-center" style={{ marginTop: '50px' }}>
        <h1>เข้าสู่ระบบ</h1>
      </div>


      <form onSubmit={onSubmit}>
        <div className="row">


          <div className="mb-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-md-12">
              <input
                required
                type="email"
                name="username"
                value={formValue.username}
                onChange={handleChange}
                placeholder="Email address"
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-md-12">
              <input
                required
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                placeholder="Password"
                className="form-control"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
          <br />
          <a className="mt-4" href="/signup">Sign up New User</a>
        </div>
      </form>



    </>
  );
}
