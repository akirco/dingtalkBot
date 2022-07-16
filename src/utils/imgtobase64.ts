export  function imgToBase64(file:Blob){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            resolve(reader)
        }
        reader.onerror = reject
    })
}