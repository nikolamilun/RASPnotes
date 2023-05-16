export default function FindNoteWithID(array, id){
    let returnValue;

    array.forEach((element) => {
        if(element.noteID == id)
            returnValue = element;
    });

    return returnValue;
}
