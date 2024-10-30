



gsap.to("#nav",{
    backgroundColor:"grey",
    height:"80px",
    duration:0.7,
    scrollTrigger:{
        trigger:"#nav",
        scroller:"body",
        // markers:true,
        start:"top -70%",
        end:"top -11%",
        scrub:2
    }
})

gsap.to("#main",{
    backgroundColor: "#000",
    scrollTrigger:{
        trigger:"#main",
        scroller:"body",
        markers:true,
        start:"top -60%",
        end:"top -30vh",
        scrub:2
    }
})