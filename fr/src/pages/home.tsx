import { useRouter } from "next/router"

export default function Home() {
    const router = useRouter()

    const onTest = ()=> {
      router.push("/blog/123/44")
      console.log("klik")
    }

    return (
      <>
        <button type="button" onClick={()=>onTest()}>Home
        </button>
    </>
    )
  }