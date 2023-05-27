export default function FindNoteWithID(array, id){
    let returnValue = null;

    array.forEach((element) => {
        if(element.noteID == id)
            returnValue = element;
    });

    return returnValue;
}
