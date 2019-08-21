var raceOptions={
    神族:sybmol(),
    人族:sybmol(),
    虫族:sybmol()
}

function create(type){
    if(type===raceOptions.神族)
    console.log('you choose protoss');
    if(type===raceOptions.人族)
    console.log('you choose terran');
    if(type===raceOptions.虫族)
    console.log('you choose zerg');
}

create(raceOptions.人族) // you choose terran