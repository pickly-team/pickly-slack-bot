const express = require("express");
const router = express.Router();

const {
	postMessageChannel,
	sendIssueNotification,
	sendPullRequestNotification,
} = require("../app/slack");

const PICKLY_CHANNEL = process.env.PICKLY_CHANNEL;

router.post("/github", function (req, res) {
	if (req.body.action === "opened") {
		if (req.body.pull_request) {
			const { pull_request, repository } = req.body;
			sendPullRequestNotification({
				channelId: PICKLY_CHANNEL,
				repository: repository,
				url: pull_request.html_url,
				title: pull_request.title,
				loginId: pull_request.user.login,
			});
		}

		if (req.body.issue) {
			const { issue, repository } = req.body;
			sendIssueNotification({
				channelId: PICKLY_CHANNEL,
				repository: repository,
				url: issue.html_url,
				title: issue.title,
				loginId: issue.user.login,
			});
		}
	}
	res.send(200);
});

router.get("/slack", function (req, res) {
	postMessageChannel(req.query.message, PICKLY_CHANNEL);
	res.send(200);
});

module.exports = router;
