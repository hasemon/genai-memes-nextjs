'use client'

import React from 'react'
import { useFormState, useFormAction } from "react-dom";
import { createMeme } from "@/actions/MemeController";

export default function MemeForm() {
        const [formState, formAction] = useFormState(createMeme, {});
    return (
      <form action={formAction} className="max-w-xl mx-auto space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          Line 1
          <input
            type="text"
            className="grow"
            name={"line1"}
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
          Line 2
          <input
            type="text"
            name={"line2"}
            className="grow"
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
          Line 3
          <input
            type="text"
            name={"line3"}
            className="grow"
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
        <button className="btn btn-primary capitalize">create meme</button>
      </form>
    );
}
