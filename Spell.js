import {Matchic} from "./Source/Matchic.js"

export class Spell{
    constructor(string, tions){
		this.pageQueue=[]
		this.newlines=0;
		if(tions['pageSize']&&tions['pageOn']){
			this.pagination(string, tions['pageSize'], tions['pageOn'])
		}
        
        Spell.prototype.nextLine= this.nextLine;
        Spell.prototype.nextParagraph= this.nextParagraph;
        Spell.prototype.nextSentance=this.nextSentance;
        Spell.prototype.nextInteger=this.nextInteger;
        Spell.prototype.nextFloat=this.nextFloat;
        Spell.prototype.nextScientific=this.nextScientific;
        Spell.prototype.nextOctet=this.nextOctet;
        Spell.prototype.nextHex=this.nextHex;
        Spell.prototype.nextCodeBlock=this.nextCodeBlock;
        Spell.prototype.nextFunction=this.nextFunction;
        Spell.prototype.nextHTML = this.nextHTML;
        Spell.prototype.up=this.up;
        Spell.prototype.iter=this.iter;
        Spell.prototype.init=this.init;
        Spell.prototype.matchic=this.matchic;

        this.opStack = [{'op#':0,'match':undefined, 'op': 'Spell', 'tions':tions, 'page':this.pageQueue[0]}];
		this.pageNumber=0;
        this.ugly_itr=0;
        this.Matchic = new Matchic();

    }
    init(string, tions){
        this.string=string;
        this.opStack.push({'op#':this.opStack.length-1, 'match':undefined, 'op': 'Spell', 'tions':tions, 'page':this.pageQueue[0]});
        this.ugly_itr=0;
        return this;
    }
	nextPage(){
		if(this.pageNumber < this.pageQueue.length-1){
			this.pageNumber+=1;
			return this.pageQueue[this.pageNumber]
		}
		return
	}
	pagination(string, pageSize, pageOn){
		var n = string.length;
		var pageCounter=0;
		var pageString="";
		for(var i = 0; i<n; i++){
			if((string[i]==pageOn) && (pageCounter!=pageSize-1)){
				//not the end of the page, but the counter goes up
				this.newlines+=1
				pageCounter+=1;
				pageString+=string[i];
			}else if((string[i]==pageOn) && (pageCounter==pageSize-1)){
				//end of the page, append to pageString, push page to pageQueue, clear pageString, reset pageCounter
				this.newlines+=1
				pageString+=string[i];
				//pageCounter+=1; //leave this here even though it doesnt matter, because we need to print it out sometimes to check pageCounter
				//console.log(pageCounter)
				this.pageQueue.push(pageString);
				pageString="";
				pageCounter=0;
			}else{
				//not the end of the page, just append to the pageString
				pageString+=string[i];//
			}
		}

		//THIS PUSHES THE LAST (HIDDEN) PAGE ON THE QUEUE
		this.pageQueue.push(pageString);

	}

    subStr(string, match){
        //this function should remove everything up until the match but nothing else
        return string.replace(match, '');
    }
    _next(match, cb, fn, tions){
        var currentState;
        if(match){
            currentState={
				'op#':this.opStack.length-1,
                "match":match,
                "op": fn, 
                "tions": tions,
                'page': this.subStr(
                    this.opStack[this.opStack.length-1]['page'], 
                    match
                )

            }
            this.opStack.push(currentState)
            if(cb){cb(match, fn, currentState, this.opStack)}
            return true

        }else{
			var nextPage= this.nextPage()
			if (nextPage){
				currentState={
					'op#':this.opStack.length-1,
					"match": undefined,
					"op": 'nextPage', 
					"tions": tions,
					'page': nextPage,
				}
				this.opStack.push(currentState)
				if(cb){cb(match, fn, currentState, this.opStack)}
				return true
			}else{
				currentState={
					'op#':this.opStack.length-1,
					"match": undefined,
					"op": fn, 
					"tions": tions,
					'page': undefined

				}
				this.opStack.push(currentState)
				if(cb){cb(match, fn, currentState, this.opStack)}
			}
            
            return
        }
    }
    
