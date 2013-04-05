var adjectives = ['loopy','iron','stone','diamond','shiny','stinky','dorky','weird','funny','dopey','happy','grumpy','fat','skinny','little','drunken','stupid','burning'];
var nouns = ['dwarves','gremlin','golem','gremlin','griffon','goblin','dragon','maiden','knight','lou','bob', 'shrub','oracle','repairman','archer','king','prince','fool','queen','princess'];
var kingdoms = ['smithwick', 'castle-on-avon','camelot','the-crusades','the-hood','the-west','the-north','the-east','the-south','new-york-city','the-shire','alderon','dagoba','the-planet-vulcan','hell'];

function generateName(){
    var adjIdx = Math.floor(Math.random() * adjectives.length);
    var nounIdx = Math.floor(Math.random() * nouns.length);
    var kingdomIdx = Math.floor(Math.random() * kingdoms.length);

    return adjectives[adjIdx] + "-" + nouns[nounIdx] + "-of-" + kingdoms[kingdomIdx];
}