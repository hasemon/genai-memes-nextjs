'use server'

import { getUserFromCookie } from "@/lib/getUser";
import {redirect} from "next/navigation";
import {ObjectId} from "mongodb";
import {getCollection} from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function AlphaNumericWithBasics (text) {
    const regex = /^[a-zA-Z0-9 .,]*$/
    return regex.test(text)
}


async function memeLogic(formData, user) {
    const errors = {}
    const ourMeme = {
        line1: formData.get('line1'),
        line2: formData.get('line2'),
        line3: formData.get('line3'),
        author: ObjectId.createFromHexString(user.user_id)
    }

    if (typeof ourMeme.line1 != 'string') ourMeme.line1 = ''
    if (typeof ourMeme.line2 != 'string') ourMeme.line2 = ''
    if (typeof ourMeme.line3 != 'string') ourMeme.line3 = ''

    ourMeme.line1 = ourMeme.line1.replace(/(\r\n|\n|\r)/g, '')
    ourMeme.line2 = ourMeme.line2.replace(/(\r\n|\n|\r)/g, '')
    ourMeme.line3 = ourMeme.line3.replace(/(\r\n|\n|\r)/g, '')

    ourMeme.line1 = ourMeme.line1.trim()
    ourMeme.line2 = ourMeme.line2.trim()
    ourMeme.line3 = ourMeme.line3.trim()

    if (ourMeme.line1.length < 5) {
        errors.line1 = 'Line 1 must be at least 5 characters'
    }
    if (ourMeme.line1.length > 25) {
        errors.line1 = 'Line 1 must be less than 25 characters'
    }

    if (ourMeme.line2.length < 7) {
        errors.line2 = 'Line 2 must be at least 7 characters'
    }
    if (ourMeme.line2.length > 30) {
        errors.line2 = 'Line 2 must be less than 30 characters'
    }

    if (ourMeme.line3.length < 5) {
        errors.line3 = 'Line 3 must be at least 5 characters'
    }
    if (ourMeme.line3.length > 30) {
        errors.line3 = 'Line 3 must be less than 30 characters'
    }

    if (!AlphaNumericWithBasics(ourMeme.line1)) {
        errors.line1 = 'Spacial symbols are not allowed'
    }
    if (!AlphaNumericWithBasics(ourMeme.line2)) {
        errors.line2 = 'Spacial symbols are not allowed'
    }
    if (!AlphaNumericWithBasics(ourMeme.line3)) {
        errors.line3 = 'Spacial symbols are not allowed'
    }
    if (ourMeme.line1.length === 0) {
        errors.line1 = 'Line 1 is required'
    }
    if (ourMeme.line2.length === 0) {
        errors.line2 = 'Line 2 is required'
    }
    if (ourMeme.line3.length === 0) {
        errors.line3 = 'Line 3 is required'
    }

    const expectedSignature = cloudinary.utils.api_sign_request({public_id: formData.get('public_id'), version: formData.get('version') }, cloudinaryConfig.api_secret);
    if (expectedSignature === formData.get('signature')) {
        ourMeme.photo = formData.get('public_id')
    }

    return {
        errors,
        ourMeme
    }

}


export async function createMeme(prevState, formData) {
    const user = await getUserFromCookie()
    if (!user) {
        redirect('/')
    }

    const results = await memeLogic(formData, user)

    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return {errors: results.errors}
    }

    // save to database
    const memeCollection = await getCollection('memes')
    const meme = await memeCollection.insertOne(results.ourMeme)
    return redirect('/')
}

export async function editMeme(prevState, formData) {
    console.log(formData)
    const user = await getUserFromCookie()
    if (!user) {
        redirect('/')
    }

    const results = await memeLogic(formData, user)

    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return {errors: results.errors}
    }

    // save to database
    const memeCollection = await getCollection('memes')
    let memeId = formData.get('memeId')
    if (typeof memeId != 'string') memeId = ''
    // author is the creator
    const pendingMeme = await memeCollection.findOne({_id: ObjectId.createFromHexString(memeId)})
    if (pendingMeme.author.toString() !== user.user_id){
        return redirect('/')
    }
    await memeCollection.findOneAndUpdate({_id: ObjectId.createFromHexString(memeId)}, {$set: results.ourMeme})
    return redirect('/')
}

export async function deleteMeme(formData) {
    const user = await getUserFromCookie()
    if (!user) {
        redirect('/')
    }
    const memeCollection = await getCollection('memes')
    let memeId = formData.get('id')
    if (typeof memeId != 'string') memeId = ''
    // author is the creator
    const pendingMeme = await memeCollection.findOne({_id: ObjectId.createFromHexString(memeId)})
    if (pendingMeme.author.toString() !== user.user_id){
        return redirect('/')
    }

    await memeCollection.deleteOne({_id: ObjectId.createFromHexString(memeId)})
    return redirect('/')
}