

export async function getVideos(page?:number){
    try {
        const req = await fetch(`/api/proxy/videolists?page=${page}`, {
            method: "GET"
        });
        const data = await req.json();
        if(!data) return data
        return data;
    } catch (error) {
        return {success: false, message: "Something went wrong"}
    }
}


export async function getVideoSource(slug:string){
    try {
        const req = await fetch(`/api/proxy/video?slug=${slug}`, {
            method: "GET"
        });
        const data = await req.json();
        if(!data) return data
        return data;
    } catch (error) {
        return {success: false, message: "Something went wrong"}
    }
}


export async function getSarapbabe(page?:number){
     try {
        const req = await fetch(`/api/proxy/sarapList?page=${page}`, {
            method: "GET"
        });
        const data = await req.json();
        if(!data) return data
        return data;
    } catch (error) {
        return {success: false, message: "Something went wrong"}
    }
}

export async function getSarapSource(slug:string){
    try {
        const req = await fetch(`/api/proxy/sarapVideo?slug=${slug}`, {
            method: "GET"
        });
        const data = await req.json();
        if(!data) return data
        return data;
    } catch (error) {
        return {success: false, message: "Something went wrong"}
    }
}