export const getImgPath=(fileName:string)=>{
    return `${import.meta.env.VITE_APP_API}/assets/${fileName}`
}