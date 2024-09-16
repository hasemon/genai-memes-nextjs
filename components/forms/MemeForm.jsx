'use client'

import React, {useState} from 'react'
import {useFormState, useFormAction} from "react-dom";
import {createMeme, editMeme} from "@/actions/MemeController";
import {CldUploadWidget} from "next-cloudinary";

export default function MemeForm(props) {

    const [signature, setSignature] = useState('')
    const [public_id, setPublic_id] = useState('')
    const [version, setVersion] = useState('')

    let formSubmitAction;
    if (props.action === 'create') formSubmitAction = createMeme
    if (props.action === 'edit') formSubmitAction = editMeme

    const [formState, formAction] = useFormState(formSubmitAction, {});
    return (
        <form action={formAction} className="max-w-xl mx-auto space-y-4">
            <label className="input input-bordered flex items-center gap-2">
                Line 1:
                <input
                    type="text"
                    className="grow"
                    name={"line1"}
                    defaultValue={props.meme?.line1}
                    placeholder="First line"
                />
            </label>
            {formState.errors?.line1 && (
                <div role="alert" className="alert alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{formState.errors?.line1}</span>
                </div>
            )}
            <label className="input input-bordered flex items-center gap-2">
                Line 2:
                <input
                    type="text"
                    name={"line2"}
                    className="grow"
                    defaultValue={props.meme?.line2}
                    placeholder="Second line"
                />
            </label>
            {formState.errors?.line2 && (
                <div role="alert" className="alert alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{formState.errors?.line2}</span>
                </div>
            )}
            <label className="input input-bordered flex items-center gap-2">
                Line 3:
                <input
                    type="text"
                    name={"line3"}
                    className="grow"
                    defaultValue={props.meme?.line3}
                    placeholder="Third line"
                />
            </label>
            {formState.errors?.line3 && (
                <div role="alert" className="alert alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{formState.errors?.line3}</span>
                </div>
            )}
            <div className={'mb-4'}>
                <CldUploadWidget
                    onQueuesEnd={(result, {widget}) => {
                        widget.close()
                    }}
                    onSuccess={(result, {widget}) => {
                        setSignature(result?.info.signature)
                        setPublic_id(result?.info.public_id)
                        setVersion(result?.info.version)
                    }}
                    signatureEndpoint='/widget-signature'>
                    {({open}) => {
                        const handleClick = (e) => {
                            e.preventDefault()
                            open();
                        };
                        return (
                            <button className={'btn btn-neutral'} onClick={handleClick}>
                                Upload an Image
                            </button>
                        );
                    }}
                </CldUploadWidget>
            </div>

            <input type={'hidden'} name={'public_id'} value={public_id}/>
            <input type={'hidden'} name={'version'} value={version}/>
            <input type={'hidden'} name={'signature'} value={signature}/>
            <input type={'hidden'} name={'memeId'} defaultValue={props.meme?._id.toString()}/>
            <button className="btn btn-primary capitalize">Submit</button>
        </form>
    );
}
