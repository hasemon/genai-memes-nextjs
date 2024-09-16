import React from 'react';
import {getCollection} from "@/lib/db";
import {ObjectId} from "mongodb";
import Meme from "@/components/Meme";

async function getMemes(id) {
    const collection = await getCollection('memes')
    return await collection.find({author: ObjectId.createFromHexString(id)}).sort({ _id: -1 }).toArray()
}

async function Dashboard({ user }) {
    const memes = await getMemes(user.user_id)
    return (
        <div className={'mx-auto space-y-6'}>
            <h1 className={'text-lg font-bold text-center'}>Your MEMES</h1>
            <div className={'grid grid-cols-2 gap-6'}>
                {memes.map((meme, index) => {
                    meme._id = meme._id.toString()
                    meme.author = meme.author.toString()
                   return <Meme key={index} meme={meme}/>
                })}
            </div>
        </div>
    );
}

export default Dashboard;