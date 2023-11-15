const checkMatchAvailability = (matches, demandedDate) => {
    return !matches.some(match => match.date.getTime() === demandedDate.getTime())
}

const checkPlayerAssistence = (match, playerId) => {
    return match.assistants.includes(playerId)
}
  
module.exports = {
    checkMatchAvailability,
    checkPlayerAssistence
}