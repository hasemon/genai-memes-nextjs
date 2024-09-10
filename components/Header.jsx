import React from "react";

import Link from "next/link";
import {logout} from "@/actions/UserController";
import {getUserFromCookie} from "@/lib/getUser";

export default async function Header() {
    const user = await getUserFromCookie();
    return (
        <header className="bg-base-100 shadow">
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="flex-1">
                        <Link href="/" className="btn btn-ghost text-xl">
                            GENAI MEME
                        </Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal flex items-center space-x-2">
                            <li>
                                <Link href="/">Homepage</Link>
                            </li>
                            {!user && (
                                <li>
                                    <Link href="/login">Login</Link>
                                </li>
                            )}
                            {user && (
                                <>
                                    <li>
                                        <Link href={'create-meme'} className={'btn btn-sm btn-neutral'}>
                                            Create meme
                                        </Link>
                                    </li>
                                    <li>
                                        <form action={logout}>
                                            <button>Logout</button>
                                        </form>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
