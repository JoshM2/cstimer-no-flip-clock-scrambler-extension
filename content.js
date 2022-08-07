var scramble=document.getElementById("scrambleTxt");
var scrambleSize=scramble.style.fontSize;
var previousScramble = ""
var currentScramble = ""

var newScramble='<h1 id="newScramble" style="font-weight: normal"></h1>';
scramble.insertAdjacentHTML('afterend', newScramble);

checkEvent();

function checkEvent(){
    var events = document.getElementsByTagName("select");
    try{
        if (events[1].value=="clkwca" || events[32].value=="clkwca"){
            scramble.style.fontSize=0;
            waitFor(_ => document.getElementById("scrambleTxt").innerText != "Scrambling...")
                .then(_ => {
                    var currentScramble = document.getElementById("scrambleTxt").innerText;
                    if (currentScramble!=previousScramble){
                        previousScramble=currentScramble;
                        document.getElementById("newScramble").innerText=convertScramble(currentScramble);
                    }
                });
        }
        else {
            document.getElementById("newScramble").innerText="";
            scramble.style.fontSize=scrambleSize;
        }
    }
    catch(e){
        document.getElementById("newScramble").innerText="";
        scramble.style.fontSize=scrambleSize;
    } 
}

function convertScramble(s){
    const l = s.split(" ");
    var final=l[0]+" "+l[1]+" "+l[2]+" "+l[3]+" U("+l[4][1]+l[4][2]+","+l[12][1]+opposite(l[12][2])+") R("+l[5][1]+l[5][2]+","+l[11][1]+opposite(l[11][2])+") D("+l[6][1]+l[6][2]+","+l[10][1]+opposite(l[10][2])+") L("+l[7][1]+l[7][2]+","+l[13][1]+opposite(l[13][2])+") "+l[8]+" all"+l[14][3]+opposite(l[14][4])
    final=final.replace(/0-/g,"0+")
    final=final.replace(/6-/g,"6+")
    if(! l.includes("UL")){
        final+=" UR"
    }
    if(! l.includes("DL")){
        final+=" DR"
    }
    if(! l.includes("DR")){
        final+=" DL"
    }
    if(! l.includes("UR")){
        final+=" UL"
    }
    return(final);
}

function opposite(sign){
    if (sign=="+")
        return("-")
    if (sign=="-")
        return("+")
}

var mutationObserver = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        checkEvent();
    });
});

mutationObserver.observe(document.getElementById("scrambleTxt"), {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true, 
    characterDataOldValue: true
})

function waitFor(conditionFunction) {

    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }
  
    return new Promise(poll);
}




//Made by Joshua Marriott. 'Josh M#3108' on Discord
