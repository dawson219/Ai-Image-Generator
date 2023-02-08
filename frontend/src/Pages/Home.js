import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader";
import FormField from "../Components/FormField";
import Card from "../Components/Card";
import axios from "axios";
import { headers } from "../Data/axiosData";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState(""); 
  const [searchedResults, setSearchResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(()=>{
    const fetchPosts = async ()=>{
      setLoading(true)

      try{
        const res = await axios.get("http://localhost:8080/api/v1/post", headers)
        console.log(res)
        if(res.data){
          setAllPosts(res.data.data.reverse());
        }
      }
      catch(err){
        console.log(err)
      }
      finally{
        setLoading(false)
      }
    }

    fetchPosts()
  },[])

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(()=>{
      const searchResults = allPosts.filter((item)=>{
        return item.name.toLowerCase().includes(searchText.toLocaleLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase())
      })

      setSearchResults(searchResults)
    }, 500))
  }

  const RenderCards = ({data, title}) =>{
    if(data?.length > 0){
        return (
            data?.map((post) => {
                return <Card key={post._id} {...post} />
            })
        )
    }

    return (
        <h2 className="font-bold mt-5 text-xl-uppercase text-[#6469ff]">{title}</h2>
    )
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse Through a Collection of Imaginative and Visually Stunning
          Images generated by DALL-E AI 
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName={"Search Posts"}
          type={"text"}
          name={"text"}
          placeholder={"Search by name or prompt"}
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {
            loading ? (
                <div className="flex justify-center items-center">
                    <Loader/>
                </div>
            )
            : (
                <>
                    {
                        searchText && (
                            <h2 className="font-medium text-[#666e75 text-xl mb-3]">
                                Showing Results for <span className="text-[#222328]">{searchText}</span>
                            </h2>
                        )
                    }
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gris-cols-1 gap-3">
                        {
                            searchText 
                            ?   <RenderCards data={searchedResults} title={"No Search Results Found"}/>
                            :   <RenderCards data={allPosts} title={"No Posts Found"}/>
                        }
                    </div>
                </>
            )
        }
      </div>
    </section>
  );
};

export default Home;