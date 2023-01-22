const { default: axios } = require("axios");
const { sendReminderPullRequestNotification } = require("./slack");

// "https://api.github.com/repos/pickly-team/pickly-backend/pulls",

let prList = [];
const fetchGithub = async () => {
    prList = [];
    try {
      const repos = await axios.get(
        "https://api.github.com/repos/pickly-team/pickly-slack-bot/pulls",
      );
      repos.data.forEach((repo) => {
        !repo.draft &&
          prList.push({
            loginId: repo.user.login,
            full_name: repo.base.repo.full_name,
            html_url: repo.base.repo.html_url,
            url: repo._links.html.href,
            title: repo.title,
            created_at: repo.created_at,
          });
      });
    } catch (err) {
        console.log(err, "error");
    }
  };
  
  const scheduleGithub = async () => {
    const notiPrList = [];
    await fetchGithub();
    prList.forEach((pr) => {
      const diffDate = Math.floor(
        Math.abs(new Date(pr.created_at).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (diffDate >= 3) {
        notiPrList.push({ ...pr, diffDate });
      }
    });
  
    notiPrList.forEach((pr) => {
        sendReminderPullRequestNotification(pr);
    });
  };
  
  module.exports = scheduleGithub;