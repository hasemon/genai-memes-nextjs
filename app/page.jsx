
import { getUserFromCookie } from "@/lib/getUser";
import RegisterForm from '../components/forms/RegisterForm'
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const user = await getUserFromCookie();
  return (
    <div className="space-y-10">
      {user && (
        <Dashboard user={user}/>
      )}
      {!user && (
        <>
          <p className="text-center">
            Don&rsquo;t have an account?{" "}
            <strong className="underline underline-offset-4">Create one</strong>{" "}
          </p>
          <RegisterForm />
        </>
      )}
    </div>
  );
}
