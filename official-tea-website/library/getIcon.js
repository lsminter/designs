import allMetrics from "./metricsData";

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

function bossTitleCase(str) {
  str = str.toLowerCase().split('_');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

export const iconLinkGetter = (event) => {
  if (event.metric == "overall"){
    return `https://oldschool.runescape.wiki/images/Stats_icon.png?1b467`
  } else if (event.metric in allMetrics.skills){
    if(allMetrics.skills[event.metric].link){
      return allMetrics.skills[event.metric].link
    } else {
      return `https://oldschool.runescape.wiki/images/${bossTitleCase(event.metric)}.png?0a93c`
    }
  } else if (event.metric in allMetrics.bosses){
    if(allMetrics.bosses[event.metric].link){
      return allMetrics.bosses[event.metric].link
    } else {
      return `https://oldschool.runescape.wiki/images/${bossTitleCase(event.metric)}.png?0a93c`
    }
  } else if (event.metric in allMetrics.activities){
    return `https://oldschool.runescape.wiki/images/${bossTitleCase(event.metric)}.png?0a93c`
  } else if (event.metric in allMetrics.computed){
    return `https://oldschool.runescape.wiki/images/${bossTitleCase(event.metric)}.png?0a93c`
  } else {
    
  }
}

const selector = (`#file.fullImageLink`)