const { WebClient } = require("@slack/web-api")

const getPicklyMember = (loginId) => {
    const picklyMember = new Map([
        ["ww8007", "장동현"],
        ["SoobinJung1013", "Soobin Jung"],
        ["litsynp", "ocean-triple"],
        ["JoeCP17", "Ueibin Kim"],
        ["JerryK026", "SeokyungKim"],
        ["EunjiShin", "우디"],
        ["aeong98", "aeong98"],
    ]);
    return picklyMember.get(loginId) || loginId;
}