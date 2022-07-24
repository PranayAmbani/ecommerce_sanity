

export const price=(data,direction)=>(
    data.sort((a,b)=>{
        const first =a.price
        const second =b.price
        const x=direction==='asc'?second:first
        const y=direction==='asc'?first:second
        if(x<y) return -1
        if(x>y) return 1
        return 0
    })
)