import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";
import MemeForm from "../../components/forms/MemeForm";

export default async function Page() {
    const user = await getUserFromCookie();
    if (!user) {
        return redirect('/');
    }

    return (
        <>
            <div className="space-y-10">
                <p className="text-center">Create a Meme!</p>
                <MemeForm />
            </div>
        </>
    );
}
