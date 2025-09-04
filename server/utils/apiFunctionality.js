export class APIFunctionality{
    constructor(query,queryStr){
        console.log("at api constructor and the query is ",queryStr)
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"1"
            }
        }:{};
        console.log("keyword is ",keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr};
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);
        console.log("query copy is ",queryCopy);
        this.query=this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

    
