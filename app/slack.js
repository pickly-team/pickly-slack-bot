const { WebClient } = require("@slack/web-api")
const PICKLY_BOT_TOKEN = process.env.PICKLY_BOT_TOKEN;
const PICKLY_CHANNEL = process.env.PICKLY_CHANNEL;
const web = new WebClient(PICKLY_BOT_TOKEN);

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

async function postMessageChannel(text, channelId) {
    await web.chat.postMessage({ text, channel: channelId });
}

function getLinkText(text, url) {
    return (!url) ? text : `<${url}|${text}>`;
}

async function sendPullRequestNotification({
    repository,
    channelId,
    url,
    title,
    loginId,
}) {
    postMessageChannel(
        `[${getLinkText(
            "pickly-backend",
            repository.html_url
        )}] 새로운 PR이 도착했습니다. 코드리뷰 고고! 🏃\n 
        <${url}|${title}> by ${getPicklyMember(
            loginId
        )}`,
        channelId
    );
}

async function sendIssueNotification({
    repository,
    channelId,
    url,
    title,
    loginId,
}) {
    postMessageChannel(
        `[${getLinkText(
            "pickly-backend",
            repository.html_url
        )}] 새로운 이슈가 도착했습니다. 확인해볼까요? 🏃\n
        <${url}|${title}> by ${getPicklyMember(
            loginId
        )}`,
        channelId
    );
}

async function sendReminderPullRequestNotification(pr) {
    const { loginId, html_url, url, title, diffDate } = pr;
    postMessageChannel(
        `[${getLinkText(
            "pickly-backend",
            html_url
          )}] ${diffDate}일이 지난 PR이 있습니다🤕 소중한 코드리뷰 부탁드려요~ 🙏 \n<${url}|${title}> by ${getCmiMemberNickname(
            loginId
          )}`,
          PICKLY_CHANNEL
    );
}

module.exports = {
    postMessageChannel,
    sendIssueNotification,
    sendPullRequestNotification,
    sendReminderPullRequestNotification
};