    nextLine(cb, tions){
        //separated by one newline
        var match = new Matchic().nextLine(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same functino
        if (!this._next(match, cb, 'nextLine', tions)){this.ugly_itr=0;}
        return this;
    }

    nextParagraph(cb, tions){
        //separated by two newlines
        var match = new Matchic().nextParagraph(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextParagraph', tions)){this.ugly_itr=0;}
        return this;
    }

    nextSentance(cb, tions){
        //separated by a period
        var match = new Matchic().nextSentance(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextSentance', tions)){this.ugly_itr=0;}
        return this;
    }

    nextInteger(cb, tions){
        var match = new Matchic().nextInteger(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextInteger', tions)){this.ugly_itr=0;}
        return this;
    }

    nextFloat(cb, tions){
        var match = new Matchic().nextFloat(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextFloat', tions)){this.ugly_itr=0;}
        return this;
    }

    nextScientific(cb, tions){
        var match = new Matchic().nextScientific(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextScientific', tions)){this.ugly_itr=0;}
        return this;
    }

    nextOctet(cb, tions){
        var match = new Matchic().nextOctet(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextOctet', tions)){this.ugly_itr=0;}
        return this;
    }

    nextHex(cb, tions){
        var match = new Matchic().nextHex(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextHex', tions)){this.ugly_itr=0;}
        return this;
    }

    nextCodeBlock(type, cb, tions){
        var match = new Matchic().nextCodeBlock(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextCodeBlock', tions)){this.ugly_itr=0;}
        return this;
    }

    nextFunction(type, cb, tions){
        var match = new Matchic().nextFunction(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextFunction', tions)){this.ugly_itr=0;}
        return this;
    }

    nextLiteral(cb, tions){
        var match = new Matchic().nextLiteral(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextLiteral', tions)){this.ugly_itr=0;}
        return this;
    }
    nextChar(cb, tions){
        var match = new Matchic().nextChar(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextChar', tions)){this.ugly_itr=0;}
        return this;
    }

    nextWord(cb, tions){
        var match = new Matchic().nextWord(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextWord', tions)){this.ugly_itr=0;}
        return this;
    }

    nextHTML(cb, tions){
        var match = new Matchic().nextHTML(this.opStack[this.opStack.length-1]['page'])
        //if there is no match there is no reason to iterate the same function
        if (!this._next(match, cb, 'nextHTML', tions)){this.ugly_itr=0;}
        return this;
    }

    nextMatchic(cb, tions){
        //takes an array of regex patterns and applies them ordinally, 
        //until it finds the first match, and pushes to the stack, then returns
        tions['spells'].forEach((spell)=>{
            var match = new Matchic().next(this.opStack[this.opStack.length-1]['page'], spell)
            //if there is no match there is no reason to iterate the same function
            if (!this._next(match, cb, 'nextMatchic', tions)){this.ugly_itr=0;}
        })
    }

    up(cb){
        this.results.pop()
        return this;
    }

    iter(n, fn, cb, tions){
        if(n=='inf'){
            this.ugly_itr=Infinity
        }else if(Number.isInteger(n)){
            this.ugly_itr=n;
        }else{
            throw Error("n must be of type int or string value 'inf'")
        }
        for(var i = 0; i<this.ugly_itr; i++){
            if(fn=='nextLine'){this.nextLine(cb)}
            else if(fn=='nextParagraph'){this.nextParagraph(cb, tions)}
            else if(fn=='nextSentance'){this.nextSentance(cb, tions)}
            else if(fn=='nextChar'){this.nextChar(cb, tions)}
            else if(fn=='nextWord'){this.nextWord(cb, tions)}
            else if(fn=='nextLiteral'){this.nextLiteral(cb, tions)}
            else if(fn=='nextInteger'){this.nextInteger(cb, tions)}
            else if(fn=='nextFloat'){this.nextFloat(cb, tions)}
            else if(fn=='nextScientific'){this.nextScientific(cb, tions)}
            else if(fn=='nextOctet'){this.nextOctet(cb, tions)}
            else if(fn=='nextHex'){this.nextHex(cb, tions)}
            else if(fn=='nextCodeBlock'){this.nextCodeBlock(cb, tions)}
            else if(fn=='nextFunction'){this.nextFunction(cb, tions)}
            else if(fn=='nextHTML'){this.nextHTML(cb, tions)}
            else if(fn=='nextMatchic'){this.nextMatchic(cb, tions)}
        }
        return this;
    }
}