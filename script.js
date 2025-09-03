const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function  firstPageAnim(){
    var t1 = gsap.timeline();
    t1.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
    })
    .from("#herofooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })
}

var timeout;
function  circleChaptakaro(){
    var xscale =1;
    var yscale =1;
    var xprev =0;
    var yprev =0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev =dets.clientX;
        yprev =dets.clientY;
            circleMouseFollower(xscale,yscale); 
            SetTimeout(function(){
            timeout =document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
            
            },100)
            
    });
}


    function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform =
            `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;

    const image = elem.querySelector("img");

    // Ensure the image is initially hidden and absolutely positioned
    image.style.position = "absolute";
    image.style.pointerEvents = "none"; // optional: makes image not block mouse events

    elem.addEventListener("mouseleave", function () {
        gsap.to(image, {
            opacity: 0,
            ease: "power3.out",
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        let bounds = elem.getBoundingClientRect();
        let diff = dets.clientY - bounds.top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        const imageWidth = image.offsetWidth;
        const imageHeight = image.offsetHeight;

        gsap.to(image, {
            opacity: 1,
            ease: "power3.out",
            duration: 0.5,
            top: diff - imageHeight / 2,
            left: dets.clientX - bounds.left - imageWidth / 2,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.3),
        });
    });
});


circleChaptakaro();
circleMouseFollower();
firstPageAnim();