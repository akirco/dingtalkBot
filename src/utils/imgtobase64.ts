export function imgToBase64(file:any){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            resolve(reader)
        }
        reader.onerror = reject
    })
}