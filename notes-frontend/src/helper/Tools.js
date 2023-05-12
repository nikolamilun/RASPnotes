export default function FindNoteWithID(array, id){
    array.forEach(element => {
        if(element.noteID == id)
            return element;
    });

    return null
}
