/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()

    for (let i =0; i < this.words.length; i++){
      let word = this.words[i]
      let nextWord = this.words[i+1] || null;

      if (chains.has(word)){
        chains.get(word).push(nextWord);
        //question here why i need .get?
      }
      else{
        chains.set(word,[nextWord])
      }
    }

    this.chains = chains;
  }

  static choice(array) {
    let index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys())
    let key = MarkovMachine.choice(keys)
    //question here due to .choice having to be a static function
    let text = [];

    while (text.length < numWords && key != null){
      text.push(key);
      key = MarkovMachine.choice(this.chains.get(key))
      // question why do i have to set key to this ?
    }
    return text.join(" ")
  }
}

module.exports ={
  MarkovMachine,
};

