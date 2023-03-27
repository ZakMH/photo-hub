import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Input, Label } from "../../components/ui";
import { signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cookies } = req;
  if (cookies["next-auth.session-token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default function LoginPage() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!form.username || !form.password) {
        return setError("Make sure to enter a valid username and password!");
      }
      const res = await signIn("credentials", {
        redirect: false,
        username: form.username,
        password: form.password,
        callbackUrl: `${window.location.origin}`,
      });
      if (res?.error) setError(res.error);

      if (res?.url) push("/");
    } catch (error) {
      setError("Something went wrong!");
      console.log({ error });
    }
  }

  return (
    <main className="w-full grid md:grid-cols-2">
      <div className="container flex justify-center items-center flex-col gap-8">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Welcome back</h1>
          <p className="">Welcome back! Please enter your details.</p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="w-full rounded-md bg-red-50 border-red-400 border-2 p-4 text-center text-red-500">
                <p className="">{error}</p>
              </div>
            )}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="username"
                id="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Remember for 30 days</Label>
              </div>
              <Button variant="link">Forgot password</Button>
            </div>
            <div className="flex flex-col gap-4">
              <Button type="submit" variant="default">
                Sign in
              </Button>
              <Button type="button" variant="outline">
                Sign in with Google
              </Button>
            </div>
            <div className="text-center">
              <p className="">
                Don&#39;t have an account?
                <span className="font-medium mx-2 hover:underline cursor-pointer">
                  Sign up for free
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <figure className="w-full h-screen hidden md:block overflow-hidden">
        <Image
          width={388}
          height={581}
          src="/login-side.jpg"
          alt=""
          className="object-cover w-full h-full"
        />
      </figure>
    </main>
  );
}
