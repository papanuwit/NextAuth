"use client";
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: '',
    name: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });
    if (resp.ok) {

      const data = await resp.json();
      console.log('User registered:', data);

      router.push("/");
    } else {

      router.back();
    }
  };

  return (
    <>
      <div className="text-center" style={{ marginTop: '60px' }}>
        <h1>ลงทะเบียนผู้ใช้</h1>
      </div>
      

   
      <form onSubmit={onSubmit} className='mt-4'>
        <div className="mb-3">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-12">
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
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-12">
            <input
              required
              type="name"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-12">
            <input
              required
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary w-100 mt-4">Register</button>
          </div>
        </div>

        
      </form>
    
    </>
  );
}