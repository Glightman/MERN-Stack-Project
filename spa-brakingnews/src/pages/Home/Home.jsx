import { Navbar } from "../../assets/components/Navbar/Navbar";
import { useState, useEffect } from "react";


export default function Home() {

    const [news, setNews] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/post').then(response => response.json()).then(data => console.log(data.results)).catch((err) => console.log(err))
            
    }, [])

    return (
    <>
        <Navbar />
        <h1>olá Home</h1>
    </>)
    
}