import React from 'react';
import {getCollection} from "@/lib/db";
import {ObjectId} from "mongodb";
import {FilePenLine , Trash2} from "lucide-react";

async function getMemes(id) {
    const collection = await getCollection('memes')
    return await collection.find({author: ObjectId.createFromHexString(id)}).sort().toArray()
}

async function Dashboard({ user }) {
    const memes = await getMemes(user.user_id)

    return (
        <div className={'mx-auto space-y-6'}>
            <h1 className={'text-lg font-bold text-center'}>Your MEMES</h1>
            <div className={'flex items-center flex-wrap space-x-4'}>
                {memes.map((meme, index) => (
                    <div key={index} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">MEME No: {index + 1}</h2>
                            <ul className={'text-md'}>
                                <li>{meme.line1}</li>
                                <li>{meme.line2}</li>
                                <li>{meme.line3}</li>
                            </ul>
                            <div className="card-actions justify-end">
                                <button className="btn btn-ghost btn-sm"><FilePenLine /></button>
                                <button className="btn btn-ghost btn-sm"><Trash2 /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;