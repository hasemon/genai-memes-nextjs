'use client'

import React from 'react';
import Link from "next/link";
import {FilePenLine, Trash2} from "lucide-react";
import {deleteMeme} from "@/actions/MemeController";
import {CldImage} from "next-cloudinary";


function Meme({meme}) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className={'relative'}>
                <CldImage
                    width="650"
                    height="300"
                    src={meme?.photo}
                    fillBackground
                    crop={{type: 'pad', source: true}}
                    sizes="650px"
                    alt={meme?.author}
                    overlays={[
                        {
                            position: {
                                x: 100,
                                y: 50,
                                angle: -10,
                                gravity: 'north_west'
                            },
                            text: {
                                color: 'black',
                                fontFamily: 'Source Sans Pro',
                                fontSize: 32,
                                fontWeight: 'bold',
                                text: `${meme?.line1}%0A${meme?.line2}%0A${meme?.line3}`,
                            }
                        },
                        {
                            position: {
                                x: 105,
                                y: 48,
                                angle: -10,
                                gravity: 'north_west'
                            },
                            text: {
                                color: 'white',
                                fontFamily: 'Source Sans Pro',
                                fontSize: 32,
                                fontWeight: 'bold',
                                text: `${meme?.line1}%0A${meme?.line2}%0A${meme?.line3}`,
                            }
                        }
                    ]}
                />
            </figure>
            <div className="absolute -bottom-0 -right-0 card-body p-1 bg-red-600 text-gray-100 rounded-tl-lg backdrop-blur">
                <div className="card-actions divide-x justify-end">
                    <Link href={`/edit-meme/${meme._id.toString()}`}
                          className="btn btn-ghost btn-sm"><FilePenLine/>
                    </Link>
                    <form action={deleteMeme}>
                        <input name={"id"} type={'hidden'} defaultValue={meme._id.toString()}/>
                        <button className="btn btn-ghost btn-sm"><Trash2/></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Meme;