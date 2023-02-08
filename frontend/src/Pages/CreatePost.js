import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { headers } from "../Data/axiosData";

import { preview } from "../Assets";
import FormField from "../Components/FormField";
import Loader from "../Components/Loader";
import { getRandomPrompt } from "../Utilities";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(form.prompt && form.photo){
      setLoading(true);
      try{
        const reqBody = {
          ...form
        }
        await axios.post("http://localhost:8080/api/v1/post", reqBody, headers)

        navigate("/")
      }
      catch(err){
        console.log(err)
      }
      finally{
        setLoading(false)
      }
    }
    else{
      alert("Please Enter a form and generate an image")
    }
  };

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  };

  const handleSuprriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  };

  const generateImage = async () => {
    if(form.prompt){
      try{
        const reqBody = {
          prompt: form.prompt,
        }

        setGeneratingImage(true)
        const res = await axios.post("http://localhost:8080/api/v1/dalle", reqBody, headers)
        setGeneratingImage(false)

        const data = res.data.photo;

        setForm({...form, photo: `data:image/jpeg;base64,${data}`})
      }
      catch(err){
        console.log(err);
      }
      finally{
        setGeneratingImage(false);
      }
    }
    else{
      alert("Please Enter a Prompt")
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create Imaginative and Visually Stunning Images generated using DALL-E
          AI ans share them with the community
        </p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mt-16 max-w-3xl"
      >
        <div className="flex flex-col gap-5">
          <FormField
            labelName={"Your Name"}
            type={"text"}
            name={"name"}
            value={form.name}
            placeholder={"Enter your name..."}
            handleChange={handleChange}
          />
          <FormField
            labelName={"Prompt"}
            type={"text"}
            name={"prompt"}
            value={form.prompt}
            placeholder={"an armchair in the shape of an avocado"}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSuprriseMe}
          />
          <div
            className="relative bg-gray-50 border border-gray-300 text-gray-900 
            rounded-lg text-sm w-64 p-3 h-64 flex justify-center items-center focus:ring-blue-500 focus:border-blue-500"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={"preview"}
                className="h-9/12 w-9/12 object-contain opacity-40"
              />
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 gap-5 flex">
          <button
          type="button"
            onClick={() => {
              generateImage();
            }}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 5 text-center"
          >
            {generatingImage ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666675] text-[14px]">
            Once you have created the image you want, you can share it with the
            community
          </p>
          <button
            type="submit"
            className="mt-3 text-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 5 text-center bg-[#6469ff]"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
