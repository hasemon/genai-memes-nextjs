import React from 'react';
import MemeForm from "@/components/forms/MemeForm";
import {getCollection} from "@/lib/db";
import {ObjectId} from "mongodb";
import {getUserFromCookie} from "@/lib/getUser";
import {redirect} from "next/navigation";

async function getDoc(id){
    const memeCollection = await getCollection('memes')
    return await memeCollection.findOne({_id: ObjectId.createFromHexString(id)})
}


async function Page(props) {
    const doc = await getDoc(props.params.id)
    const user = await getUserFromCookie()
    if (user.user_id !== doc.author.toString()){
        return redirect('/')
    }

    return (
        <div className={'space-y-6 mx-auto'}>
            <h2 className={'font-semibold text-center text-lg'}>Edit MEME</h2>
            <MemeForm meme={doc} action={'edit'} />
        </div>
    );
}

export default Page;