import chestMenu from "../chestMenu";
import type { ArgumentBlock, Item, Number, Text } from "../../../template";
import ContextMenu from "../../../../main/context";
import { code } from "../../edit";
import { minecraftColorHTML } from "../../../../main/main";

export default abstract class ChestItem {
    backgroundUrl : string;
    item : Item;

    abstract movable : boolean;

    constructor(item : Item){
        this.item = item;
    }


    abstract contextMenu(Block : number,Slot : number) : ContextMenu;

    /**
     * Get the representation of the item as a HTML element.
     */
    abstract icon() : HTMLDivElement;

    /**
     * A HTML div with all the tooltip information.
     */
    abstract tooltip() : HTMLDivElement;

    /**
     * Returns the data in the item as a human readable string.
     */
    abstract repr() : string;

    /**
     * Dynamically get the item based of it's type.
     * @param item The item to parse.
     * @returns Any type of item, matching the type of the item.
     */
    static getItem(item : Item){
        return getItem(item);
    }
}

export class UnknownItem extends ChestItem {
    backgroundUrl = 'https://dfonline.dev/public/images/BARRIER.png';
    item: Item;

    movable = false;

    constructor(item: Item){
        super(item);
    }

    contextMenu(_Block : number, _Slot: number): ContextMenu {
        return new ContextMenu('Unknown',[],true);
    }

    icon(){
        const itemElement = document.createElement('div');

        itemElement.style.backgroundImage = `url(${this.backgroundUrl})`;
        itemElement.classList.add('fadepulse');

        return itemElement
    }

    tooltip(){
        const tooltip = document.createElement('div');
        tooltip.innerText = `This item couldn't be parsed.`;
        tooltip.style.color = '#ff0000';
        return tooltip;
    }

    repr(): string {
        return `unkown ${this.item}`;
    }
}

/** This is for use in the click event. */
function deleteItem(Block : number, Slot : number, ctxBox : ContextMenu){
    const block = code.blocks[Block] as ArgumentBlock;
    const index = block.args.items.findIndex(slot => slot.slot === Slot);
    block.args.items.splice(index,1);
    chestMenu(Block);
    ctxBox.close();
}
/** This if for use in the keydown event */
function nameEditor(item: any, Slot: number, event: KeyboardEvent, value: HTMLInputElement, ctxBox: ContextMenu){
    if(event.key === 'Enter'){
        item.data.name = value.value;
        chestMenu(Slot);
        ctxBox.close();
    }
    if(event.key === 'Escape'){
        ctxBox.close();
    }
}

export class Num extends ChestItem {
    backgroundUrl = 'https://dfonline.dev/public/images/SLIME_BALL.png';
    item : Number;

    movable = true;

    constructor(item : Number){
        super(item);
    }

    contextMenu(Block: number, Slot: number): ContextMenu {
        const value = document.createElement('input');

        value.value = this.item.data.name;
        value.onkeydown = e => nameEditor(this.item, Slot, e, value, ctxBox);
        value.onclick = e => e.stopPropagation();

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteItem(Block,Slot,ctxBox);

        const ctxBox = new ContextMenu('Number',[value,deleteButton]);

        return ctxBox;
    }

    icon(){
        const itemElement = document.createElement('div');
        
        itemElement.style.backgroundImage = `url(${this.backgroundUrl})`;
        const count = document.createElement('span');
        count.innerText = this.item.data.name;
        count.style.color = "rgb(255, 85, 85)"
        itemElement.append(count);
        
        return itemElement
    }

    tooltip(): HTMLDivElement {
        const tooltip = document.createElement('div');
        tooltip.innerText = `${this.item.data.name}`;
        tooltip.style.color = 'rgb(255, 85, 85)';
        return tooltip;
    }

    repr(): string {
        return `num ${this.item.data.name}`;
    }
}

export class Txt extends ChestItem {
    backgroundUrl = 'https://dfonline.dev/public/images/BOOK.png';
    item : Text;

    movable = true;

    constructor(item : Text){
        super(item);
    }

    contextMenu(Block: number, Slot: number): ContextMenu {
        const value = document.createElement('input');

        value.value = this.item.data.name;
        value.onkeydown = e => nameEditor(this.item,Slot,e,value,ctxBox);
        value.onclick = e => e.stopPropagation();

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteItem(Block,Slot,ctxBox);

        const ctxBox = new ContextMenu('Text',[value,deleteButton]);

        return ctxBox;
    }

    icon(){
        const itemElement = document.createElement('div');
        itemElement.style.backgroundImage = `url(${this.backgroundUrl})`;
        return itemElement
    }

    tooltip(): HTMLDivElement {
        const tooltip = document.createElement('div');
        minecraftColorHTML(this.item.data.name).forEach(color => tooltip.append(color));
        return tooltip;
    }

    repr(): string {
        return `txt ${this.item.data.name.replace('\n','\\n')}`;
    }
}

/* 
TODO: Variable
TODO: Location
TODO: Vector
TODO: Potion
TODO: Sound
TODO: Game Value
TODO: Particle
TODO: Items
TODO: Block Tags
*/

function getItem(item : Item){
    switch(item.id){
        case 'num': return new Num(item);
        case 'txt': return new Txt(item);
        default: return new UnknownItem(item);
    }
}