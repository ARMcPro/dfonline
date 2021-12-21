import { codeutilities, encode } from "../main/main";

window.onload = () => {
    (document.getElementById('send') as HTMLButtonElement).onclick = generateTheComment;
}

window.onkeydown = event => {
    if(event.key === "Enter"){
        (document.getElementById('send') as HTMLButtonElement).click();
    }
    if(event.key === "ArrowDown"){
        nextElement(1);
        return false;
    }
    if(event.key === "ArrowUp"){
        nextElement(-1);
        return false;
    }
}

function generateTheComment(){
    var code = {"blocks":[{"id":"block","block":"control","args":{"items":[]},"action":"","target":"","inverted":""}]};
    code['blocks'][0]['action'] = (document.getElementById('action') as HTMLInputElement).value
    code['blocks'][0]['target'] = (document.getElementById('target') as HTMLInputElement).value
    code['blocks'][0]['inverted'] = (document.getElementById('inverted') as HTMLInputElement).value
    codeutilities.send(
    JSON.stringify(
            {"type":"template","source":"DFOnline Comment Generator","data":
                JSON.stringify({"name":"§6Comment","data":encode(JSON.stringify(code))})
            }
        )
    );
}


function nextElement(move = 1){
    var elements = [...(document.querySelectorAll('.comment') as unknown as Array<HTMLElement>)];
    var current = elements.findIndex(x => x === document.activeElement);
    var newIndex = (current + move) % elements.length;
    newIndex = newIndex < 0 ? elements.length - 1 : newIndex;
    elements[newIndex].focus();
  }