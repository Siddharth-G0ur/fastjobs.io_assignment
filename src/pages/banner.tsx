import Image from "next/image"

export default function banner() {
    
    return (
        <div className="banner" >
        <div style={{ width: "79px", height: "79px" }}>
          <Image src="/logo.svg" width = "79"  height = "79" alt="lol"/>
        </div>
        <div className="banner1 " >
          <div style={{ width: "436px", height: "136px" ,display:"flex", flexDirection:"column" }} >
            <div className="txt1" >Congratulations!</div>
            <div className="txt2">Company XYZ is inviting you to take an interview</div>
          </div>
          <div style={{ width: "435px", height: " 82px" }} >
            <div className="txt3">Skills being assessed:</div>
            <div className="banner2  ">
              <div className="bubble bubble-txt" >UI/UX</div>
              <div className="bubble bubble-txt" > Product Design</div>
              <div className="bubble bubble-txt" >Motion Graphics</div>
            </div>
          </div>
          <div className="bubble-txt"> Don’t be nervous.</div>
        </div>
      </div>
    )
}